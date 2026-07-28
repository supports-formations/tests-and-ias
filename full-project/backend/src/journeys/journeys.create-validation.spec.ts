import { BadRequestException } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysRepository } from './journeys.repository';

/**
 * Feature #6 — Création d'une journey.
 *
 * The API contract (docs/API-CONTRACT.md) requires a 400 response when
 * `endDate < startDate`. The current implementation of
 * `JourneysService.create` does NOT perform this validation (see the
 * `// BUG:` comment in journeys.service.ts), so this test is EXPECTED TO
 * FAIL (red) until that bug is fixed. Do not weaken this assertion and do
 * not fix the bug here — this is intentional, documented red test.
 */
describe('JourneysService#create — date range validation (feature #6)', () => {
  it('rejects a journey whose endDate is before its startDate', () => {
    const journeysRepository = {
      save: jest.fn((journey) => journey),
    } as unknown as JourneysRepository;

    const journeysService = new JourneysService(journeysRepository);

    const createInvalidJourney = () =>
      journeysService.create(
        {
          title: 'Invalid trip',
          startDate: '2026-08-10',
          endDate: '2026-08-01', // before startDate
          destination: { name: 'Paris', lat: 48.8566, lng: 2.3522 },
        },
        'user-1',
      );

    expect(createInvalidJourney).toThrow(BadRequestException);
    expect(journeysRepository.save).not.toHaveBeenCalled();
  });
});
