import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../city/city.entity';
import { CityModule } from '../city/city.module';
import { PlaceTypeModule } from '../place-type/place-type.module';
import { PlaceModule } from '../place/place.module';
import { PlaceType } from '../place-type/place-type.entity';
import { Place } from '../place/place.entity';
import { Comment } from '../comment/comment.entity';
import { CommentModule } from '../comment/comment.module';
import { Rating } from '../rating/rating.entity';
import { RatingModule } from '../rating/rating.module';

@Module({
    imports: [
        CityModule,
        PlaceTypeModule,
        PlaceModule,
        CommentModule,
        RatingModule,
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: process.env.DATABASE_HOST || 'localhost',
            // @ts-ignore
            port: parseInt(process.env.DATABASE_PORT.toString()) || 1433,
            username: process.env.DATABASE_USER || 'sa',
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME || 'master',
            entities: [City, PlaceType, Place, Comment, Rating],
            synchronize: true,
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        }),
    ],

    controllers: [],
    providers: [],
})
export class AppModule {
}
