import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async findOneToken(token: any): Promise<any> {
    const result = await this.userModel.findOne({acess_token:token}).exec();
    return result;
  }

  async create(doc: User) {
    const result = await new this.userModel(doc).save();
    return result;
  }

  async findByEmail(email: string, res: any) {
    const result = await this.userModel.findOne({ email: email }).exec();
    if (result === null) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email dont found in database' });
    } else {
      return res
        .status(HttpStatus.OK)
        .json({ acess_token: result.acess_token });
    }
  }

  async findById(id: number) {
    const result = await this.userModel.findById(id);
    return result;
  }

  async update(id: any, body: any): Promise<any> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
      useFindAndModify: true,
    });
    return updatedUser;
  }

  async remove(id: any) {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    return deleteUser;
  }
}
