import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

//env
dotenv.config();
const mongourl: string = process.env.MONGO_URL_USERS || '';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService) =>{
        const url = configService.get('MONGO_URL_USERS');

        return{
          uri: url,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        };
      },
      inject:[ConfigService],
    }),UsersModule,LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
