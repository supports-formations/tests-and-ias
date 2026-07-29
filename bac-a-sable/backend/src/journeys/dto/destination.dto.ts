import { IsNumber, IsString } from 'class-validator';

export class DestinationDto {
  @IsString()
  name: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
