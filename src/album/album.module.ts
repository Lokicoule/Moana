import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumResolver } from './album.resolver';
import { CognitoModule } from '../cognito/cognito.module';
import { Album, AlbumSchema } from './entities/album.entity';
import { AlbumService } from './album.service';
import { UserModule } from 'src/user/user.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    S3Module,
    CognitoModule,
    UserModule,
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  providers: [AlbumResolver, AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
