import { CognitoRolesGuard } from '@cognito/guards/cognito-roles.guard';
import { CognitoGuard } from '@cognito/guards/cognito.guard';
import { UserCtx } from '@common/context/user.ctx';
import { Roles } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/user.decorator';
import { Role } from '@common/enums/role.enum';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  CreatePhotoDto,
  RemovePhotoDto,
  UpdatePhotoDto,
} from './dto/photo.mutations.dto';
import {
  GetSignedUploadURLRequest,
  GetSignedUploadURLResponse,
} from './dto/upload.queries.dto';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './photo.service';

@Resolver()
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  /* @Mutation(() => Boolean)
  public async upload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload,
  ): Promise<boolean> {
    return this.uploadService.upload(createReadStream, filename, mimetype);
  } */

  @Query(() => GetSignedUploadURLResponse)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  public getSignedUploadURL(
    @CurrentUser() me: UserCtx,
    @Args('request') request: GetSignedUploadURLRequest,
  ): GetSignedUploadURLResponse {
    return this.photoService.makeUploadURL(me, request);
  }

  @Mutation(() => Photo)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  createPhoto(
    @Args('payload') payload: CreatePhotoDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.photoService.create(payload, user);
  }

  @Mutation(() => Photo)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  updatePhoto(
    @Args('payload') payload: UpdatePhotoDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.photoService.update(payload, user);
  }

  @Mutation(() => Photo)
  @Roles(Role.Photograph)
  @UseGuards(CognitoGuard, CognitoRolesGuard)
  removeCategory(
    @Args('payload') payload: RemovePhotoDto,
    @CurrentUser() user: UserCtx,
  ) {
    return this.photoService.remove(payload, user);
  }
}
