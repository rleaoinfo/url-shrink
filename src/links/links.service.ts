import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from './link.model';
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

  existsUri(uri: string) {
    return this.linkModel.exists({ uri });
  }

  async shortUrl(token: any, body: any, res: any): Promise<any> {
    const hashUnique = nanoid.nanoid(7);
    const url = body.url_target;
    const uri = body.uri;
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
            const dataform = {
              hash_link: hashUnique,
              url_target: url,
              uri: hashUnique,
              token_reference: token,
              enabled: true,
            };
            const data = await new this.linkModel(dataform).save();
            return res.status(HttpStatus.ACCEPTED).json({
              url_source: 'http://localhost:3001/' + hashUnique,
              uri: hashUnique,
              url_target: data.url_target,
            });
          } else {
            const dataform = {
              hash_link: hashUnique,
              url_target: url,
              uri: uri,
              token_reference: token,
              enabled: true,
            };
            const data = await new this.linkModel(dataform).save();
            return res.status(HttpStatus.ACCEPTED).json({
              url_source: 'http://localhost:3001/' + uri,
              uri: uri,
              url_target: data.url_target,
            });
          }
        }
      }
    } else {
      if (uri != null && uri != '') {
        const dataform = {
          hash_link: hashUnique,
          url_target: url,
          uri: uri,
          token_reference: token,
          enabled: true,
        };
        const data = await new this.linkModel(dataform).save();
        return res.status(HttpStatus.ACCEPTED).json({
          url_source: 'http://localhost:3001/' + uri,
          uri: uri,
          url_target: data.url_target,
        });
      } else {
        const dataform = {
          hash_link: hashUnique,
          url_target: url,
          uri: hashUnique,
          token_reference: token,
          enabled: true,
        };
        const data = await new this.linkModel(dataform).save();
        return res.status(HttpStatus.ACCEPTED).json({
          url_source: 'http://localhost:3001/' + hashUnique,
          uri: hashUnique,
          url_target: data.url_target,
        });
      }
    }
  }
}