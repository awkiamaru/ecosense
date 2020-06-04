import { Item } from 'src/items/items.entity';

export class CreatePointDTO {
  pointId: number;

  image: string;

  name: string;

  email: string;

  contact: string;

  latitude: number;

  longitude: number;

  city: string;

  uf: string;

  items: number[];
}
