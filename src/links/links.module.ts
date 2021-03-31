import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { StatsModule } from '../stats/stats.module';
import { LinkSchema } from './link.model';

//modules
@Module({
  imports: [
    UsersModule,StatsModule,
    MongooseModule.forFeature([
      {
        name: 'Link',
        schema: LinkSchema,
      },
    ]),
  ],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
