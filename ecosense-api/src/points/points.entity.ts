import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PointItem } from './point-item.entity';

@Entity({
  engine: 'InnoDB',
})
export class Point extends BaseEntity {
  @PrimaryGeneratedColumn()
  pointId: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  city: string;

  @Column()
  uf: string;

  @OneToMany(
    () => PointItem,
    pointItem => pointItem.point,
  )
  public pointItem: Promise<PointItem[]>;
}
