import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Comment } from '../comments.entity';
import { Transform } from 'class-transformer';

export class CreateCommentDto implements Comment {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsInt()
  writerId: number;

  @IsNotEmpty()
  @IsInt()
  todoId: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return null;
    }
    return value;
  })
  parentCommentId: number | null;
}
