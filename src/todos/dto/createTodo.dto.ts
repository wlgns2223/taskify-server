import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsInt()
  @IsNotEmpty()
  assigneeUserId: number;

  @IsInt()
  @IsNotEmpty()
  assignerUserId: number;

  @IsInt()
  @IsNotEmpty()
  dashboardId: number;

  @IsInt()
  @IsNotEmpty()
  columnId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsInt()
  @IsNotEmpty()
  position: number;

  @IsOptional()
  imageFile?: File;
}
