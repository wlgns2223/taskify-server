import { Module } from '@nestjs/common';
import { DashboardsController } from './dashboards.controller';
import { UsersModule } from '../users/users.module';
import { MembersModule } from '../members/members.module';
import { AuthModule } from '../auth/auth.module';
import { DashboardsRepositoryProvider } from './repository';
import { DashboardsServiceProvider } from './service/dashboards.service.provider';

@Module({
  imports: [AuthModule, UsersModule, MembersModule],
  controllers: [DashboardsController],
  providers: [DashboardsRepositoryProvider, DashboardsServiceProvider],
  exports: [],
})
export class DashboardsModule {}
