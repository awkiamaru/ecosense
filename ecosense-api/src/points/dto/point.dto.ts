import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePointDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  latitude: number;
  @IsNotEmpty()
  longitude: number;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  uf: string;
  @IsNotEmpty()
  @IsString()
  items: string;
}
