import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  image: string;

  @Column()
  title: string;
}
