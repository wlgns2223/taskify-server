import { Injectable, Logger } from '@nestjs/common';
import { DashboardsRepository } from './dashboards.repository';
import { Dashboard } from './dashboards.model';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../auth/token.service';
import { UsersService } from '../users/users.service';

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
}
