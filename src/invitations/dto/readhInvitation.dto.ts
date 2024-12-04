import { IsOptional, IsString } from 'class-validator';
import { OffsetPaginationRequestDto } from '../../dashboard/dto/offsetPagination.dto';

export class InvitationOffsetPaginationWithSearchRequestDto extends OffsetPaginationRequestDto {
  @IsString()
  @IsOptional()
  search?: string;
}
