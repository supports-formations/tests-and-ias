import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DestinationDto } from './destination.dto';

// Steps are managed via their own dedicated endpoints, not through this DTO.
export class UpdateJourneyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DestinationDto)
  destination?: DestinationDto;

  @IsOptional()
  @IsNumber()
  rating?: number;
}
