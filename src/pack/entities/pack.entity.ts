import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
@ObjectType()
export class Pack {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  title: string;

  @Field(() => Float)
  @Prop()
  price: number;

  @Field(() => Int)
  @Prop()
  nbProducts: number;

  @Field(() => [User])
  @Prop({ type: String, ref: 'User' })
  author: string | User;
}

export type PackDocument = Pack & Document;
export const PackSchema = SchemaFactory.createForClass(Pack);
