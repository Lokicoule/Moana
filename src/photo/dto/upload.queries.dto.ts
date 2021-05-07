import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class GetSignedUploadURLRequest {
  @Field(() => String)
  readonly albumId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly filename: string;
}

@ObjectType()
export class GetSignedUploadURLResponse {
  @Field(() => String)
  readonly filename: string;

  @Field(() => String)
  readonly url: string;
}
