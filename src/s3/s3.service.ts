import { PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Readable } from 'stream';
import s3Config from './s3.config';

@Injectable()
export class S3Service {
  /* private client: S3Client;
  constructor(
    @Inject(s3Config.KEY)
    private config: ConfigType<typeof s3Config>,
  ) {
    this.client = new S3Client({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.credentials.accessKeyId,
        secretAccessKey: this.config.credentials.secretAccessKey,
      },
    });
  } */
  /* async uploadStream(
    key: string,
    body: Readable | ReadableStream | Blob,
    bucket = this.config.privateBucketName,
  ) {
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      Body: body,
    };
    try {
      const paralellUploads3 = new Upload({
        client: this.client,
        params: uploadParams,
        queueSize: 10,
        partSize: 10000000,
      });

      await paralellUploads3.done();
      console.log('done');
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  } */
}
