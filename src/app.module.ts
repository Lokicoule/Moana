import { AlbumModule } from '@album/album.module';
import { CategoryModule } from '@category/catgeory.module';
import { CognitoModule } from '@cognito/cognito.module';
import { GraphQLWithUploadModule } from '@graphql/graphql-with-upload.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PackModule } from '@pack/pack.module';
import { PhotoModule } from '@photo/photo.module';
import { PricingModule } from '@pricing/pricing.module';
import { UserModule } from '@user/user.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    GraphQLWithUploadModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      context: (ctx, err) => {
        if (err) console.log(err);
        return ctx;
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
    CognitoModule,
    UserModule,
    AlbumModule,
    PhotoModule,
    PricingModule,
    PackModule,
    CategoryModule,
  ],
})
export class AppModule {}
