import { ApiProperty } from '@nestjs/swagger';

export class PlaceEditDto {
    @ApiProperty()
    typeId: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    address: string;
}