import { Injectable, Logger } from '@nestjs/common';
import { DashboardsRepository } from './dashboards.repository';
import { Dashboard } from './dashboards.model';
import { TokenService } from '../auth/token.service';
import { UsersService } from '../users/users.service';
import { instanceToPlain } from 'class-transformer';
import { DBConnectionService } from '../db/db.service';
import { OffsetPaginationRequestDto, OffsetPaginationResponseDto } from './dto/offsetPagination.dto';
import { MembersService } from '../members/members.service';
import { Member } from '../members/members.model';

@Injectable()
export class DashboardsService {
  private logger = new Logger(DashboardsService.name);
  constructor(
    private dashBoardRepository: DashboardsRepository,
    private memberService: MembersService,
    private dbService: DBConnectionService,
    private tokenService: TokenService,
    private userService: UsersService,
  ) {}

  async createDashboard(title: string, color: string, accessToken: string) {
    const decodedToken = this.tokenService.decodeToken(accessToken);
    const user = await this.userService.findUserByEmail(decodedToken.email);
    const queries = async () => {
      const newDashboard = new Dashboard(title, color, user.id);
      const dashboard = await this.dashBoardRepository.createDashboard(newDashboard);
      const newMember = new Member(dashboard.id, user.id);
      await this.memberService.createMember(newMember);
      return dashboard;
    };

    return await this.dbService.transaction(queries);
  }

  async getDashboards(offsetPaginationRequestDto: OffsetPaginationRequestDto, accessToken: string) {
    const decodedToken = this.tokenService.decodeToken(accessToken);
    const user = await this.userService.findUserByEmail(decodedToken.email);
    const dashboards = await this.dashBoardRepository.getDashboards({
      offsetPaginationRequestDto,
      userId: user.id,
    });
    const totalNumberOfDashboards = await this.dashBoardRepository.getTotalNumberOfDashboards(user.id);
    const offsetPaginationResponseDto = new OffsetPaginationResponseDto<Dashboard>({
      currentPage: offsetPaginationRequestDto.page,
      data: dashboards,
      totalNumberOfData: totalNumberOfDashboards,
      pageSize: offsetPaginationRequestDto.pageSize,
    });
    return instanceToPlain(offsetPaginationResponseDto);
  }

  async getDashboardById(id: number) {
    return await this.dashBoardRepository.getDashboardById(id);
  }
}
