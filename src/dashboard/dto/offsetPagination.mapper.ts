import { instanceToPlain } from 'class-transformer';
import { OffsetPaginationResponse, OffsetPaginationResponseDto } from './offsetPagination.dto';

export class OffsetPaginationMapper {
  static toResponseDTO<T = any>(offsetPaginationResponse: OffsetPaginationResponse<T>) {
    const res = new OffsetPaginationResponseDto({
      currentPage: offsetPaginationResponse.currentPage,
      data: offsetPaginationResponse.data,
      totalNumberOfData: offsetPaginationResponse.totalNumberOfData,
      pageSize: offsetPaginationResponse.pageSize,
    });
    return instanceToPlain(res);
  }
}
