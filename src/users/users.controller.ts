import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get()
  async getUsers() {
      const users = await this.userServices.getUsers();
      return users;
  }

  @Get(':userName')
  async getUser(@Param('userName') username){
    const user = await this.userServices.getUser(username)
    return user;
  }

  @Post()
  async addUser(@Body() createUserDTO: CreateUserDTO){
      const user = await this.userServices.addUser(createUserDTO);
      return user;
  }

  @Delete()
  async deleteUser(@Query() query){
      const users = await this.userServices.deleteUser(query.userID)
      return users
  }

  
}
