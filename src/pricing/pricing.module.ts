import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingResolver } from './pricing.resolver';
import { CognitoModule } from 'src/cognito/cognito.module';
import { UserModule } from 'src/user/user.module';
import { Pricing, PricingSchema } from './entities/pricing.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CognitoModule,
    UserModule,
    MongooseModule.forFeature([{ name: Pricing.name, schema: PricingSchema }]),
  ],
  providers: [PricingResolver, PricingService],
  exports: [PricingService],
})
export class PricingModule {}
