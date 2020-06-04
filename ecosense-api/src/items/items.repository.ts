import { Repository, EntityRepository } from 'typeorm';
import { Item } from './items.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  public async getAllItems(): Promise<Item[]> {
    const items = await this.find();

    if (!items) {
      throw new NotFoundException('Items is emty');
    }

    return items;
  }
}
