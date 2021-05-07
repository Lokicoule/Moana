import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
@ObjectType()
export class Category {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  title: string;

  @Field(() => [User])
  @Prop({ type: String, ref: 'User' })
  author: string | User;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
