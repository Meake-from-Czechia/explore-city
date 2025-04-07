import { Controller, Get, Param } from '@nestjs/common';
import { PlaceTypeService } from './place-type.service';
import { PlaceType } from './place-type.entity';

@Controller()
export class PlaceTypesController{
    constructor(private readonly placeTypeService: PlaceTypeService){}

    @Get('/types')
    async getPlaces(): Promise<PlaceType[]>{
        return await this.placeTypeService.getPlaceTypes();
    }

    @Get('/type/:id')
    async getPlace(@Param('id') id: number): Promise<PlaceType> {
        return await this.placeTypeService.getPlaceTypeById(id);
    }
}