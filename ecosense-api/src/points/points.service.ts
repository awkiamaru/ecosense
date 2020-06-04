import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointRepository } from './points.repository';
import { CreatePointDTO } from './dto/point.dto';
import { PointItemRepository } from './point-item.repository';
import { PointItem } from './point-item.entity';
import { Point } from './points.entity';

@Injectable()
export class PointsService {
  private logger = new Logger('PointService');
  constructor(
    @InjectRepository(PointRepository)
    private pointRepository: PointRepository,
    @InjectRepository(PointItemRepository)
    private pointItemRepository: PointItemRepository,
  ) {}

  public async findById(pointId: number): Promise<Point> {
    const foundPoint = await this.pointRepository.findOne({
      where: { pointId },
    });
    if (!foundPoint) {
      throw new NotFoundException(`Point id ${pointId} not found`);
    }
    return foundPoint;
  }

  public async createNewPoint(pointDTO: CreatePointDTO) {
    const point = await this.pointRepository.savePoint(pointDTO);
    const pointItems = Array<PointItem>();
    pointDTO.items.map((id: number) => {
      const pointItem = new PointItem();
      pointItem.pointId = point.pointId;
      pointItem.itemId = id;
      pointItems.push(pointItem);
    });
    try {
      await this.pointItemRepository.save(pointItems);
    } catch (error) {
      this.logger.error('Failed insert itemsPoint', error.stack);
      throw new InternalServerErrorException('Failed save Point with item');
    }
  }
}
