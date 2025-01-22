import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TodoProperties } from '../todos.model';
import { PurePropertiesWithExtraOmit } from '../../common/types';

export class CreateTodoDto implements PurePropertiesWithExtraOmit<TodoProperties, 'imageUrl'> {
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
  dashboardId: number;

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

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  position: number;
}
