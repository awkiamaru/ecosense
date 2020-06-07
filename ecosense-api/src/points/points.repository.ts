import { Repository, EntityRepository } from 'typeorm';
import { Point } from './points.entity';
import { CreatePointDTO } from './dto/point.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { FilterPointDTO } from './dto/filter.dto';
import { PointItem } from './point-item.entity';
import { ImageFile } from './dto/image.interface';
@EntityRepository(Point)
export class PointRepository extends Repository<Point> {
  private logger = new Logger('PointRepository');

  public async findAllPoints(filterDTO: FilterPointDTO) {
    const { city, uf, items } = filterDTO;
    const parsedItems = items.split(',').map(item => Number(item.trim()));

    const points = await this.createQueryBuilder('point')
      .innerJoinAndSelect(
        PointItem,
        'pointItem',
        'pointItem.pointId = point.pointId',
      )
      .where('pointItem.itemId IN (:itemId)', { itemId: parsedItems })
      .andWhere('city= :city', { city })
      .andWhere('uf = :uf', { uf })
      .distinct()
      .select('point')
      .getMany();

    return points;
  }

  public async savePoint(pointDTO: CreatePointDTO, file: ImageFile) {
    const point = new Point();
    point.image = file.filename;
    point.name = pointDTO.name;
    point.email = pointDTO.email;
    point.contact = pointDTO.contact;
    point.latitude = pointDTO.latitude;
    point.longitude = pointDTO.longitude;
    point.city = pointDTO.city;
    point.uf = pointDTO.uf;

    try {
      await this.save(point);
    } catch (error) {
      this.logger.error(`Error on save new point`, error.stack);
      throw new InternalServerErrorException();
    }
    return point;
  }
}
