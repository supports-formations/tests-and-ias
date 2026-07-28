import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { DestinationDto } from './destination.dto';

export class CreateJourneyDto {
  @IsString()
  title: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @ValidateNested()
  @Type(() => DestinationDto)
  destination: DestinationDto;
}
