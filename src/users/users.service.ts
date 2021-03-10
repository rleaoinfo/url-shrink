import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { doc } from 'prettier';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async create(doc: User) {
    const result = await new this.userModel(doc).save();
    return result.id;
  }

  async findById(id: number) {
    const result = await this.userModel.findById(id);
    return result;
  }

  async update(id: any, email: any, acess_token: any): Promise<any> {
    const updatedUser = await this.userModel.findById(id);
    console.log(id);
    if (email) {
      updatedUser.email = email;
    }
    if (acess_token) {
      updatedUser.acess_token = acess_token;
    }
    updatedUser.save();
    return updatedUser;
  }

  async remove(user: User) {
    // ...
  }
}
