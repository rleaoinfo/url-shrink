import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDTO} from './dto/create-user.dto'
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Get()
  async get(){
    return await this.service.findAll();
  }

  @Get('findById/:id')
  async getId(@Param() params) {
    const users =  await this.service.findById(params.id);
    return users;
  }

  @Post('create')
  async create(@Body() user: User) {
    return this.service.create(user);
  }

  @Put('update/:id')
  async update(@Param() params, @Body('email') email: any , @Body('acess_token') acess_token:any ) {
    return this.service.update(params.id,email,acess_token);
  }

  @Delete('delete/:id')
  async remove(@Param() params) {
    return this.service.remove(params.id);
  }
  
}
