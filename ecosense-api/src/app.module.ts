import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ItemsModule } from './items/items.module';
import { PointsModule } from './points/points.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ItemsModule, PointsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
