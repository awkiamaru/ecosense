import { Controller, Get } from '@nestjs/common';
import { ItemService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemService) {}

  @Get()
  public getAllItems() {
    return this.itemService.getAllItems();
  }
}
