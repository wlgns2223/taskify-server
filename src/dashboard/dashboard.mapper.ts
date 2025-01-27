import { Dashboard, DashboardEntity } from './dashboards.entity';

export class DashboardMapper {
  static toEntity(param: Dashboard) {
    return DashboardEntity.from<DashboardEntity, Dashboard>(DashboardEntity, param);
  }

  static toEntityList(param: Dashboard[]) {
    return param.map((item) => DashboardEntity.from<DashboardEntity, Dashboard>(DashboardEntity, item));
  }
}
