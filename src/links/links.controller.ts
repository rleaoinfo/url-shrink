import { Body, Controller, Get, Post, Res, Headers, Param, Redirect, UseGuards } from '@nestjs/common';
import { LinksService } from './links.service';
import { UniqueUriPipe } from './unique-uri.pipe';
import { AuthGuard } from '../users/users.guard';

@Controller('links')
export class LinksController {
  constructor(private service: LinksService) {}

  @Get()
  async get() {
    return await this.service.findAll();
  }

  @Post('shorten')
  @UseGuards(AuthGuard)
  async adjustUrl(
    @Res() res: any,
    @Headers('token') token: any,
    @Body(UniqueUriPipe) body: any,
  ) {
    return await this.service.shortUrl(token, body, res);
  }
}