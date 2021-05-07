import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UserDto {
  @Field(() => String)
  readonly id?: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly username?: string;

  @Field(() => String)
  readonly email?: string;
}

@InputType()
export class UsersDto {
  @Field(() => String)
  readonly email?: string;
}
