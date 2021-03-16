import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './link.model';
import { User } from '../users/user.model';
import { Model } from 'mongoose';
import * as nanoid from 'nanoid';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel('Link') private readonly linkModel: Model<Link>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<any> {
    return await this.linkModel.find().exec();
  }

  async shortUrl(token: any, body: any , res:any): Promise<any> {
    const hashUnique = nanoid.nanoid(7);
    const url = body.url_target;
    const uri = body.uri;
    const userOwner = await this.usersService.findOne(token);
    if(userOwner === null){
      return res.status(HttpStatus.BAD_REQUEST).json({message: "User not found"})
    }
    else{
      const dataform = {hash_link: hashUnique,url_target:url,uri:uri};
      const data = await new this.linkModel(dataform).save();
      console.log(data);
      return res.status(HttpStatus.ACCEPTED).json({url_source: "http://localhost:3001/"+ hashUnique, uri:data.uri ,url_target: data.url_target });
    }
  }
}
