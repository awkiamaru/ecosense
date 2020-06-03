import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CollectModule } from './collect/collect.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CollectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
