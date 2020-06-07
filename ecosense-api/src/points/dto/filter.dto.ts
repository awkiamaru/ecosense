import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class FilterPointDTO {
  @IsNotEmpty({ message: 'Type the city' })
  @IsString()
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'Type the UF' })
  uf: string;

  @IsString()
  items: string;
}
