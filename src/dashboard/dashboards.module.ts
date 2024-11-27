import { Module } from '@nestjs/common';
import { DashboardsController } from './dashboards.controller';
import { DashboardsService } from './dashboards.service';
import { DashboardsRepository } from './dashboards.repository';
import { TokenService } from '../auth/token.service';
import { TokenRepository } from '../auth/token.repository';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { MembersRepository } from './members.repository';

@Module({
  imports: [TokenModule, UsersModule],
  controllers: [DashboardsController],
  providers: [DashboardsRepository, DashboardsService, MembersRepository],
  exports: [],
})
export class DashboardsModule {}
