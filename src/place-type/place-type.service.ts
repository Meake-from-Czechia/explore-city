import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceType } from './place-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceTypeService {
    constructor(
      @InjectRepository(PlaceType)
      private readonly placeTypeRepository: Repository<PlaceType>,
    ) {}
    async getPlaceTypes(): Promise<PlaceType[]> {
        return this.placeTypeRepository.find();
    }
} 