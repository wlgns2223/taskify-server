import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Comment } from '../comments.entity';
import { Transform } from 'class-transformer';

export class CreateCommentDTO implements Pick<Comment, 'writerId' | 'comment' | 'todoId' | 'parentId'> {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  todoId: number;

  @IsNumber()
  @IsNotEmpty()
  writerId: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === undefined) {
      return null;
    }
    const v = Number(value);
    return isNaN(v) ? null : v;
  })
  @IsNumber()
  parentId: number | null = null;
}
