import { CloudinaryService } from '@cloudinary/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { S3Service } from '@s3/s3.service';
import { Model } from 'mongoose';
import { UserCtx } from '../common/context/user.ctx';
import {
  CreatePhotoDto,
  RemovePhotoDto,
  UpdatePhotoDto,
} from './dto/photo.mutations.dto';
import {
  GetSignedUploadURLRequest,
  GetSignedUploadURLResponse,
} from './dto/upload.queries.dto';
import { Photo, PhotoDocument } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo.name)
    private readonly photoModel: Model<PhotoDocument>,

    //private readonly s3Service: S3Service,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public makeUploadURL(
    me: UserCtx,
    req: GetSignedUploadURLRequest,
  ): GetSignedUploadURLResponse {
    const folder = `${me._id}/${req.albumId.toString()}`;
    return this.cloudinaryService.makeSignedURL(folder, req.filename);
  }

  /* async upload(
    createReadStream: () => ReadStream,
    filename: string,
    mimeType,
  ): Promise<boolean> {
    return await this.s3Service.uploadStream(filename, createReadStream());
  } */

  async create(payload: CreatePhotoDto, me: UserCtx): Promise<Photo> {
    const folder = `${me._id}/${payload.album.toString()}/${payload.type}`;
    const publicId = `${folder}/${payload.filename}`;
    const createdPhoto = new this.photoModel(payload);
    createdPhoto.author = me._id;
    createdPhoto.publicId = publicId;
    createdPhoto.uploaded = false;
    return createdPhoto.save();
  }

  async update(payload: UpdatePhotoDto, userAWS: UserCtx): Promise<Photo> {
    return this.photoModel.findOneAndUpdate(
      {
        _id: payload._id,
        author: userAWS._id,
      },
      {
        ...payload,
      },
    );
  }

  async remove(payload: RemovePhotoDto, userAWS: UserCtx): Promise<Photo> {
    return this.photoModel.findOneAndDelete({
      ...payload,
      author: userAWS._id,
    });
  }
}
