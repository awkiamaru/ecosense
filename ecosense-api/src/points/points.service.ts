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
import { ImageFile } from './dto/image.interface';

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
    const points = await this.pointRepository.findAllPoints(filterDTO);

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image: `http://192.168.15.16:3333/uploads/${point.image}`,
      };
    });
    return serializedPoints;
  }

  public async findById(pointId: number): Promise<any> {
    const foundPoint = await this.pointRepository.findOne({
      where: { pointId },
    });
    if (!foundPoint) {
      throw new NotFoundException(`Point id ${pointId} not found`);
    }

    const serializedPoints = {
      ...foundPoint,
      image: `http://192.168.15.16:3333/uploads/${foundPoint.image}`,
    };

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
      serializedPoints,
      items,
    };
  }

  public async createNewPoint(pointDTO: CreatePointDTO, file: ImageFile) {
    const point = await this.pointRepository.savePoint(pointDTO, file);

    const pointItems = await Array<PointItem>();
    pointDTO.items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((id: number) => {
        const pointItem = new PointItem();
        pointItem.pointId = point.pointId;
        pointItem.itemId = id;
        pointItems.push(pointItem);
      });
    try {
      await this.pointItemRepository.insert(pointItems);
    } catch (error) {
      this.logger.error('Failed insert itemsPoint', error.stack);
      throw new InternalServerErrorException('Failed save Point with item');
    }
  }
}
