import { IsNotEmpty, IsString } from 'class-validator';
import { Dashboard } from '../dashboards.entity';

export class CreateDashBoardDto implements Pick<Dashboard, 'title' | 'color'> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
