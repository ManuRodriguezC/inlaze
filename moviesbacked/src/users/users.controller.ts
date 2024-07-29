import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schemas';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dot';
import { UpdateUserMoviesDto } from 'src/dto/update-user.dtio';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/')
  async findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Post('/createduser')
  async createUser(@Body() body: CreateUserDto) {
    const { username, email } = body;
    const userFind = await this.usersService.userEmailExist(email);
    if (userFind) {
      throw new BadRequestException(
        'An account already exists with this Email',
      );
    }
    const userUsername = await this.usersService.userUsernameExist(username);
    if (userUsername) {
      throw new BadRequestException(
        'An account already exists with this Username',
      );
    }
    return this.usersService.createUser(body);
  }

  @Post('/loginuser')
  async loginUser(@Body() body: LoginUserDto) {
    const { username: loginUsername, password } = body;
    const user = await this.usersService.validateUser(loginUsername, password);
    if (!user) {
      throw new BadRequestException('Please enter your correct credentials');
    }
    const { username, favorites, saved } = user;
    return {
      username,
      favorites,
      saved,
    };
  }

  @Put('/updatefavorites')
  async updateUserFavorites(@Body() body: UpdateUserMoviesDto) {
    const { username, movies } = body;
    const datas = await this.usersService.updateFavorite(username, movies);
    const { favorites } = datas;
    return favorites;
  }

  @Put('/updatesaved')
  async updateUserSaved(@Body() body: UpdateUserMoviesDto) {
    const { username, movies } = body;
    const datas = await this.usersService.updateSaved(username, movies);
    const { saved } = datas;
    return saved;
  }

  @Delete('/deleteuser')
  async deleteUser(@Body() body: any) {
    const { username } = body;
    return this.usersService.deleteUser(username);
  }
}
