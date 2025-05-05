import { IsString } from 'class-validator';
import { Comment } from '../comments.entity';

export class UpdateCommentDTO implements Pick<Comment, 'comment'> {
  @IsString()
  comment: string;
}
