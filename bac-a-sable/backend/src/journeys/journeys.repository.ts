import { Injectable } from '@nestjs/common';
import { MarkdownRepository } from '../storage/markdown-repository';
import { Journey } from './journey.entity';

@Injectable()
export class JourneysRepository {
  private readonly repo = new MarkdownRepository<Journey>('journeys');

  findAll(): Journey[] {
    return this.repo.findAll();
  }

  findById(id: string): Journey | null {
    return this.repo.findById(id);
  }

  save(journey: Journey): Journey {
    return this.repo.save(journey);
  }

  delete(id: string): void {
    this.repo.delete(id);
  }
}
