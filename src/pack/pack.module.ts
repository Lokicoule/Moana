import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackResolver } from './pack.resolver';
import { CognitoModule } from 'src/cognito/cognito.module';
import { UserModule } from 'src/user/user.module';
import { Pack, PackSchema } from './entities/pack.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [PackService, PackResolver],
})
@Module({
  imports: [
    CognitoModule,
    UserModule,
    MongooseModule.forFeature([{ name: Pack.name, schema: PackSchema }]),
  ],
  providers: [PackResolver, PackService],
  exports: [PackService],
})
export class PackModule {}
