import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../place/place.entity';

@Entity()
export class City {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @OneToMany(() => Place, place => place.city, { cascade: true })
        places: Place[];

    constructor(name: string) {
        this.name = name;
    }
}