import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingAvgDto } from './rating.avgDto';
import { RatingCreateDto } from './rating.createDto';

@Controller()
export class RatingsController{
    constructor(private readonly ratingService: RatingService){}
    @Get('/place/:id/ratings')
    async getAverageRatingByPlaceId(@Param('id') id: number): Promise<RatingAvgDto>{
        return await this.ratingService.getAverageRatingByPlaceId(id);
    }

    @Post('/place/:id/rating')
    async createRatingOnPlaceId(@Param('id') id: number,@Body() ratingCreateDto: RatingCreateDto): Promise<void>{
        return await this.ratingService.createRatingOnPlaceId(id, ratingCreateDto);
    }

}