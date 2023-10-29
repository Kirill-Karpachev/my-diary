import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './entities/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto) {
    return await new this.postModel(createPostDto).save();
  }

  async findAll(sort, page = 0, limit = 0) {
    const resultLength = await this.postModel.count();
    const sortItem = sort === 'desk' ? 1 : -1;
    const date = this.postModel
      .find()
      .sort({ date: sortItem })
      .skip(page * limit);

    if (limit) {
      date.limit(limit);
    }

    const result = await date;

    return {
      totalItems: resultLength,
      date: result,
    };
  }

  async findOne(id: string) {
    return await this.postModel.findById(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
