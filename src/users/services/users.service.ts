import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { PostsService } from 'src/posts/services/posts.service';

@Injectable()
export class UsersService {
  constructor(
    private postsService: PostsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    const hashPassword = await bcrypt.hashSync(payload.password, 10);
    newUser.password = hashPassword;
    const model = await newUser.save();
    return model;
  }

  update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  delete(id: string) {
    this.userModel.findByIdAndDelete(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
