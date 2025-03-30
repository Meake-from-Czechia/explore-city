import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CitiesController } from './city.controller';
import { CityService } from './city.service';
import { PlaceService } from '../place/place.service';
import { Place } from '../place/place.entity';
import { PlaceType } from '../place-type/place-type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([City, Place, PlaceType]),
    ],
    controllers: [CitiesController],
    providers: [CityService, PlaceService],
})
export class CityModule {}
