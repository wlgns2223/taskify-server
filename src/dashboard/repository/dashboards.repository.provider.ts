import { Provider } from '@nestjs/common';
import { Dashboard, DashboardEntity } from '../dashboards.entity';
import { OffsetPaginationRequestDto } from '../dto/offsetPagination.dto';
import { DashboardsRepositoryImpl } from './dashboards.repositoryImpl';

export interface DashboardsRepository {
  create(dashboard: Dashboard): Promise<DashboardEntity>;
  countAllBy(ownerId: number): Promise<number>;
  findAllByWithPagination(
    ownerId: number,
    offsetPaginationRequestDto: OffsetPaginationRequestDto,
  ): Promise<DashboardEntity[]>;
  findOneBy(id: number): Promise<DashboardEntity>;
}

export const DashboardsRepositoryToken = Symbol('DashboardsRepositoryToken');

export const DashboardsRepositoryProvider: Provider<DashboardsRepository> = {
  provide: DashboardsRepositoryToken,
  useClass: DashboardsRepositoryImpl,
};
