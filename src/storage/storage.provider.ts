import { Provider } from '@nestjs/common';
import { S3ServiceImpl } from './s3.service';

export interface StorageService<T = any> {
  uploadOne(param: T): Promise<string>;
}

export const StorageServiceToken = Symbol('StorageService');

export const StorageServiceProvider: Provider<StorageService> = {
  provide: StorageServiceToken,
  useClass: S3ServiceImpl,
};
