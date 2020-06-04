import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from 'src/items/items.entity';
import { Point } from './points.entity';

@Entity()
export class PointItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  pointItemId: number;

  @PrimaryColumn()
  itemId: number;

  @PrimaryColumn()
  pointId: number;

  @ManyToOne(
    type => Item,
    item => item.pointItem,
    {
      primary: true,
    },
  )
  @JoinColumn({ name: 'pointId' })
  public item: Item;

  @ManyToOne(
    type => Point,
    point => point.pointItem,
    {
      primary: true,
    },
  )
  @JoinColumn({ name: 'itemId' })
  public point: Point;
}
