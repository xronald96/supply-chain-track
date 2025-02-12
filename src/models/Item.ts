import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './Event';

@Entity()
export class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	color: string;

	@Column('decimal')
	price: number;

	@OneToMany(() => Event, (event) => event.item)
	events: Event[];
}
