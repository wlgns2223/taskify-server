import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository.provider';
import { DBConnectionService } from '../../db/db.service';
import { Comment, CommentEntity } from '../comments.entity';
import { CommentMapper } from '../dto/comment.mapper';
import { UpdateColumnsDto } from '../../columns/dto/updateColumns.dto';
import { UpdateCommentDTO } from '../dto/updateComment.dto';

@Injectable()
export class CommentsRepositoryImpl implements CommentsRepository {
  constructor(private dbService: DBConnectionService) {}

  private async getData(commentId: number) {
    const query = `
      select 
        c.id,
        c.created_at as createdAt, 
        c.updated_at as updatedAt,
        writer_id as writerId,
        todo_id as todoId, 
        comment,
        parent_id as parentId,
        ref,
        ref_order as refOrder,
        reply_count as replyCount,
        step,
        json_object(
        'id', u.id, 
        'createdAt',u.created_at,
        'updatedAt', u.updated_at,
        'email', u.email,
        'nickname', u.nickname,
        'password', u.password
        ) as writer
      from comments as c
      join users as u on u.id = c.writer_id
      where c.id = ?;`;
    const result = await this.dbService.select<Comment>(query, [commentId]);
    return result;
  }

  async createParentComment(comment: Comment): Promise<CommentEntity> {
    const query = `insert into comments (writer_id,todo_id, comment, parent_id) values (?, ?, ?,?)`;
    const insertedComment = await this.dbService.mutate(query, [
      comment.writerId,
      comment.todoId,
      comment.comment,
      comment.parentId,
    ]);
    const newComment = await this.getData(insertedComment.insertId);
    return CommentMapper.toEntity(newComment[0]);
  }

  async updateReplyCount(commentId: number) {
    let query = `UPDATE comments SET reply_count = reply_count + 1 where id = ?`;
    await this.dbService.mutate(query, [commentId]);
  }
}
