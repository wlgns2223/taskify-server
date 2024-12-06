import { Module } from '@nestjs/common';
import { DashboardsController } from './dashboards.controller';
import { DashboardsService } from './dashboards.service';
import { DashboardsRepository } from './dashboards.repository';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [TokenModule, UsersModule, MembersModule],
  controllers: [DashboardsController],
  providers: [DashboardsRepository, DashboardsService],
  exports: [],
})
export class DashboardsModule {}
