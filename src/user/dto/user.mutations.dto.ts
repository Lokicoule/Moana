import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  readonly email: string;
}
