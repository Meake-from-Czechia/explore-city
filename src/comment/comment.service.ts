import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentCreateDto } from './comment.createDto';
import { Place } from '../place/place.entity';

@Injectable()
export class CommentService {
    constructor(
      @InjectRepository(Comment)
      private readonly commentRepository: Repository<Comment>,
      @InjectRepository(Place)
      private readonly placeRepository: Repository<Place>
    ) {}
    async getComments(): Promise<Comment[]> {
        return this.commentRepository.find({
            relations: ['place'],
        });
    }

    getCommentsByPlaceId(id: number) {
        return this.commentRepository.find({
            where: {
                place:{
                    id: id,
                }
            }
        })
    }

    async createComment(placeId: number, commentDto: CommentCreateDto) {
        const place = await this.placeRepository.findOneBy({id: placeId});
        if (!place) throw new NotFoundException(`Place with id ${placeId} not found`);
        return await this.commentRepository.save(new Comment(commentDto.name, commentDto.text, place))
    }
}