import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Item } from 'src/items/items.entity';

@Entity()
export class Points extends BaseEntity {
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
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToMany(type => Item)
  @JoinTable()
  items: Item[];
}
