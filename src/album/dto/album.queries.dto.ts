import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class AlbumDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;
}

@InputType()
export class AlbumsDto {
  @Field(() => String)
  readonly title?: string;

  @Field(() => String)
  readonly description?: string;

  @Field()
  readonly date?: Date;
}
