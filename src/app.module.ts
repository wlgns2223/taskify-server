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
import { ClsModule } from 'nestjs-cls';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/log.interceptor';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
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
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
