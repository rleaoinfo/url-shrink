import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from './link.model';
import * as dotenv from 'dotenv';

//env
dotenv.config();
const mongourl: string = process.env.MONGO_URL_LINKS || '';

//modules
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Link',
        schema: LinkSchema,
      },
    ]),
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
