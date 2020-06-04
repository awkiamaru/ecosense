import { Repository, EntityRepository } from 'typeorm';
import { Point } from './points.entity';
import { CreatePointDTO } from './dto/point.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { Item } from 'src/items/items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PointItemRepository } from './point-item.repository';
@EntityRepository(Point)
export class PointRepository extends Repository<Point> {
  private logger = new Logger('PointRepository');

  public async savePoint(pointDTO: CreatePointDTO) {
    this.logger.log(`Recebendo objeto: ${JSON.stringify(pointDTO)}`);
    const point = new Point();
    point.image = 'image-fake';
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
