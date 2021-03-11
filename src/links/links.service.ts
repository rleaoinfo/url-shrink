import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './link.model';
import { Model } from 'mongoose';

@Injectable()
export class LinksService {
  constructor(@InjectModel('Link') private readonly linkModel: Model<Link>) {}
  
  async findAll(): Promise<any> {
    return await this.linkModel.find().exec();
  }
}
