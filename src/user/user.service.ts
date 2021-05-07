import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/user.mutations.dto';
import { UsersDto, UserDto } from './dto/user.queries.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    console.log(payload);
    const createdUser = new this.userModel(payload);
    return createdUser.save();
  }

  findAll(filters: UsersDto): Promise<User[]> {
    return this.userModel.find({ ...filters }).exec();
  }

  findOne(filters: UserDto): Promise<User | undefined> {
    return this.userModel.findOne({ ...filters }).exec();
  }
}
