import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PackService } from './pack.service';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { CognitoGuard } from 'src/cognito/guards/cognito.guard';
import { CognitoRolesGuard } from 'src/cognito/guards/cognito-roles.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserCtx } from 'src/common/context/user.ctx';
import { Pack } from './entities/pack.entity';
import {
  CreatePackDto,
  PackDto,
  PacksDto,
  UpdatePackDto,
  RemovePackDto,
} from './dto/pack.queries';

@Resolver()
export class PackResolver {
  constructor(private readonly packService: PackService) {}

  @Query(() => Pack)
  async pack(@Args('filters') filters: PackDto) {
    return this.packService.findOne(filters);
  }

  @Query(() => [Pack])
  async packs(@Args('filters', { nullable: true }) filters?: PacksDto) {
    return this.packService.findAll(filters);
  }

  @Query(() => [Pack])
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  async myPacks(
    @CurrentUser() user: UserCtx,
    @Args('filters', { nullable: true }) filters?: PacksDto,
  ) {
    return this.packService.findAll(filters, user);
  }

  @Mutation(() => Pack)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  createPack(
    @Args('payload') payload: CreatePackDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.packService.create(payload, user);
  }

  @Mutation(() => Pack)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  updatePack(
    @Args('payload') payload: UpdatePackDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.packService.update(payload, user);
  }

  @Mutation(() => Pack)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  removePack(
    @Args('payload') payload: RemovePackDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.packService.remove(payload, user);
  }
}
