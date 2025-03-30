import { Controller, Get } from '@nestjs/common';
import { PlaceTypeService } from './place-type.service';
import { PlaceType } from './place-type.entity';

@Controller('types')
export class PlaceTypesController{
    constructor(private readonly placeTypeService: PlaceTypeService){}
    @Get()
    getPlaces(): Promise<PlaceType[]>{
        return this.placeTypeService.getPlaceTypes();
    }
}