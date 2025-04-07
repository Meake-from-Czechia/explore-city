import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { Repository } from 'typeorm';
import { Place } from '../place/place.entity';
import { RatingCreateDto } from './rating.createDto';
import { RatingAvgDto } from './rating.avgDto';

@Injectable()
export class RatingService {
    constructor(
      @InjectRepository(Rating)
      private readonly ratingRepository: Repository<Rating>,
      @InjectRepository(Place)
      private readonly placeRepository: Repository<Place>,
    ) {
    }

    async createRatingOnPlaceId(placeId: number, ratingDto: RatingCreateDto): Promise<void> {
        const place = await this.placeRepository.findOneBy({ id: placeId });
        if (!place) throw new NotFoundException(`Place with id ${placeId} not found`);
        await this.ratingRepository.save(new Rating(place, ratingDto.rating));
        return;
    }

    async getAverageRatingByPlaceId(id: number): Promise<RatingAvgDto> {
        if (!await this.placeRepository.findOneBy({ id: id })) throw new NotFoundException(`Place with id ${id} not found`);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const avgResult = await this.ratingRepository.createQueryBuilder('rating')
          .where('rating.placeId = :id', { id })
          .select('AVG(CAST(rating.rating as float))', 'avg')
          .getRawOne();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const avg = parseFloat(avgResult?.avg).toFixed(2) || 0;
        const count = await this.ratingRepository.count({ where: { place: { id: id } } });

        return new RatingAvgDto(+avg, count);
    }
}