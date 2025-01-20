import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InternalServerException } from '../common/exceptions/exceptions';
import { StorageService } from './storage.provider';

type ImgUrl = string;
export interface S3Params {
  file: Express.Multer.File;
  email: string;
}

@Injectable()
export class S3ServiceImpl implements StorageService<S3Params> {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly folderName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      },
    });
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
    this.folderName = this.configService.get('S3_FOLDER_NAME');
  }

  private generatePublicUrl(key: string) {
    const region = this.configService.get('AWS_REGION');
    const encodedKey = encodeURIComponent(key);
    return `https://${this.bucketName}.s3.${region}.amazonaws.com/${encodedKey}`;
  }

  private generateKey(param: { folderName: string; userEmail: string; originalname: string }) {
    return `${param.folderName}/${param.userEmail}/${Date.now()}-${param.originalname}`;
  }

  async uploadOne(param: S3Params): Promise<ImgUrl> {
    const { email, file } = param;
    const key = this.generateKey({ folderName: this.folderName, userEmail: email, originalname: file.originalname });

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
    });
    try {
      await this.s3Client.send(command);
      return this.generatePublicUrl(key);
    } catch (err) {
      console.error(err);
      throw InternalServerException('Failed to upload image');
    }
  }
}
