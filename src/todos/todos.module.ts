import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { StorageModule } from '../storage/storage.module';
import { AuthModule } from '../auth/auth.module';
import { TodosRepositoryProvider } from './repository';
import { TodoServiceProvider } from './service/todo.provider';

@Module({
  imports: [StorageModule, AuthModule],
  controllers: [TodosController],
  providers: [TodosRepositoryProvider, TodoServiceProvider],
})
export class TodosModule {}
