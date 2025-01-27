import { Inject, Injectable, Logger } from '@nestjs/common';
import { Dashboard } from '../dashboards.entity';
import { instanceToPlain } from 'class-transformer';
import { DBConnectionService } from '../../db/db.service';
import { OffsetPaginationRequestDto, OffsetPaginationResponse } from '../dto/offsetPagination.dto';
import { DashboardsService } from './dashboards.service.provider';
import { DashboardsRepository, DashboardsRepositoryToken } from '../repository';
import { MembersRepositoryToken } from '../../members/repository';
import { MembersService } from '../../members/service';
import { UsersService, UsersServiceToken } from '../../users/service/users.provider';
import { AuthService } from '../../auth/auth.service';
import { EntityNotFoundException } from '../../common/exceptions/exceptions';
import { DashboardMapper } from '../dashboard.mapper';
import { MembersMapper } from '../../members/members.mapper';
import { CreateDashBoardDto } from '../dto/createDashBoard.dto';
import { OffsetPaginationMapper } from '../dto/offsetPagination.mapper';

@Injectable()
export class DashboardsServiceImpl implements DashboardsService {
  private logger = new Logger(DashboardsServiceImpl.name);
  constructor(
    @Inject(DashboardsRepositoryToken)
    private dashBoardRepository: DashboardsRepository,

    @Inject(MembersRepositoryToken)
    private memberService: MembersService,

    @Inject(UsersServiceToken)
    private userService: UsersService,
    private authService: AuthService,
    private dbService: DBConnectionService,
  ) {}

  async create(dashboard: CreateDashBoardDto, accessToken: string) {
    const { color, title } = dashboard;

    const decodedToken = this.authService.decode(accessToken);
    const user = await this.userService.findOneBy(decodedToken.email);
    if (!user) {
      throw EntityNotFoundException(`User with email ${decodedToken.email} not found`);
    }
    const queries = async () => {
      const newDashboard = DashboardMapper.toEntity({ color, title, ownerId: user.id! });
      const dashboard = await this.dashBoardRepository.create(newDashboard);
      const newMember = MembersMapper.toEntity({
        dashboardId: dashboard.id!,
        memberId: user.id!,
      });
      await this.memberService.create(newMember);
      return dashboard;
    };

    return await this.dbService.transaction(queries);
  }

  async findAllByWithPagination(offsetPaginationRequestDto: OffsetPaginationRequestDto, accessToken: string) {
    const decodedToken = this.authService.decode(accessToken);
    const user = await this.userService.findOneBy(decodedToken.email);
    if (!user) {
      throw EntityNotFoundException(`User with email ${decodedToken.email} not found`);
    }
    const dashboards = await this.dashBoardRepository.findAllByWithPagination(user.id!, offsetPaginationRequestDto);
    const totalNumberOfDashboards = await this.dashBoardRepository.countAllBy(user.id!);

    const offsetPaginationResponse: OffsetPaginationResponse<Dashboard> = {
      currentPage: offsetPaginationRequestDto.page,
      data: dashboards,
      totalNumberOfData: totalNumberOfDashboards,
      pageSize: offsetPaginationRequestDto.pageSize,
    };

    return OffsetPaginationMapper.toResponseDTO(offsetPaginationResponse);
  }

  async findOneBy(id: number) {
    return await this.dashBoardRepository.findOneBy(id);
  }
}
