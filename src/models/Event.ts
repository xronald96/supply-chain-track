import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Item } from './Item';

@Entity()
export class Event {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Item)
	item: Item;

	@Column()
	description: string;
    
	@Column()
	location: string;

	@Column()
	custodian: string;

	@CreateDateColumn()
	timestamp: Date;
}
