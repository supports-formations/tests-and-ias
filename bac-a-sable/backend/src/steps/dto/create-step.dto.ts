import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStepDto {
  @IsString()
  name: string;

  @IsString()
  placeName: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
