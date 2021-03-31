import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './link.model';
import { Model } from 'mongoose';
import * as nanoid from 'nanoid';
import { UsersService } from 'src/users/users.service';
import { dataCreate } from '../utils/link.process';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel('Link') private readonly linkModel: Model<Link>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<any> {
    return await this.linkModel.find().exec();
  }

  async existsUri(uri: string) {
    return await this.linkModel.exists({ uri });
  }

  async findUri(uri: string) {
    const uriFound = await this.linkModel.findOne({ uri: uri }).exec();
    if (uriFound != null) {
      return { url: uriFound.url_target, statusCode: 302 };
    } else {
      return { url: 'http://localhost:3001', statusCode: 404 };
    }
  }

  async shortUrl(token: any, body: any, res: any): Promise<any> {
    const hashUnique = nanoid.nanoid(7);
    const url = body.url_target;
    const uri = body.uri;
    const local = 'http://localhost:3001/'
    const userOwner = await this.usersService.findOneToken(token);
    const linkUri = await this.linkModel.findOne({ uri: uri }).exec();
    if (linkUri) {
      if (userOwner === null) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'User not found' });
      } else {
        if (uri == linkUri.uri && linkUri.enabled == true) {
          return res.status(HttpStatus.ACCEPTED).json(linkUri);
        } else {
          if (uri == null || uri == '') {
            const dataform = dataCreate(hashUnique, url, hashUnique, token);
            const data = await new this.linkModel(dataform).save();
            return res.status(HttpStatus.ACCEPTED).json({
              url_source: local + hashUnique,
              uri: hashUnique,
              url_target: data.url_target,
            });
          } else {
            const dataform = dataCreate(hashUnique, url, uri, token);
            const data = await new this.linkModel(dataform).save();
            return res.status(HttpStatus.ACCEPTED).json({
              url_source: local + uri,
              uri: uri,
              url_target: data.url_target,
            });
          }
        }
      }
    } else {
      if (uri != null && uri != '') {
        const dataform = dataCreate(hashUnique, url, uri, token);
        const data = await new this.linkModel(dataform).save();
        return res.status(HttpStatus.ACCEPTED).json({
          url_source: local + uri,
          uri: uri,
          url_target: data.url_target,
        });
      } else {
        const dataform = dataCreate(hashUnique, url, hashUnique, token);
        const data = await new this.linkModel(dataform).save();
        return res.status(HttpStatus.ACCEPTED).json({
          url_source: local + hashUnique,
          uri: hashUnique,
          url_target: data.url_target,
        });
      }
    }
  }
}
