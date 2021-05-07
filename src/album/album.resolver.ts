import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Album, AlbumDocument } from './entities/album.entity';
import { AlbumService } from './album.service';
import { UseGuards } from '@nestjs/common';
import { CognitoGuard } from '../cognito/guards/cognito.guard';
import {
  CreateAlbumDto,
  UpdateAlbumDto,
  RemoveAlbumDto,
} from './dto/album.mutations.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CognitoRolesGuard } from '../cognito/guards/cognito-roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserCtx } from 'src/common/context/user.ctx';
import { AlbumDto, AlbumsDto } from './dto/album.queries.dto';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Pricing } from 'src/pricing/entities/pricing.entity';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Album)
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}

  @Mutation(() => Album)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  createAlbum(
    @Args('payload') payload: CreateAlbumDto,
    @CurrentUser() user: UserCtx,
  ) {
    console.log(payload);
    return this.albumService.create(payload, user);
  }

  @Mutation(() => Album)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  updateAlbum(
    @Args('payload') payload: UpdateAlbumDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.albumService.update(payload, user);
  }

  @Mutation(() => Album)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  removeAlbum(
    @Args('payload') payload: RemoveAlbumDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.albumService.remove(payload, user);
  }

  @Query(() => Album)
  async album(@Args('filters') filters: AlbumDto) {
    return this.albumService.findOne(filters);
  }

  @Query(() => [Album])
  albums(
    @Args('filters', { nullable: true }) filters?: AlbumsDto,
  ): Promise<Album[]> {
    return this.albumService.findAll(filters);
  }

  @Query(() => [Album])
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  myAlbums(
    @CurrentUser() user: UserCtx,
    @Args('filters', { nullable: true }) filters?: AlbumsDto,
  ): Promise<Album[]> {
    return this.albumService.findAll(filters, user);
  }

  @ResolveField()
  async pricing(
    @Parent() album: AlbumDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await album
        .populate({ path: 'pricing', model: Pricing.name })
        .execPopulate();

    return album.pricing;
  }

  @ResolveField()
  async author(
    @Parent() album: AlbumDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await album.populate({ path: 'author', model: User.name }).execPopulate();

    return album.author;
  }
}
