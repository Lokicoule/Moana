import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateAlbumDto {
  @Field(() => String)
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly description?: string;

  @Field(() => String, { nullable: true })
  readonly code?: string;

  @Field()
  readonly date: Date;

  @Field(() => String)
  readonly pricing: MongooseSchema.Types.ObjectId;
}

@InputType()
export class UpdateAlbumDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly title: string;

  @Field(() => String, { nullable: true })
  readonly description?: string;

  @Field(() => String, { nullable: true })
  readonly code?: string;

  @Field()
  readonly date: Date;

  @Field(() => String)
  readonly pricing: MongooseSchema.Types.ObjectId;
}

@InputType()
export class RemoveAlbumDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}
