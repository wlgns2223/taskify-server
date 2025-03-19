import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository.provider';
import { DBConnectionService } from '../../db/db.service';
import { Comment, CommentEntity } from '../comments.entity';

@Injectable()
export class CommentsRepositoryImpl implements CommentsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(commentId: number) {
    const query = `select 
            parent.id,
            parent.created_at as createdAt,
            parent.updated_at as updatedAt,
            parent.writer_id as writerId,
            parent.comment,
            parent.todo_id as todoId,
            parent.parent_comment_id as parentCommentId,
            json_object(
                'id', p.id,
                'createdAt', p.created_at,
                'updatedAt', p.updated_at,
                'email', p.email,
                'nickname', p.nickname,
                'password', p.password
            ) as writer,
            case
                when count(parent.id) = 1 then json_array()
                else json_arrayagg(
                    json_object(
                        'id', child.id,
                        'createdAt', child.created_at,
                        'updatedAt', child.updated_at,
                        'writerId', child.writer_id,
                        'comment', child.comment,
                        'todoId', child.todo_id,
                        'parentCommentId', child.parent_comment_id,
                        'writer', json_object(
                            'id', u.id,
                            'createdAt', u.created_at,
                            'updatedAt', u.updated_at,
                            'email', u.email,
                            'nickname', u.nickname,
                            'password', u.password
                        )
                    )
                )
            end as replies
        from comments as parent
        left join comments as child on parent.id = child.parent_comment_id
        left join users as u on u.id = child.writer_id
        left join users as p on p.id = parent.writer_id
        where parent.parent_comment_id is null
        and parent.id = ?
        group by parent.id
        `;
    const result = await this.dbService.select<Comment>(query, [commentId]);
    return result;
  }

  async create(comment: Comment): Promise<CommentEntity> {
    const query = `insert into comments(writer_id, comment, todo_id, parent_comment_id) values (?, ?, ?, ?)`;
    const params = [comment.writerId, comment.comment, comment.todoId, comment.parentCommentId];
    const result = await this.dbService.mutate(query, params);
    const insertedComment = await this.getData(result.insertId);
    console.log(insertedComment);

    return {} as any;

    // return new CommentEntity(insertedComment[0]);
  }
}
