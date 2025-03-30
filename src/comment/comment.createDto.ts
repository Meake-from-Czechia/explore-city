import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    text: string;
}