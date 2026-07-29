import fc from 'fast-check';
import { StepsService } from './steps.service';
import { JourneysRepository } from '../journeys/journeys.repository';
import { Journey } from '../journeys/journey.entity';

/**
 * Feature #9 — Mise à jour d'une étape.
 *
 * The API contract (docs/API-CONTRACT.md line 60) requires that any field
 * sent in the PATCH body be reflected on the updated step, including
 * `endDate`. `StepsService.updateStep` destructures the incoming DTO
 * without `endDate` (see the `// BUG:` comment in steps.service.ts), so
 * `endDate` is silently never updated regardless of what the client sends.
 *
 * Property: for every field the client explicitly sets on the DTO, the
 * resulting step must carry that exact value.
 */
describe('StepsService#updateStep — field round-trip (feature #9)', () => {
  const buildJourney = (): Journey => ({
    id: 'journey-1',
    ownerId: 'user-1',
    title: 'Road trip',
    startDate: '2026-08-01',
    endDate: '2026-08-10',
    destination: { name: 'Lyon', lat: 45.764, lng: 4.8357 },
    rating: null,
    comments: [],
    steps: [
      {
        id: 'step-1',
        name: 'ORIGINAL_NAME',
        placeName: 'ORIGINAL_PLACE',
        lat: 0,
        lng: 0,
        startDate: 'ORIGINAL_START',
        endDate: 'ORIGINAL_END',
        photos: [],
        comments: [],
      },
    ],
  });

  const dtoArb = fc.record(
    {
      name: fc.string(),
      placeName: fc.string(),
      lat: fc.double({ noNaN: true, noDefaultInfinity: true }),
      lng: fc.double({ noNaN: true, noDefaultInfinity: true }),
      startDate: fc.string(),
      endDate: fc.string(),
    },
    { requiredKeys: [] },
  );

  it('applies every field present in the patch DTO to the step', () => {
    fc.assert(
      fc.property(dtoArb, (dto) => {
        const journey = buildJourney();
        const journeysRepository = {
          findById: jest.fn().mockReturnValue(journey),
          save: jest.fn((j: Journey) => j),
        } as unknown as JourneysRepository;
        const stepsService = new StepsService(journeysRepository);

        const updated = stepsService.updateStep(
          'journey-1',
          'step-1',
          dto,
          'user-1',
        );
        const step = updated.steps[0];

        for (const [key, value] of Object.entries(dto)) {
          if (value !== undefined) {
            expect((step as any)[key]).toBe(value);
          }
        }
      }),
    );
  });
});
