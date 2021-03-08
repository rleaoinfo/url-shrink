import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import * as dotenv from "dotenv";

//env
dotenv.config();
const mongourl: string = process.env.MONGO_URL || "";

//modules
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    MongooseModule.forRoot(
      //'mongodb+srv://dbUser:0VpCevg0CB1BHWLy@cluster0.vn9zc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      mongourl,
    ),
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
