import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserMoviesDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsArray()
  movies: MovieDto[];
}

export class MovieDto {
  @IsNumber()
  @IsNotEmpty()
  id_movie: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsString()
  @IsNotEmpty()
  poster_path: string;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsString()
  @IsNotEmpty()
  first_air_date: string;

  @IsNumber()
  @IsNotEmpty()
  vote_average: number;
}
