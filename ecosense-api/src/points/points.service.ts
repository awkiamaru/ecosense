import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointRepository } from './points.repository';
import { CreatePointDTO } from './dto/point.dto';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointRepository)
    private pointRepository: PointRepository,
  ) {}

  public async createNewPoint(pointDTO: CreatePointDTO) {
    this.pointRepository.savePoint(pointDTO);
  }
}
