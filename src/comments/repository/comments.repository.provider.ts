import { Comment, CommentEntity } from '../comments.entity';
import { CommentsRepositoryImpl } from './comments.repository.impl';

export interface CommentsRepository {
  createParentComment: (comment: Comment) => Promise<CommentEntity>;
  //   findManyBy: (todoId: string) => Promise<CommentEntity[]>;
}

export const CommentsRepositoryToken = Symbol('CommentsRepository');
export const CommentsRepositoryProvider = {
  provide: CommentsRepositoryToken,
  useClass: CommentsRepositoryImpl,
};
