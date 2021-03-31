import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    }),LinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
