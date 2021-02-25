import { Controller, Get, Query, Post, Body, Put, Param, Delete, Header, Redirect } from '@nestjs/common';
import { CreateCatDto } from '../dto/cat.dto';
// import { CreateCatDto, UpdateCatDto, ListAllEntities } from '../dto/cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'MyValue')
  create(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat: ${createCatDto.name}`;
  }

  @Get()
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }
  
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === 5) {
      return { url: 'https://docs.nestjs.com/v5/' }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    return `This action updates a #${id} cat ${updateCatDto.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}