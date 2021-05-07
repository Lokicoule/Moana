import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCtx } from 'src/common/context/user.ctx';
import { Category, CategoryDocument } from './entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoriesDto,
  CategoryDto,
  RemoveCategoryDto,
} from './dto/category.queries';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    payload: CreateCategoryDto,
    userAWS: UserCtx,
  ): Promise<Category> {
    const createdCategory = new this.categoryModel(payload);
    createdCategory.author = userAWS._id;
    return createdCategory.save();
  }

  async update(
    payload: UpdateCategoryDto,
    userAWS: UserCtx,
  ): Promise<Category> {
    return this.categoryModel.findOneAndUpdate(
      {
        _id: payload._id,
        author: userAWS._id,
      },
      {
        title: payload.title,
      },
    );
  }

  async remove(
    payload: RemoveCategoryDto,
    userAWS: UserCtx,
  ): Promise<Category> {
    return this.categoryModel.findOneAndDelete({
      ...payload,
      author: userAWS._id,
    });
  }

  async findAll(
    filters: CategoriesDto,
    userAWS?: UserCtx,
  ): Promise<Category[]> {
    const authorId = userAWS?._id;
    if (authorId)
      return this.categoryModel
        .find({
          ...filters,
          author: authorId,
        })
        .exec();

    return this.categoryModel.find({ ...filters }).exec();
  }

  async findOne(filters: CategoryDto): Promise<Category | undefined> {
    return this.categoryModel.findOne({ ...filters }).exec();
  }
}
