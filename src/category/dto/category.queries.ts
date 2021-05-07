import { Field, InputType, Float } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CategoryDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}

@InputType()
export class CategoriesDto {
  @Field(() => String)
  readonly title?: string;
}

@InputType()
export class CreateCategoryDto {
  @Field(() => String)
  readonly title: string;
}

@InputType()
export class UpdateCategoryDto {
  @Field(() => String)
  readonly _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  readonly title: string;
}

@InputType()
export class RemoveCategoryDto {
  @Field(() => String)
  readonly _id?: MongooseSchema.Types.ObjectId;
}
