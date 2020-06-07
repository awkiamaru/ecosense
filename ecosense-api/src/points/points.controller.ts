import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PointsService } from './points.service';
import { CreatePointDTO } from './dto/point.dto';
import { FilterPointDTO } from './dto/filter.dto';
import { diskStorage } from 'multer';
import * as ImageName from '../config/multer.config';
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: ImageName.fileEditName,
      }),
      fileFilter: ImageName.imageFileFilter,
    }),
  )
  public async createPoint(
    @UploadedFile() file,
    @Body() pointDTO: CreatePointDTO,
  ) {
    return await this.pointService.createNewPoint(pointDTO);
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: ImageName.fileEditName,
      }),
      fileFilter: ImageName.imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
}
