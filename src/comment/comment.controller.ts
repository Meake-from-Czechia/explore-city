import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('comment')
export class CommentsController {
    constructor(private readonly commentService: CommentService) {
    }

    @Get()
    getComments() : Promise<Comment[]> {
        return this.commentService.getComments();
    }
}