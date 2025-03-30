import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Place } from '../place/place.entity';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn() id: number;
    @ManyToOne(() => Place, (place) => place.comments, { cascade: ['insert', 'update'] })
        place: Place;
    @Column() name: string;
    @Column({ type: 'nvarchar', length: 'max' }) text: string;
    @CreateDateColumn() createDate: Date;
    constructor(name: string, text: string, place: Place) {
        this.name = name;
        this.text = text;
        this.place = place;
    }
}