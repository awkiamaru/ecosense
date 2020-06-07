import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class CreatePointDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
  @MaxLength(2)
  uf: string;
  @IsNotEmpty()
  @IsString()
  items: string;
}
