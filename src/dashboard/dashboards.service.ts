import { Injectable, Logger } from '@nestjs/common';
import { CursorPaginationDirection, DashboardsRepository } from './dashboards.repository';
import { Dashboard } from './dashboards.model';
import { TokenService } from '../auth/token.service';
import { UsersService } from '../users/users.service';
import { ReadDashboardsDto } from './dto/readDashboards.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class DashboardsService {
  private logger = new Logger(DashboardsService.name);
  constructor(
    private dashBoardRepository: DashboardsRepository,
    private tokenService: TokenService,
    private userService: UsersService,
  ) {}

  async createDashboard(title: string, color: string, accessToken: string) {
    const decodedToken = this.tokenService.decodeToken(accessToken);
    const user = await this.userService.findUserByEmail(decodedToken.email);
    const newDashboard = new Dashboard(title, color, user.id);
    return await this.dashBoardRepository.createDashboard(newDashboard);
  }

  async getDashboards(limit: string, direction: CursorPaginationDirection, cursor: string | undefined) {
    const dashboards = await this.dashBoardRepository.getDashboards(cursor, limit, direction);
    const cursors = await this.dashBoardRepository.getFirstLastCursor();
    const totalNumberOfDashboards = await this.dashBoardRepository.getTotalNumberOfDashboards();
    const dashboardsDto = new ReadDashboardsDto(dashboards, cursors, totalNumberOfDashboards);
    return instanceToPlain(dashboardsDto);
  }
}
