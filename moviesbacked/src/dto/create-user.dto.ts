import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsOptional()
  favortites?: MovieDto[];

  @IsArray()
  @IsOptional()
  saved?: MovieDto[];
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
