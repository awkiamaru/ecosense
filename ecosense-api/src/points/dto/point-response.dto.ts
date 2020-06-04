import { PointItem } from '../point-item.entity';

export class PointDTO {
  pointId: number;

  image: string;

  name: string;

  email: string;

  contact: string;

  latitude: number;

  longitude: number;

  city: string;

  uf: string;

  items: PointItem[];
}
