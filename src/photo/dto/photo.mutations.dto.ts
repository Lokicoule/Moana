import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreatePhotoDto {
  @Field(() => String)
  readonly filename: string;

  @Field(() => String, { nullable: true })
  readonly fileType?: string;

  @Field(() => String, { nullable: true })
  readonly type?: string;

  @Field(() => String)
  readonly album: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdatePhotoDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field(() => Boolean)
  readonly uploaded: boolean;
}

@InputType()
export class RemovePhotoDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}
