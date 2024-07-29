import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Movie {
  @Prop({ required: true })
  id_movie: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ required: true })
  first_air_date: string;

  @Prop({ required: true })
  vote_average: number;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true, trim: true })
  username: string;
  @Prop({ required: true, trim: true })
  password: string;
  @Prop({ unique: true, required: true, trim: true })
  email: string;
  @Prop({ type: [Movie], default: [] })
  favorites: Movie[];
  @Prop({ type: [Movie], default: [] })
  saved: Movie[];
}

export const UserSchema = SchemaFactory.createForClass(User);
