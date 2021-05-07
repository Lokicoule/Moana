import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  CreateCategoryDto,
  CategoriesDto,
  CategoryDto,
  RemoveCategoryDto,
  UpdateCategoryDto,
} from './dto/category.queries';
import { UseGuards } from '@nestjs/common';
import { CognitoGuard } from 'src/cognito/guards/cognito.guard';
import { CognitoRolesGuard } from 'src/cognito/guards/cognito-roles.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserCtx } from 'src/common/context/user.ctx';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  async category(@Args('filters') filters: CategoryDto) {
    return this.categoryService.findOne(filters);
  }

  @Query(() => [Category])
  async categories(
    @Args('filters', { nullable: true }) filters?: CategoriesDto,
  ) {
    return this.categoryService.findAll(filters);
  }

  @Query(() => [Category])
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  async myCategories(
    @CurrentUser() user: UserCtx,
    @Args('filters', { nullable: true }) filters?: CategoriesDto,
  ) {
    return this.categoryService.findAll(filters, user);
  }

  @Mutation(() => Category)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  createCategory(
    @Args('payload') payload: CreateCategoryDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.categoryService.create(payload, user);
  }

  @Mutation(() => Category)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  updateCategory(
    @Args('payload') payload: UpdateCategoryDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.categoryService.update(payload, user);
  }

  @Mutation(() => Category)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  removeCategory(
    @Args('payload') payload: RemoveCategoryDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.categoryService.remove(payload, user);
  }
}
