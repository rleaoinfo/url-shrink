import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from './stats.model';

@Injectable()
export class StatsService {
    constructor(
        @InjectModel('Stats') private readonly statsModel: Model<Stats>
      ) {}

      async addStats(hash_link: string): Promise<any> {
          return await this.statsModel.find().exec();
      }
}