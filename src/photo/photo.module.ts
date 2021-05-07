import { AlbumModule } from '@album/album.module';
import { CloudinaryModule } from '@cloudinary/cloudinary.module';
import { CognitoModule } from '@cognito/cognito.module';
import { Module } from '@nestjs/common';
import { S3Module } from '@s3/s3.module';
import { UserModule } from '@user/user.module';
import { PhotoResolver } from './photo.resolver';
import { PhotoService } from './photo.service';

@Module({
  imports: [AlbumModule, S3Module, CognitoModule, UserModule, CloudinaryModule],
  providers: [PhotoResolver, PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
