import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InternalServerException } from '../common/exceptions/exceptions';
import { StorageService } from './storage.provider';

export interface S3Params {
  email: string;
  file: Express.Multer.File;
}

@Injectable()
export class S3ServiceImpl implements StorageService<S3Params> {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly folderName: string;

  constructor(private configService: ConfigService) {
    const region: string | undefined = this.configService.get('AWS_REGION');
    const accessKeyId: string | undefined = this.configService.get('AWS_ACCESS_KEY');
    const secretAccessKey: string | undefined = this.configService.get('AWS_SECRET_KEY');
    const bucketName: string | undefined = this.configService.get('S3_BUCKET_NAME');
    const folderName: string | undefined = this.configService.get('S3_FOLDER_NAME');

    if (!region || !accessKeyId || !secretAccessKey || !bucketName || !folderName) {
      throw InternalServerException('Failed to get AWS S3 config');
    }

    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
    this.bucketName = bucketName;
    this.folderName = folderName;
  }

  private generatePublicUrl(key: string) {
    const region = this.configService.get('AWS_REGION');
    const encodedKey = encodeURIComponent(key);
    return `https://${this.bucketName}.s3.${region}.amazonaws.com/${encodedKey}`;
  }

  private generateKey(param: { folderName: string; userEmail: string; originalname: string }) {
    return `${param.folderName}/${param.userEmail}/${Date.now()}-${param.originalname}`;
  }

  async uploadOne(param: S3Params): Promise<string> {
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
