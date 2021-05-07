import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Album } from '@album/entities/album.entity';

@Schema()
@ObjectType()
export class Photo {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  filename: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  fileType: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  type: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  publicId: string;

  @Field(() => Boolean, { nullable: true })
  @Prop({ required: true })
  uploaded: boolean;

  @Field(() => [User])
  @Prop({ type: String, ref: 'User' })
  author: string | User;

  @Field(() => Album)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Album' })
  album: MongooseSchema.Types.ObjectId | Album;
}

export type PhotoDocument = Photo & Document;
export const PhotoSchema = SchemaFactory.createForClass(Photo);
