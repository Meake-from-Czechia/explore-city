import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { Repository } from 'typeorm';
import { PlaceCreateDto } from './place.createDto';
import { City } from '../city/city.entity';
import { PlaceType } from '../place-type/place-type.entity';

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

    async getPlaces(): Promise<Place[]> {
        return this.placeRepository.find();
    }

    async getPlacesByCityId(id: number): Promise<Place[]> {
        return this.placeRepository.find({
            where: {
                city: {
                    id: id,
                },
            },
        });
    }

    async CreateOnCity(cityId: number, placeCreateDto: PlaceCreateDto): Promise<Place> {
        const city = await this.cityRepository.findOneBy({ id: cityId });
        const type = await this.typeRepository.findOneBy({ id: placeCreateDto.typeId });

        if (!city) throw new NotFoundException(`City with id ${cityId} not found`);

        if (!type) throw new NotFoundException(`Type with id ${placeCreateDto.typeId} not found`);

        const place = new Place(type, city, placeCreateDto.name, placeCreateDto.description, placeCreateDto.address);
        return await this.placeRepository.save(place);
    }

    async getPlaceById(id: number): Promise<Place> {
        const place = await this.placeRepository.findOne({
            relations: ['placeType', 'city'],
            where: {
                id: id
            }
        });
        if (!place) throw new NotFoundException(`Place with id ${id} not found`);

        return place;
    }
}