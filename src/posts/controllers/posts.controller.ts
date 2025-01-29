import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PostsService } from '../services/posts.service';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get(':postId')
  @HttpCode(HttpStatus.ACCEPTED)
  getPosts(@Param('postId') postId: string) {
    return this.postsService.findOne(postId);
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAll() {
    return this.postsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreatePostDto) {
    return this.postsService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id') id: string, @Body() payload: UpdatePostDto) {
    return this.postsService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}
