import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceType } from '../place-type/place-type.entity';
import { City } from '../city/city.entity';
import { Comment } from '../comment/comment.entity';
import { Rating } from '../rating/rating.entity';
@Entity()
export class Place {
    @PrimaryGeneratedColumn() id: number;
    @ManyToOne(() => PlaceType, (placeType) => placeType.places, { cascade: ['insert', 'update'] })
        placeType: PlaceType;
    @ManyToOne(() => City, (city) => city.places, { cascade: ['insert', 'update'] })
        city: City;
    @Column() name: string;
    @Column({ type: 'nvarchar', length: 'max' }) description: string;
    @Column() address: string;
    @OneToMany(() => Comment, comment => comment.place)
        comments: Comment[];
    @OneToMany(() => Rating, (rating) => rating.place)
        ratings: Rating[];

    constructor(type: PlaceType, city: City, name: string, description: string, address: string) {
        this.placeType = type;
        this.city = city;
        this.name = name;
        this.description = description;
        this.address = address;
    }
}