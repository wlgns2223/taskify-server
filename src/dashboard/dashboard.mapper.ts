import { instanceToPlain } from 'class-transformer';
import { Dashboard, DashboardEntity } from './dashboards.entity';
import { DashboardDTO } from './dto/dashboard.dto';

export class DashboardMapper {
  static toEntity(param: Dashboard) {
    return DashboardEntity.from<DashboardEntity, Dashboard>(DashboardEntity, param);
  }

  static toEntityList(param: Dashboard[]) {
    return param.map((item) => DashboardEntity.from<DashboardEntity, Dashboard>(DashboardEntity, item));
  }

  static toDTO(entity: DashboardEntity | null) {
    if (!entity) {
      return null;
    }
    const dto = DashboardDTO.from(DashboardDTO, entity);

    return instanceToPlain(dto) as DashboardDTO;
  }
}
