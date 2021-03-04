import { Controller, Get, Post, Body } from '@nestjs/common';
import { Roles } from 'src/common/roles.decorator';
import { Cat } from 'src/common/cat.decorator';
import { ValidationPipe } from 'src/common/validation.pipe';
import { CreateCatDto } from '../dto/cat.dto';
import { ICat } from '../models/cat.model';
import { CatsService } from '../services/cats.service';
import { Auth } from 'src/common/auth.decorator';
@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Post()
  @Auth('admin')
  async create(@Cat('breed') createCatDto: CreateCatDto) {
    console.log('breed:', createCatDto);
  }

  @Get()
  @Auth('admin', 'reader')
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }
}