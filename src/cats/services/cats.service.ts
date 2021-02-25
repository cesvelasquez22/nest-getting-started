import { Injectable } from '@nestjs/common';
import { ICat } from '../models/cat.model';

@Injectable()
export class CatsService {
    private readonly cats: ICat[] = [];

    create(cat: ICat) {
        this.cats.push(cat);
    }

    findAll(): ICat[] {
        return this.cats;
    }
}
