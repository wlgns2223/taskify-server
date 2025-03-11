import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Todo } from '../todos.entity';
import { object } from 'zod';

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

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return [];
    }

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @Type(() => String)
  tags: string[] = [];
}
