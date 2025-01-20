import { Module } from '@nestjs/common';
import { StorageServiceProvider } from './storage.provider';

@Module({
  providers: [StorageServiceProvider],
  exports: [StorageServiceProvider],
})
export class StorageModule {}
