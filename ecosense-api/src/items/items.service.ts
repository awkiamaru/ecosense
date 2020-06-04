import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './items.repository';
import { Item } from './items.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}

  public async getAllItems(): Promise<Item[]> {
    return this.itemRepository.getAllItems();
  }
}
