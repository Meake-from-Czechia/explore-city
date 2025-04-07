import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlaceService } from './place.service';

import { Place } from './place.entity';
import { PlaceCreateDto } from './place.createDto';
import { PlaceEditDto } from './place.editDto';


@Controller()
export class PlacesController {
    constructor(private readonly placeService: PlaceService) {
    }

    @Get('/city/:id/places')
    async getPlacesByCityId(@Param('id') id: number): Promise<Place[]> {
        return await this.placeService.getPlacesByCityId(id);
    }


    @Get('/place/:id')
    async getPlaceById(@Param('id') id: number): Promise<Place> {
        return await this.placeService.getPlaceById(id);
    }
    @Post('/city/:id/place')
    async createPlaceOnCityId(@Param('id') id: number, @Body() placeCreateDto: PlaceCreateDto) {
        return await this.placeService.createPlaceOnCityId(id, placeCreateDto);
    }
    @Delete('/place/:id')
    async deletePlaceById(@Param('id') id: number): Promise<void> {
        return await this.placeService.deletePlaceById(id);
    }
    @Put('/place/:id')
    async editPlaceById(@Param('id') id: number, @Body() placeEditDto: PlaceEditDto): Promise<void>{
        return await this.placeService.editPlaceById(id,  placeEditDto);
    }
}