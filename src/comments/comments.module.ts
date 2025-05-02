import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { UsersModule } from '../users/users.module';
import { TodosModule } from '../todos/todos.module';
import { CommentsServiceProvider } from './service/comments.service.provider';
import { CommentsRepositoryProvider } from './repository/comments.repository.provider';

@Module({
  imports: [UsersModule, TodosModule],
  controllers: [CommentsController],
  providers: [CommentsServiceProvider, CommentsRepositoryProvider],
})
export class CommentsModule {}
