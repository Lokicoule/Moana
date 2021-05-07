import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from './entities/album.entity';
import {
  CreateAlbumDto,
  UpdateAlbumDto,
  RemoveAlbumDto,
} from './dto/album.mutations.dto';
import { AlbumDto, AlbumsDto } from './dto/album.queries.dto';
import { UserCtx } from 'src/common/context/user.ctx';
import { S3Service } from '../s3/s3.service';
import { ReadStream } from 'fs-capacitor';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<AlbumDocument>,
    private readonly s3Service: S3Service,
  ) {}

  async create(payload: CreateAlbumDto, userAWS: UserCtx): Promise<Album> {
    const createdAlbum = new this.albumModel(payload);
    createdAlbum.author = userAWS._id;
    return createdAlbum.save();
  }

  async update(payload: UpdateAlbumDto, userAWS: UserCtx): Promise<Album> {
    return this.albumModel.findOneAndUpdate(
      {
        _id: payload._id,
        author: userAWS._id,
      },
      {
        ...payload,
      },
    );
  }

  async remove(payload: RemoveAlbumDto, userAWS: UserCtx): Promise<Album> {
    return this.albumModel.findOneAndDelete({
      ...payload,
      author: userAWS._id,
    });
  }

  async findAll(filters: AlbumsDto, userAWS?: UserCtx): Promise<Album[]> {
    const authorId = userAWS?._id;
    if (authorId)
      return this.albumModel
        .find({
          ...filters,
          author: authorId,
        })
        .exec();

    return this.albumModel.find({ ...filters }).exec();
  }

  async findOne(filters: AlbumDto): Promise<Album | undefined> {
    return this.albumModel.findOne({ ...filters }).exec();
  }

  /* async upload(
    createReadStream: () => ReadStream,
    filename: string,
    mimeType,
  ): Promise<boolean> {
    return await this.s3Service.uploadStream(filename, createReadStream());
  } */
}
