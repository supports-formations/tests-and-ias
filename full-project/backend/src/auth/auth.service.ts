import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { UsersRepository } from '../users/users.repository';
import { toPublicUser } from '../users/user.entity';
import { DATA_DIR } from '../storage/markdown-repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = this.usersRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.save({
      id: uuid(),
      email: dto.email,
      name: dto.name,
      passwordHash,
      createdAt: new Date().toISOString(),
    });
    return toPublicUser(user);
  }

  async login(dto: LoginDto) {
    const user = this.usersRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const matches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { accessToken, user: toPublicUser(user) };
  }

  async forgotPassword(email: string) {
    const user = this.usersRepository.findByEmail(email);
    if (user) {
      const token = uuid();
      user.resetToken = token;
      user.resetTokenExpiresAt = new Date(
        Date.now() + RESET_TOKEN_TTL_MS,
      ).toISOString();
      this.usersRepository.save(user);

      const resetLink = `http://localhost:5173/reset-password?token=${token}`;
      const mailsDir = path.join(DATA_DIR, 'mails');
      if (!fs.existsSync(mailsDir)) {
        fs.mkdirSync(mailsDir, { recursive: true });
      }
      const fileName = `${Date.now()}-${email}.md`;
      const filePath = path.join(mailsDir, fileName.replace(/[^a-zA-Z0-9.@_-]/g, '_'));
      fs.writeFileSync(
        filePath,
        `---\nto: ${email}\nsubject: Reset your password\n---\n\nReset your password: ${resetLink}\n`,
        'utf-8',
      );
      // eslint-disable-next-line no-console
      console.log(`[forgot-password] reset link for ${email}: ${resetLink}`);
    }
    return { message: 'ok' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = this.usersRepository
      .findAll()
      .find((u) => u.resetToken === token);

    if (
      !user ||
      !user.resetTokenExpiresAt ||
      new Date(user.resetTokenExpiresAt).getTime() < Date.now()
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
    this.usersRepository.save(user);

    return { message: 'ok' };
  }
}
