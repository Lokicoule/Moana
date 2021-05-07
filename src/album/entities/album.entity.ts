import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Pricing } from 'src/pricing/entities/pricing.entity';

@Schema()
@ObjectType()
export class Album {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;

  @Field(() => String, { nullable: true })
  @Prop()
  code: string;

  @Field(() => String, { nullable: true })
  @Prop()
  thumbnail: string;

  @Field(() => Date, { nullable: true })
  @Prop(() => Date)
  date: Date;

  @Field(() => User)
  @Prop({ type: String, ref: 'User' })
  author: string | User;

  @Field(() => Pricing)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Pricing' })
  pricing: MongooseSchema.Types.ObjectId | Pricing;
}

export type AlbumDocument = Album & Document;
export const AlbumSchema = SchemaFactory.createForClass(Album);
