import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './comment.createDto';

@Controller()
export class CommentsController {
    constructor(private readonly commentService: CommentService) {
    }

    @Get('/place/:id/comments')
    async getCommentsByPlaceId(@Param('id') id: number): Promise<Comment[]> {
        return await this.commentService.getCommentsByPlaceId(id);
    }

    @Post('/place/:id/comment')
    async createCommentOnPlaceId(@Param('id') id: number, @Body() commentCreateDto: CommentCreateDto): Promise<Comment> {
        return await this.commentService.createCommentOnPlaceId(id, commentCreateDto);
    }
    @Delete('/comment/:id')
    async deleteCommentByIdOnPlaceId(@Param('id') id: number): Promise<void> {
        return await this.commentService.deleteCommentById(id);
    }
}