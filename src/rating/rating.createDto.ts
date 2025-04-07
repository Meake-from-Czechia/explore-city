import { ApiProperty } from '@nestjs/swagger';

export class RatingCreateDto {
    @ApiProperty({ example: 5})
    rating: number;
}