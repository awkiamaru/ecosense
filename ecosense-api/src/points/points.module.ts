import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointRepository } from './points.repository';
import { PointItemRepository } from './point-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PointRepository, PointItemRepository])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
