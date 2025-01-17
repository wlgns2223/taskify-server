import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';
import { AWSModule } from '../aws/aws.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AWSModule, AuthModule],
  controllers: [TodosController],
  providers: [TodosRepository, TodosService],
})
export class TodosModule {}
