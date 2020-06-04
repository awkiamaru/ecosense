import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { PointItem } from 'src/points/point-item.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @OneToMany(
    () => PointItem,
    pointItem => pointItem.item,
  )
  public pointItem: PointItem[];
}
