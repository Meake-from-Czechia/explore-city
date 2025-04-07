import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceType } from './place-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceTypeService {
    constructor(
      @InjectRepository(PlaceType)
      private readonly placeTypeRepository: Repository<PlaceType>,
    ) {
    }

    async getPlaceTypes(): Promise<PlaceType[]> {
        return await this.placeTypeRepository.find();
    }

    async getPlaceTypeById(id: number): Promise<PlaceType> {
        const type = await this.placeTypeRepository.findOne({ where: { id: id } });
        if (!type) throw new NotFoundException(`Type with id "${id}" not found. `);
        return type;
    }
}
