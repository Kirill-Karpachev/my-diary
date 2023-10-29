import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({
    required: true,
    minlength: 1,
    maxlength: 200,
  })
  title: string;

  @Prop({
    required: true,
    minlength: 1,
    maxlength: 2000,
  })
  description: string;

  @Prop({
    required: true,
    date: Date,
  })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
