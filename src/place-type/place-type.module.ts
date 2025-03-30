import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceType } from './place-type.entity';
import { PlaceTypesController } from './place-type.controller';
import { PlaceTypeService } from './place-type.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlaceType]),
    ],
    controllers: [PlaceTypesController],
    providers: [PlaceTypeService],
})
export class PlaceTypeModule {}
