import { PartialType, PickType } from '@nestjs/swagger';
import { CreateColumnsDto } from './createColumns.dto';

export class UpdateColumnsDto extends PickType(CreateColumnsDto, ['name']) {}
