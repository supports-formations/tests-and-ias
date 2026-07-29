import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { JourneysRepository } from './journeys.repository';
import { Journey, JourneySummary } from './journey.entity';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class JourneysService {
  constructor(private readonly journeysRepository: JourneysRepository) {}

  findAllForUser(userId: string): JourneySummary[] {
    return this.journeysRepository
      .findAll()
      .filter((j) => j.ownerId === userId)
      .map((j) => ({
        id: j.id,
        title: j.title,
        startDate: j.startDate,
        endDate: j.endDate,
        destination: j.destination,
        rating: j.rating,
        ownerId: j.ownerId,
      }));
  }

  findOne(id: string, userId: string): Journey {
    const journey = this.journeysRepository.findById(id);
    if (!journey) {
      throw new NotFoundException('Journey not found');
    }
    if (journey.ownerId !== userId) {
      throw new ForbiddenException('Not your journey');
    }
    return journey;
  }

  create(dto: CreateJourneyDto, userId: string): Journey {
    // NOTE: date-order validation ("endDate >= startDate") is intentionally
    // MISSING here (bug injected for feature #6 — see docs/API-CONTRACT.md).
    // BUG: no check that endDate >= startDate before saving the journey.
    const journey: Journey = {
      id: uuid(),
      ownerId: userId,
      title: dto.title,
      startDate: dto.startDate,
      endDate: dto.endDate,
      destination: dto.destination,
      rating: null,
      comments: [],
      steps: [],
    };
    return this.journeysRepository.save(journey);
  }

  update(id: string, dto: UpdateJourneyDto, userId: string): Journey {
    const journey = this.findOne(id, userId);

    // Rebuild the journey record field by field from the existing record
    // plus the incoming patch.
    // BUG: `steps` is not carried over from the existing journey, so it is
    // silently reset to an empty array on every PATCH (feature #7).
    const updated: Journey = {
      id: journey.id,
      ownerId: journey.ownerId,
      title: dto.title ?? journey.title,
      startDate: dto.startDate ?? journey.startDate,
      endDate: dto.endDate ?? journey.endDate,
      destination: dto.destination ?? journey.destination,
      rating: dto.rating ?? journey.rating,
      comments: journey.comments,
      steps: [],
    };

    return this.journeysRepository.save(updated);
  }

  addComment(id: string, dto: CreateCommentDto, userId: string): Journey {
    const journey = this.findOne(id, userId);
    journey.comments.push({
      id: uuid(),
      author: dto.author,
      text: dto.text,
      createdAt: new Date().toISOString(),
    });
    return this.journeysRepository.save(journey);
  }
}
