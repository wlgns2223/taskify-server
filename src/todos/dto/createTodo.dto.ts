import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Todo } from '../todos.entity';

export class CreateTodoDto implements Omit<Todo, 'imageUrl' | 'position' | 'tags' | 'assignee'> {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  assigneeUserId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  assignerUserId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  columnId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dueDate: Date;

  @IsArray()
  @Transform(({ value }) => value ?? [])
  @Type(() => String)
  tags: string[] = [];
}
