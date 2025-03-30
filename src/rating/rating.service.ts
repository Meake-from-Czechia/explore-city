import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { Repository } from 'typeorm';
import { Place } from '../place/place.entity';
import { RatingCreateDto } from './rating.createDto';

@Injectable()
export class RatingService {
    constructor(
      @InjectRepository(Rating)
      private readonly ratingRepository: Repository<Rating>,
      @InjectRepository(Place)
      private readonly placeRepository: Repository<Place>,
    ) {}
    async getRatings(): Promise<Rating[]> {
        return this.ratingRepository.find({
            relations: ['place'],
        });
    }

    async getRatingsByPlaceId(id: number) : Promise<Rating[]> {
        return await this.ratingRepository.find({
            where:{
                place: {
                    id: id,
                }
            },
            select:{
                rating: true,
            }
        })
    }

    async createRating(placeId: number, ratingDto: RatingCreateDto) : Promise<Rating> {
        const place = await this.placeRepository.findOneBy({id: placeId});
        if (!place) throw new NotFoundException(`Place with id ${placeId} not found`);
        return await this.ratingRepository.save(new Rating(place, ratingDto.rating))
    }
}