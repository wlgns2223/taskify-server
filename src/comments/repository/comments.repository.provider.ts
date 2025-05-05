import { Provider } from '@nestjs/common';
import { Comment, CommentEntity } from '../comments.entity';
import { CommentsRepositoryImpl } from './comments.repository.impl';
import { OffsetPaginationRequestDto } from '../../dashboard/dto/offsetPagination.dto';
import { UpdateColumnsDto } from '../../columns/dto/updateColumns.dto';

export interface CommentsRepository {
  createParentComment(comment: Comment): Promise<CommentEntity>;
  // updateOneBy(parentId: number, comment: UpdateColumnsDto): Promise<CommentEntity>;
  updateReplyCount(commentId: number): Promise<void>;
  // findAllByPagination(offsetPaginationRequestDTO: OffsetPaginationRequestDto, todoId: number): Promise<any[]>;
}

export const CommentsRepositoryToken = Symbol('CommentsRepository');
export const CommentsRepositoryProvider: Provider<CommentsRepository> = {
  provide: CommentsRepositoryToken,
  useClass: CommentsRepositoryImpl,
};
