import { Provider } from '@nestjs/common';
import { CommentEntity } from '../comments.entity';
import { CreateCommentDTO } from '../dto/createComment.dto';
import { CommentServiceImpl } from './comments.service.impl';

export interface CommentsService {
  create(createCommentDTO: CreateCommentDTO): Promise<CommentEntity>;
}

export const CommentsServiceToken = Symbol('CommentsServiceToken');
export const CommentsServiceProvider: Provider<CommentsService> = {
  provide: CommentsServiceToken,
  useClass: CommentServiceImpl,
};
