import { PartialType, PickType } from '@nestjs/swagger';
import { CreateColumnsDto } from './createColumns.dto';

export class UpdateColumnsDto extends PartialType(PickType(CreateColumnsDto, ['name'])) {}
