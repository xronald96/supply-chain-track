import { AppDataSource } from '../config/database';
import { Item } from '../models/Item';

export class ItemRepository {
	private itemRepository = AppDataSource.getRepository(Item);

	async createItem(name: string, color: string, price: number): Promise<Item> {
		const newItem = new Item();
		newItem.name = name;
		newItem.color = color;
		newItem.price = price;
		return await this.itemRepository.save(newItem);
	}

	async updateItem(id: number, name: string, color: string, price: number): Promise<Item | null> {
		const item = await this.itemRepository.findOneBy({ id });
		if (item) {
			item.name = name;
			item.color = color;
			item.price = price;
			return await this.itemRepository.save(item);
		}
		return null;
	}

	async getItemById(id: number): Promise<Item | null> {
		return await this.itemRepository.findOne({ where: { id } });
	}

	async getItemEvents(id: number): Promise<Item | null> {
		return await this.itemRepository.findOne({
			where: { id },
			relations: ['events'],
		});
	}
}
