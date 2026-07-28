import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('journeys')
@UseGuards(JwtAuthGuard)
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.journeysService.findAllForUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.journeysService.findOne(id, user.id);
  }

  @Post()
  create(
    @Body() dto: CreateJourneyDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.journeysService.create(dto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJourneyDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.journeysService.update(id, dto, user.id);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.journeysService.addComment(id, dto, user.id);
  }
}
