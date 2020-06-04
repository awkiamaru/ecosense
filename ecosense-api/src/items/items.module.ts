import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemService } from './items.service';
import { ItemRepository } from './items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  controllers: [ItemsController],
  providers: [ItemService],
})
export class ItemsModule {}
