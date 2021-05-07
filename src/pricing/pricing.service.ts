import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCtx } from 'src/common/context/user.ctx';
import { Pricing, PricingDocument } from './entities/pricing.entity';
import {
  CreatePricingDto,
  PricingsDto,
  PricingDto,
  UpdatePricingDto,
  RemovePricingDto,
} from './dto/pricing.queries';

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Pricing.name)
    private readonly pricingModel: Model<PricingDocument>,
  ) {}

  async create(payload: CreatePricingDto, userAWS: UserCtx): Promise<Pricing> {
    const createdPricing = new this.pricingModel(payload);
    createdPricing.author = userAWS._id;
    return createdPricing.save();
  }

  async update(payload: UpdatePricingDto, userAWS: UserCtx): Promise<Pricing> {
    return this.pricingModel.findOneAndUpdate(
      {
        _id: payload._id,
        author: userAWS._id,
      },
      {
        title: payload.title,
        price: payload.price,
      },
    );
  }

  async remove(payload: RemovePricingDto, userAWS: UserCtx): Promise<Pricing> {
    return this.pricingModel.findOneAndDelete({
      ...payload,
      author: userAWS._id,
    });
  }

  async findAll(filters: PricingsDto, userAWS?: UserCtx): Promise<Pricing[]> {
    const authorId = userAWS?._id;
    if (authorId)
      return this.pricingModel
        .find({
          ...filters,
          author: authorId,
        })
        .exec();

    return this.pricingModel.find({ ...filters }).exec();
  }

  findOne(filters: PricingDto): Promise<Pricing | undefined> {
    return this.pricingModel.findOne({ ...filters }).exec();
  }
}
