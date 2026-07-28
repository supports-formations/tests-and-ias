import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { UPLOADS_DIR } from '../storage/markdown-repository';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { CreateStepCommentDto } from './dto/create-step-comment.dto';

@Controller('journeys/:journeyId/steps')
@UseGuards(JwtAuthGuard)
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  addStep(
    @Param('journeyId') journeyId: string,
    @Body() dto: CreateStepDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.stepsService.addStep(journeyId, dto, user.id);
  }

  @Patch(':stepId')
  updateStep(
    @Param('journeyId') journeyId: string,
    @Param('stepId') stepId: string,
    @Body() dto: UpdateStepDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.stepsService.updateStep(journeyId, stepId, dto, user.id);
  }

  @Post(':stepId/photos')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        filename: (_req, file, cb) => {
          const unique = uuid();
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  addPhoto(
    @Param('journeyId') journeyId: string,
    @Param('stepId') stepId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: { id: string },
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const relativePath = `/uploads/${file.filename}`;
    return this.stepsService.addPhoto(journeyId, stepId, relativePath, user.id);
  }

  @Post(':stepId/comments')
  addComment(
    @Param('journeyId') journeyId: string,
    @Param('stepId') stepId: string,
    @Body() dto: CreateStepCommentDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.stepsService.addComment(journeyId, stepId, dto, user.id);
  }
}
