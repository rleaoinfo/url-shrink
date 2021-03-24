import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  
  import { LinksService } from './links.service';
  
  @Injectable()
  export class UniqueUriPipe implements PipeTransform {
    constructor(private readonly linkSerivce: LinksService) {}
  
    async transform(value: any, metadata: ArgumentMetadata) {
      const { uri } = value || {};
      const existsUri = await this.linkSerivce.existsUri(uri);
      if (existsUri) {
        throw new BadRequestException(`Existing uri found on database : ${uri} `);
      }
  
      return value;
    }
  }