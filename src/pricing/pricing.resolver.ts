import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PricingService } from './pricing.service';
import { Pricing } from './entities/pricing.entity';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  CreatePricingDto,
  PricingsDto,
  PricingDto,
  UpdatePricingDto,
  RemovePricingDto,
} from './dto/pricing.queries';
import { UseGuards } from '@nestjs/common';
import { CognitoGuard } from 'src/cognito/guards/cognito.guard';
import { CognitoRolesGuard } from 'src/cognito/guards/cognito-roles.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserCtx } from 'src/common/context/user.ctx';

@Resolver()
export class PricingResolver {
  constructor(private readonly pricingService: PricingService) {}

  @Query(() => Pricing)
  async pricing(@Args('filters') filters: PricingDto) {
    return this.pricingService.findOne(filters);
  }

  @Query(() => [Pricing])
  async pricings(@Args('filters', { nullable: true }) filters?: PricingsDto) {
    return this.pricingService.findAll(filters);
  }

  @Query(() => [Pricing])
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  async myPricings(
    @CurrentUser() user: UserCtx,
    @Args('filters', { nullable: true }) filters?: PricingsDto,
  ) {
    return this.pricingService.findAll(filters, user);
  }

  @Mutation(() => Pricing)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  createPricing(
    @Args('payload') payload: CreatePricingDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.pricingService.create(payload, user);
  }

  @Mutation(() => Pricing)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  updatePricing(
    @Args('payload') payload: UpdatePricingDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.pricingService.update(payload, user);
  }

  @Mutation(() => Pricing)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  removePricing(
    @Args('payload') payload: RemovePricingDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.pricingService.remove(payload, user);
  }
}
