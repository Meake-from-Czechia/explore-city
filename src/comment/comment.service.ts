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

    async getCommentsByPlaceId(id: number) {
        if (!await this.placeRepository.findOneBy({id:id})) throw new NotFoundException(`Place with id "${id}" not found.`)
        return this.commentRepository.find({
            where: {
                place:{
                    id: id,
                }
            }
        })
    }

    async createCommentOnPlaceId(placeId: number, commentDto: CommentCreateDto) {
        const place = await this.placeRepository.findOneBy({id: placeId});
        if (!place) throw new NotFoundException(`Place with id ${placeId} not found`);
        return await this.commentRepository.save(new Comment(commentDto.name, commentDto.text, place))
    }

    async deleteCommentById(id: number): Promise<void> {
        if (!await this.commentRepository.findOneBy({id:id})) throw new NotFoundException(`Comment with id "${id}" not found.`)
        await this.commentRepository.delete(id);
        return;
    }
}