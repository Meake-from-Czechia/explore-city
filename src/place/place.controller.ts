import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Place } from './place.entity';
import { Comment } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { CommentCreateDto } from '../comment/comment.createDto';
import { Rating } from '../rating/rating.entity';
import { RatingService } from '../rating/rating.service';
import { RatingCreateDto } from '../rating/rating.createDto';

@Controller('place')
export class PlacesController {
    constructor(private readonly placeService: PlaceService,
                private readonly commentService: CommentService,
                private readonly ratingService: RatingService) {
    }

    @Get()
    getPlaces(): Promise<Place[]> {
        return this.placeService.getPlaces();
    }

    @Get(':id')
    getPlaceById(@Param('id') id: number) : Promise<Place> {
        return this.placeService.getPlaceById(id);
    }

    @Get(':id/comments')
    getCommentsByPlaceId(@Param('id') id: number): Promise<Comment[]> {
        return this.commentService.getCommentsByPlaceId(id);
    }

    @Post(':id/comments')
    createCommentByPlaceId(@Param('id') id: number, @Body() commentDto: CommentCreateDto): Promise<Comment> {
        return this.commentService.createComment(id, commentDto);
    }

    @Get(':id/rating')
    getRatingsByPlaceId(@Param('id') id: number) : Promise<Rating[]> {
        return this.ratingService.getRatingsByPlaceId(id);
    }
    @Post(':id/rating')
    createRatingByPlaceId(@Param('id') id: number, @Body() ratingDto: RatingCreateDto): Promise<Rating> {
        return this.ratingService.createRating(id, ratingDto);
    }
}