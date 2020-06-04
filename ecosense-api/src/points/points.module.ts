import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointRepository } from './points.repository';
import { PointItemRepository } from './point-item.repository';
import { ItemRepository } from 'src/items/items.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointRepository,
      PointItemRepository,
      ItemRepository,
    ]),
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
