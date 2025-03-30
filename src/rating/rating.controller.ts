import { Controller, Get } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Rating } from './rating.entity';

@Controller('rating')
export class RatingsController{
    constructor(private readonly ratingService: RatingService){}
    @Get()
    getRatings(): Promise<Rating[]>{
        return this.ratingService.getRatings();
    }
}