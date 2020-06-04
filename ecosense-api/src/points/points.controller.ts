import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDTO } from './dto/point.dto';

@Controller('points')
export class PointsController {
  constructor(private pointService: PointsService) {}

  @Get('/:id')
  public getPointById(@Param('id') id: number): Promise<any> {
    return this.pointService.findById(id);
  }

  @Post()
  public createPoint(@Body() pointDTO: CreatePointDTO) {
    return this.pointService.createNewPoint(pointDTO);
  }
}
