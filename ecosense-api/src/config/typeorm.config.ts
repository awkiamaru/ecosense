import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'luis',
  password: 'coxinha',
  database: 'ecosense_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
