import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from './stats.model';
import { dataCreate } from '../utils/stats.process'

@Injectable()
export class StatsService {
    constructor(
        @InjectModel('Stats') private readonly statsModel: Model<Stats>
    ) { }

    async addStats(hash_link: string, ip: string, geo: string): Promise<any> {
        const data = dataCreate(hash_link, 1, ip, geo)
        const result = await new this.statsModel(data).save();
        return result;
    }
}