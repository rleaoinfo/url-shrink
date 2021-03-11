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

  async findByEmail(email : string) {
    const result = await this.userModel.findOne({email: email}).exec();
    return result;
  }


  async findById(id: number) {
    const result = await this.userModel.findById(id);
    return result;
  }

  async update(id: any, body: any): Promise<any> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id,body,{new:true , useFindAndModify:true});
    return updatedUser;
  }

  async remove(id: any) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    return deleteUser;
  }
}
