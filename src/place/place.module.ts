import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { PlacesController } from './place.controller';
import { PlaceService } from './place.service';
import { City } from '../city/city.entity';
import { PlaceType } from '../place-type/place-type.entity';
import { CommentService } from '../comment/comment.service';
import {Comment} from '../comment/comment.entity';
import { RatingService } from '../rating/rating.service';
import { Rating } from '../rating/rating.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Place, City, PlaceType, Comment, Rating]),
    ],
    controllers: [PlacesController],
    providers: [PlaceService, CommentService, RatingService],
})
export class PlaceModule {}
