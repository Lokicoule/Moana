import { Field, InputType, Float } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class PricingDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class PricingsDto {
  @Field(() => String)
  readonly title?: string;
}

@InputType()
export class CreatePricingDto {
  @Field(() => String)
  readonly title: string;

  @Field(() => Float)
  readonly price: number;
}

@InputType()
export class UpdatePricingDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly title: string;

  @Field(() => Float)
  readonly price: number;
}

@InputType()
export class RemovePricingDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}
