import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Post } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from 'src/posts/dtos/post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  findAll() {
    return this.postModel.find().exec();
  }

  async findOne(id: string) {
    const post = this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  create(payload: CreatePostDto) {
    const newPost =  new this.postModel(payload);
    return newPost.save();
  }

  update(id: string, changes: UpdatePostDto) {
    const post = this.postModel
    .findByIdAndUpdate(id, { $set: changes }, { new: true })
    .exec();
  if (!post) {
    throw new NotFoundException(`Post #${id} not found`);
  }
  return post;
  }

  delete(id: string) {
    this.postModel.findByIdAndDelete(id).exec();
  }
}
