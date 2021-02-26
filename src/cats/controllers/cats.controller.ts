import { Controller, Get, Post, Body } from '@nestjs/common';
import { Roles } from 'src/common/roles.decorator';
import { ValidationPipe } from 'src/common/validation.pipe';
import { CreateCatDto } from '../dto/cat.dto';
import { ICat } from '../models/cat.model';
import { CatsService } from '../services/cats.service';
@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @Roles('reader', 'admin')
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }
}