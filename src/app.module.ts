import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

//env
dotenv.config();
const mongourl: string = process.env.MONGO_URL_USERS || '';

@Module({
  imports: [MongooseModule.forRoot(mongourl),UsersModule,LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
