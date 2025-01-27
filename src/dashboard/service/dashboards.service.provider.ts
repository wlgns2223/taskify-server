import { Provider } from '@nestjs/common';
import { Dashboard, DashboardEntity } from '../dashboards.entity';
import { OffsetPaginationRequestDto } from '../dto/offsetPagination.dto';
import { DashboardsRepositoryImpl } from '../repository';
import { CreateDashBoardDto } from '../dto/createDashBoard.dto';
import { DashboardsServiceImpl } from './dashboards.serviceImpl';

export interface DashboardsService {
  create(dashboard: CreateDashBoardDto, accessToken: string): Promise<DashboardEntity>;
  findAllByWithPagination(
    offsetPaginationRequestDto: OffsetPaginationRequestDto,
    accessToken: string,
  ): Promise<Record<string, any>>;
  findOneBy(id: number): Promise<DashboardEntity>;
}

export const DashboardsServiceToken = Symbol('DashboardsServiceToken');

export const DashboardsServiceProvider: Provider<DashboardsService> = {
  provide: DashboardsServiceToken,
  useClass: DashboardsServiceImpl,
};
