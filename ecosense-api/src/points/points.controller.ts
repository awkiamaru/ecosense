import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDTO } from './dto/point.dto';
import { FilterPointDTO } from './dto/filter.dto';

@Controller('points')
export class PointsController {
  constructor(private pointService: PointsService) {}

  @Get('/:id')
  public getPointById(@Param('id') id: number): Promise<any> {
    return this.pointService.findById(id);
  }

  @Get()
  public getAllPoints(@Query() filterDTO: FilterPointDTO) {
    return this.pointService.findAll(filterDTO);
  }

  @Post()
  public async createPoint(@Body() pointDTO: CreatePointDTO) {
    return await this.pointService.createNewPoint(pointDTO);
  }
}
