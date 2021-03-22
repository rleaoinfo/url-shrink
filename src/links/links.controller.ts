import { Body, Controller, Get, Post, Res, Headers, Param, Redirect } from '@nestjs/common';
import { LinksService } from './links.service';
import { UniqueUriPipe } from './unique-uri.pipe';
@Controller('links')
export class LinksController {
  constructor(private service: LinksService) {}

  @Get()
  async get() {
    return await this.service.findAll();
  }
  @Get(':id')
  @Redirect('', 301)
  async getUri(@Param() params) {
    return await this.service.findUri(params.id);
  }

  @Post('shorten')
  async adjustUrl(
    @Res() res: any,
    @Headers('token') token: any,
    @Body(UniqueUriPipe) body: any,
  ) {
    return await this.service.shortUrl(token, body, res);
  }
}