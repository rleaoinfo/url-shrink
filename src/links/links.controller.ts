import { HttpStatus ,Body, Controller, Delete, Get, Param, Patch, Post, Put, Res , Headers, Req } from '@nestjs/common';
import { LinksService } from './links.service';
import { Link } from './link.model';

@Controller('links')
export class LinksController {
    constructor(private service: LinksService) {
    }
    
    @Get()
    async get(){
      return await this.service.findAll();
    }

    @Post('shorten')   
    async adjustUrl(@Headers('token') token:any,@Body() body: any){
      return await this.service.shortUrl(token,body)
    }


}
