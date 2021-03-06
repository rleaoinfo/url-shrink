import { Controller, Get, Param, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { LinksService } from './links/links.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly linksService: LinksService,
  ) {}

  @Get('l/:id')
  @Redirect()
  async getUri(@Param() params : any, @Req() req : any) {
    return await this.linksService.findUri(params.id,req.connection.remoteAddress);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
 