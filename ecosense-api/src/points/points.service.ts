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
import { FilterPointDTO } from './dto/filter.dto';
import { ItemRepository } from 'src/items/items.repository';

@Injectable()
export class PointsService {
  private logger = new Logger('PointService');
  constructor(
    @InjectRepository(PointRepository)
    private pointRepository: PointRepository,
    @InjectRepository(PointItemRepository)
    private pointItemRepository: PointItemRepository,
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}

  public async findAll(filterDTO: FilterPointDTO) {
    return this.pointRepository.findAllPoints(filterDTO);
  }

  public async findById(pointId: number): Promise<any> {
    const foundPoint = await this.pointRepository.findOne({
      where: { pointId },
    });
    if (!foundPoint) {
      throw new NotFoundException(`Point id ${pointId} not found`);
    }

    const items = await this.itemRepository
      .createQueryBuilder('item')
      .select(['item.title'])
      .innerJoinAndSelect(
        PointItem,
        'pointItem',
        'item.itemId = pointItem.itemId',
      )
      .where('pointItem.pointId = :id', { id: pointId })
      .getMany();

    return {
      foundPoint,
      items,
    };
  }

  public async createNewPoint(pointDTO: CreatePointDTO) {
    const point = await this.pointRepository.savePoint(pointDTO);
    const pointItems = await Array<PointItem>();
    pointDTO.items.map((id: number) => {
      const pointItem = new PointItem();
      pointItem.pointId = point.pointId;
      pointItem.itemId = id;
    });
    try {
      await this.pointItemRepository.insert(pointItems);
    } catch (error) {
      this.logger.error('Failed insert itemsPoint', error.stack);
      throw new InternalServerErrorException('Failed save Point with item');
    }
  }
}
