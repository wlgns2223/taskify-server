import { Global, Module } from '@nestjs/common';
import { DBConnectionService } from './db.service';

@Global()
@Module({
  providers: [DBConnectionService],
  exports: [DBConnectionService],
})
export class DBModule {}
