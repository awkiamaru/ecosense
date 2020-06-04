import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointRepository } from './points.repository';
import { CreatePointDTO } from './dto/point.dto';
import { PointItemRepository } from './point-item.repository';
import { PointItem } from './point-item.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointRepository)
    private pointRepository: PointRepository,
    @InjectRepository(PointItemRepository)
    private pointItemRepository: PointItemRepository,
  ) {}

  public async createNewPoint(pointDTO: CreatePointDTO) {
    const point = await this.pointRepository.savePoint(pointDTO);
    Logger.log(JSON.stringify(point));
    const pointItems = Array<PointItem>();
    pointDTO.items.map((id: number) => {
      const pointItem = new PointItem();
      pointItem.pointId = point.pointId;
      pointItem.itemId = id;
      pointItems.push(pointItem);
    });
    try {
      Logger.log(JSON.stringify(pointItems));
      await this.pointItemRepository.save(pointItems);
    } catch (error) {
      Logger.error('ERRO', error.stack);
    }
  }
}
