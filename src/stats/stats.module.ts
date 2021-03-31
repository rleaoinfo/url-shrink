import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { StatsSchema } from './stats.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Stats',
        schema: StatsSchema,
      },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService]
})
export class StatsModule {}
