import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { UserRecord } from '../users/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: jest.Mocked<UsersRepository>;
  let jwtService: jest.Mocked<JwtService>;

  const buildUser = (overrides: Partial<UserRecord> = {}): UserRecord => ({
    id: 'user-1',
    email: 'alice@example.com',
    name: 'Alice',
    passwordHash: 'hashed',
    createdAt: new Date().toISOString(),
    ...overrides,
  });

  beforeEach(() => {
    usersRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    jwtService = {
      signAsync: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    authService = new AuthService(usersRepository, jwtService);
  });

  describe('register', () => {
    it('creates a new user and returns the public user shape (feature #1, success case)', async () => {
      usersRepository.findByEmail.mockReturnValue(null);
      usersRepository.save.mockImplementation((user) => user);

      const result = await authService.register({
        email: 'bob@example.com',
        password: 'secret123',
        name: 'Bob',
      });

      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      const savedUser = usersRepository.save.mock.calls[0][0];
      expect(savedUser.email).toBe('bob@example.com');
      expect(savedUser.name).toBe('Bob');
      // Password must be hashed, never stored in clear.
      expect(savedUser.passwordHash).not.toBe('secret123');
      expect(await bcrypt.compare('secret123', savedUser.passwordHash)).toBe(true);

      // The response must never leak the password hash.
      expect(result).toEqual({
        id: savedUser.id,
        email: 'bob@example.com',
        name: 'Bob',
      });
    });

    it('rejects registration with a 409 when the email is already taken (feature #1, duplicate case)', async () => {
      usersRepository.findByEmail.mockReturnValue(buildUser());

      await expect(
        authService.register({
          email: 'alice@example.com',
          password: 'secret123',
          name: 'Alice Duplicate',
        }),
      ).rejects.toBeInstanceOf(ConflictException);

      expect(usersRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('returns an access token and the public user on valid credentials (feature #2, success case)', async () => {
      const passwordHash = await bcrypt.hash('correct-password', 10);
      usersRepository.findByEmail.mockReturnValue(
        buildUser({ passwordHash }),
      );
      jwtService.signAsync.mockResolvedValue('signed.jwt.token');

      const result = await authService.login({
        email: 'alice@example.com',
        password: 'correct-password',
      });

      expect(result.accessToken).toBe('signed.jwt.token');
      expect(result.user).toEqual({
        id: 'user-1',
        email: 'alice@example.com',
        name: 'Alice',
      });
    });

    it('rejects login with a 401 when the password is wrong (feature #2, wrong-password case)', async () => {
      const passwordHash = await bcrypt.hash('correct-password', 10);
      usersRepository.findByEmail.mockReturnValue(
        buildUser({ passwordHash }),
      );

      await expect(
        authService.login({
          email: 'alice@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});
