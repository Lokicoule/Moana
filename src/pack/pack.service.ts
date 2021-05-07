import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCtx } from 'src/common/context/user.ctx';
import { Pack, PackDocument } from './entities/pack.entity';
import {
  CreatePackDto,
  PackDto,
  PacksDto,
  RemovePackDto,
  UpdatePackDto,
} from './dto/pack.queries';

@Injectable()
export class PackService {
  constructor(
    @InjectModel(Pack.name)
    private readonly packModel: Model<PackDocument>,
  ) {}

  async create(payload: CreatePackDto, userAWS: UserCtx): Promise<Pack> {
    const createdPack = new this.packModel(payload);
    createdPack.author = userAWS._id;
    return createdPack.save();
  }

  async update(payload: UpdatePackDto, userAWS: UserCtx): Promise<Pack> {
    return this.packModel.findOneAndUpdate(
      {
        _id: payload._id,
        author: userAWS._id,
      },
      {
        title: payload?.title,
        price: payload?.price,
        nbProducts: payload?.nbProducts,
      },
    );
  }

  async remove(payload: RemovePackDto, userAWS: UserCtx): Promise<Pack> {
    return this.packModel.findOneAndDelete({
      ...payload,
      author: userAWS._id,
    });
  }

  async findAll(filters: PacksDto, userAWS?: UserCtx): Promise<Pack[]> {
    const authorId = userAWS?._id;
    if (authorId)
      return this.packModel
        .find({
          ...filters,
          author: authorId,
        })
        .exec();

    return this.packModel.find({ ...filters }).exec();
  }

  async findOne(filters: PackDto): Promise<Pack | undefined> {
    return this.packModel.findOne({ ...filters }).exec();
  }
}
