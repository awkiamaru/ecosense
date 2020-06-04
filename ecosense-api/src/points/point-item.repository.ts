import { Repository, EntityRepository } from 'typeorm';
import { PointItem } from './point-item.entity';

@EntityRepository(PointItem)
export class PointItemRepository extends Repository<PointItem> {}
