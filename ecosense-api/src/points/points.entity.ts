import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Item } from 'src/items/items.entity';
import { PointItem } from './point-item.entity';

@Entity()
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
    type => PointItem,
    pointItem => pointItem.point,
  )
  public pointItem: PointItem[];
}
