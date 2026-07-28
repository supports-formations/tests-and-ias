import { IsString } from 'class-validator';

export class CreateStepCommentDto {
  @IsString()
  author: string;

  @IsString()
  text: string;
}
