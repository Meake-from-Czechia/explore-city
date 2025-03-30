import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';
import { Place } from '../place/place.entity';
import { PlaceService } from '../place/place.service';
import { PlaceCreateDto } from '../place/place.createDto';

@Controller('cities')
export class CitiesController{
    constructor(private readonly cityService: CityService, private readonly placeService: PlaceService){}
    @Get()
    getCities(): Promise<City[]>{
        return this.cityService.getCities();
    }
    @Get(':id/places')
    getCityPlacesById(@Param('id') id: number): Promise<Place[]>{
        return this.placeService.getPlacesByCityId(id);
    }
    @Post(':id/places')
    createPlaceOnCity(@Body() placeCreateDto: PlaceCreateDto, @Param('id') id: number): Promise<Place> {
        return this.placeService.CreateOnCity(id, placeCreateDto);
    }

}