import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { JourneysRepository } from '../journeys/journeys.repository';
import { Journey } from '../journeys/journey.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { CreateStepCommentDto } from './dto/create-step-comment.dto';

@Injectable()
export class StepsService {
  constructor(private readonly journeysRepository: JourneysRepository) {}

  private getOwnedJourney(journeyId: string, userId: string): Journey {
    const journey = this.journeysRepository.findById(journeyId);
    if (!journey) {
      throw new NotFoundException('Journey not found');
    }
    if (journey.ownerId !== userId) {
      throw new ForbiddenException('Not your journey');
    }
    return journey;
  }

  addStep(journeyId: string, dto: CreateStepDto, userId: string): Journey {
    const journey = this.getOwnedJourney(journeyId, userId);
    const step = {
      id: uuid(),
      name: dto.name,
      placeName: dto.placeName,
      lat: dto.lat,
      lng: dto.lng,
      startDate: dto.startDate ?? null,
      endDate: dto.endDate ?? null,
      photos: [],
      comments: [],
    };
    // BUG: uses unshift instead of push, so steps end up in reverse order
    // of insertion instead of appended at the end (feature #8).
    journey.steps.unshift(step);
    return this.journeysRepository.save(journey);
  }

  updateStep(
    journeyId: string,
    stepId: string,
    dto: UpdateStepDto,
    userId: string,
  ): Journey {
    const journey = this.getOwnedJourney(journeyId, userId);
    const step = journey.steps.find((s) => s.id === stepId);
    if (!step) {
      throw new NotFoundException('Step not found');
    }

    // BUG: `endDate` is missing from this destructure, so it is silently
    // never updated regardless of what the client sends (feature #9).
    const { name, placeName, lat, lng, startDate } = dto;

    if (name !== undefined) step.name = name;
    if (placeName !== undefined) step.placeName = placeName;
    if (lat !== undefined) step.lat = lat;
    if (lng !== undefined) step.lng = lng;
    if (startDate !== undefined) step.startDate = startDate;

    return this.journeysRepository.save(journey);
  }

  addPhoto(
    journeyId: string,
    stepId: string,
    photoPath: string,
    userId: string,
  ): Journey {
    const journey = this.getOwnedJourney(journeyId, userId);
    const step = journey.steps.find((s) => s.id === stepId);
    if (!step) {
      throw new NotFoundException('Step not found');
    }
    step.photos.push(photoPath);
    return this.journeysRepository.save(journey);
  }

  addComment(
    journeyId: string,
    stepId: string,
    dto: CreateStepCommentDto,
    userId: string,
  ): Journey {
    const journey = this.getOwnedJourney(journeyId, userId);
    const step = journey.steps.find((s) => s.id === stepId);
    if (!step) {
      throw new NotFoundException('Step not found');
    }
    // BUG: `authorId` should be the authenticated user's id (`userId`) but
    // is hard-coded to null here, so comments never carry a real author
    // reference (feature #14).
    step.comments.push({
      id: uuid(),
      author: dto.author,
      authorId: null,
      text: dto.text,
      createdAt: new Date().toISOString(),
    });
    return this.journeysRepository.save(journey);
  }
}
