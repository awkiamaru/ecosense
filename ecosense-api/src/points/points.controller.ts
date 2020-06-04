import { Controller, Post, Body } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDTO } from './dto/point.dto';

@Controller('points')
export class PointsController {
  constructor(private pointService: PointsService) {}

  @Post()
  public createPoint(@Body() pointDTO: CreatePointDTO) {
    return this.pointService.createNewPoint(pointDTO);
  }
}
