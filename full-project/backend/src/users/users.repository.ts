import { Injectable } from '@nestjs/common';
import { MarkdownRepository } from '../storage/markdown-repository';
import { UserRecord } from './user.entity';

@Injectable()
export class UsersRepository {
  private readonly repo = new MarkdownRepository<UserRecord>('users');

  findAll(): UserRecord[] {
    return this.repo.findAll();
  }

  findById(id: string): UserRecord | null {
    return this.repo.findById(id);
  }

  findByEmail(email: string): UserRecord | null {
    return (
      this.repo
        .findAll()
        .find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
    );
  }

  save(user: UserRecord): UserRecord {
    return this.repo.save(user);
  }
}
