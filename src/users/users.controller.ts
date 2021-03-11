import { HttpStatus ,Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
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
  @Post('authorize')
  async authorize(@Res() res,@Body('email') email: any) {
    const authorize = await this.service.findByEmail(email);
    if(authorize === null){
      return res.status(HttpStatus.BAD_REQUEST).json({message : "Email dont found in database"})
    }
    else{
      return res.status(HttpStatus.OK).json({acess_token : authorize.acess_token})
    }
  }

  @Put('update/:id')
  async update(@Param() params, @Body() body: any ) {
    return this.service.update(params.id,body);
  }

  @Delete('delete/:id')
  async remove(@Param() params) {
    return this.service.remove(params.id);
  }
  
}
