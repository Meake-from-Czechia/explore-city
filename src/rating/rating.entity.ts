import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../place/place.entity';


@Entity()
export class Rating {
    @PrimaryGeneratedColumn() id: number;
    @ManyToOne(() => Place, (place) => place.ratings, { cascade: ['insert', 'update'] })
        place: Place;
    @Column() rating: number;

    constructor(place: Place, rating: number) {
        this.place = place;
        this.rating = rating
    }
}