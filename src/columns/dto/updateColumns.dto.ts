import { PartialType } from '@nestjs/swagger';
import { CreateColumnsDto } from './createColumns.dto';

export class UpdateColumnsDto extends PartialType(CreateColumnsDto) {}
