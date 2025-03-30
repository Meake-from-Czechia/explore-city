import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsController } from './rating.controller';
import { RatingService } from './rating.service';
import { Place } from '../place/place.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Rating, Place]),
    ],
    controllers: [RatingsController],
    providers: [RatingService],
})
export class RatingModule {}
