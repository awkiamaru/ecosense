import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointRepository } from './points.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PointRepository])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
