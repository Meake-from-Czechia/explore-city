import { ApiProperty } from '@nestjs/swagger';

export class RatingCreateDto {
    @ApiProperty()
    rating: number;
}