import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from '../dto/cat.dto';
import { ICat } from '../models/cat.model';
import { CatsService } from '../services/cats.service';
@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }
}