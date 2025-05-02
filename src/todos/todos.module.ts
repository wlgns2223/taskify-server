import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { StorageModule } from '../storage/storage.module';
import { AuthModule } from '../auth/auth.module';
import { TodosRepositoryProvider } from './repository';
import { TodoServiceProvider } from './service/todo.provider';
import { TagModule } from '../tags/tag.module';

@Module({
  imports: [StorageModule, AuthModule, TagModule],
  controllers: [TodosController],
  providers: [TodosRepositoryProvider, TodoServiceProvider],
  exports: [TodoServiceProvider],
})
export class TodosModule {}
