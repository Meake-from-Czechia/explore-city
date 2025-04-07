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
}