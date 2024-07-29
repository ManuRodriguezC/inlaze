import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { MovieDto } from 'src/dto/update-user.dtio';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private comparePassword(
    plainTextPassword: string,
    hashedPass: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPass);
  }

  async userEmailExist(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async userUsernameExist(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    return !!user;
  }

  findAllUsers() {
    return this.userModel.find();
  }

  async createUser(createUser: CreateUserDto) {
    const { password, ...userData } = createUser;
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return { username: user.username };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user || !(await this.comparePassword(password, user.password))) {
      return null;
    }
    return user;
  }

  async updateFavorite(username: string, movies: MovieDto[]) {
    const uniqueMovies = movies.reduce((accumulator, currentMovie) => {
      if (
        !accumulator.some((movie) => movie.id_movie === currentMovie.id_movie)
      ) {
        accumulator.push(currentMovie);
      }
      return accumulator;
    }, []);
    return this.userModel
      .findOneAndUpdate(
        { username },
        { $set: { favorites: uniqueMovies } },
        { new: true },
      )
      .exec();
  }

  async updateSaved(username: string, movies: MovieDto[]) {
    const uniqueMovies = movies.reduce((accumulator, currentMovie) => {
      if (
        !accumulator.some((movie) => movie.id_movie === currentMovie.id_movie)
      ) {
        accumulator.push(currentMovie);
      }
      return accumulator;
    }, []);
    return this.userModel
      .findOneAndUpdate(
        { username },
        { $set: { saved: uniqueMovies } },
        { new: true },
      )
      .exec();
  }

  async deleteUser(username: string) {
    return this.userModel.findOneAndDelete({ username });
  }
}
