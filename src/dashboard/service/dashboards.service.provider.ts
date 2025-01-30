import { Provider } from '@nestjs/common';
import { Dashboard, DashboardEntity } from '../dashboards.entity';
import { OffsetPaginationRequestDto, OffsetPaginationResponse } from '../dto/offsetPagination.dto';
import { CreateDashBoardDto } from '../dto/createDashBoard.dto';
import { DashboardsServiceImpl } from './dashboards.serviceImpl';
import { DashboardDTO } from '../dto/dashboard.dto';

export interface DashboardsService {
  create(dashboard: CreateDashBoardDto, accessToken: string): Promise<DashboardEntity>;
  findAllByWithPagination(
    offsetPaginationRequestDto: OffsetPaginationRequestDto,
    accessToken: string,
  ): Promise<OffsetPaginationResponse<DashboardDTO>>;
  findOneBy(id: number): Promise<DashboardEntity>;
}

export const DashboardsServiceToken = Symbol('DashboardsServiceToken');

export const DashboardsServiceProvider: Provider<DashboardsService> = {
  provide: DashboardsServiceToken,
  useClass: DashboardsServiceImpl,
};
