import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsController } from './comment.controller';
import { CommentService } from './comment.service';
import { Place } from '../place/place.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Comment, Place]),
    ],
    controllers: [CommentsController],
    providers: [CommentService],
})
export class CommentModule {}
