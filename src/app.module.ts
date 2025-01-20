import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { DashboardsModule } from './dashboard/dashboards.module';
import { ColumnsModule } from './columns/columns.module';
import { TodosModule } from './todos/todos.module';
import { InvitationsModule } from './invitations/invitations.module';
import { MembersModule } from './members/members.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DBModule,
    AuthModule,
    DashboardsModule,
    ColumnsModule,
    TodosModule,
    InvitationsModule,
    MembersModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
