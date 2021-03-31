import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private service: StatsService) {}

  @Post()
  async insertStats() {
    return 0;
  }
}
