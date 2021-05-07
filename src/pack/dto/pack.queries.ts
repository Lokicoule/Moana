import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class PackDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class PacksDto {
  @Field(() => String)
  readonly title?: string;
}

@InputType()
export class CreatePackDto {
  @Field(() => String)
  readonly title: string;

  @Field(() => Int)
  readonly nbProducts?: number;

  @Field(() => Float)
  readonly price: number;
}

@InputType()
export class UpdatePackDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly title: string;

  @Field(() => Int)
  readonly nbProducts?: number;

  @Field(() => Float)
  readonly price: number;
}

@InputType()
export class RemovePackDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}
