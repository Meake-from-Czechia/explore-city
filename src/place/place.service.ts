import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { Repository } from 'typeorm';
import { PlaceCreateDto } from './place.createDto';
import { City } from '../city/city.entity';
import { PlaceType } from '../place-type/place-type.entity';
import { PlaceEditDto } from './place.editDto';

@Injectable()
export class PlaceService {
    constructor(
      @InjectRepository(Place)
      private readonly placeRepository: Repository<Place>,
      @InjectRepository(City)
      private readonly cityRepository: Repository<City>,
      @InjectRepository(PlaceType)
      private readonly typeRepository: Repository<PlaceType>,
    ) {
    }


    async getPlacesByCityId(id: number): Promise<Place[]> {
        if (!await this.cityRepository.findOneBy({ id: id })) throw new NotFoundException(`City with id "${id}" not found.`);
        return await this.placeRepository.find({
            where: {
                city: {
                    id: id,
                },
            },
            relations: ['placeType'],
        });
    }

    async getPlaceById(id: number): Promise<Place> {
        const place = await this.placeRepository.findOne({
            relations: ['placeType', 'city'],
            where: {
                id: id,
            },
        });
        if(!place) throw new NotFoundException(`Place with id "${id}" not found.`);
        return place;

    }

    async createPlaceOnCityId(cityId: number, placeCreateDto: PlaceCreateDto) {
        const city = await this.cityRepository.findOneBy({ id: cityId });
        const type = await this.typeRepository.findOneBy({ id: placeCreateDto.typeId });

        if (!city) throw new NotFoundException(`City with id ${cityId} not found`);
        if (!type) throw new NotFoundException(`Type with id ${placeCreateDto.typeId} not found`);

        const place = new Place(type, city, placeCreateDto.name, placeCreateDto.description, placeCreateDto.address);
        return await this.placeRepository.save(place);
    }

    async deletePlaceById(id: number): Promise<void> {
        if(!await this.placeRepository.findOneBy({ id: id })) throw new NotFoundException(`Place with id "${id}" not found.`);
        await this.placeRepository.delete(id);
        return;
    }

    async editPlaceById(id: number, placeEditDto: PlaceEditDto): Promise<void> {
        const place = await this.placeRepository.findOneBy({ id: id });
        if (!place) throw new NotFoundException(`Place with id ${id} not found`);
        const type = await this.typeRepository.findOneBy({ id: placeEditDto.typeId });
        if (!type) throw new NotFoundException(`Type with id ${placeEditDto.typeId} not found`);
        place.placeType = type;
        place.address = placeEditDto.address;
        place.name = placeEditDto.name;
        place.description = placeEditDto.description;
        await this.placeRepository.save(place);
    }
}