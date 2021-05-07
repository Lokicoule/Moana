import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CognitoGuard } from '../cognito/guards/cognito.guard';
import { CreateUserDto } from './dto/user.mutations.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserService } from './user.service';
import { Album } from 'src/album/entities/album.entity';
import { UserDto, UsersDto } from './dto/user.queries.dto';
import { UserCtx } from 'src/common/context/user.ctx';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@Args('filters') filters: UserDto) {
    return this.userService.findOne(filters);
  }

  @Query(() => [User])
  async users(@Args('filters', { nullable: true }) filters?: UsersDto) {
    return this.userService.findAll(filters);
  }

  @Mutation(() => User)
  //@UseGuards(CognitoGuard)
  createUser(@Args('payload') payload: CreateUserDto) {
    return this.userService.create(payload);
  }
}
