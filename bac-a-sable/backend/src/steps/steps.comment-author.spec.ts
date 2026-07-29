import fc from 'fast-check';
import { StepsService } from './steps.service';
import { JourneysRepository } from '../journeys/journeys.repository';
import { Journey } from '../journeys/journey.entity';

/**
 * Feature #14 — Commentaire sur une étape.
 *
 * The API contract (docs/API-CONTRACT.md line 69) requires the created
 * comment's `authorId` to be the authenticated caller's id. `StepsService
 * .addComment` hard-codes `authorId: null` (see the `// BUG:` comment in
 * steps.service.ts) instead of using the `userId` argument.
 *
 * Property: for any authenticated user and any comment payload, the
 * `authorId` on the newly created comment must equal that user's id.
 */
describe('StepsService#addComment — author identity (feature #14)', () => {
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
        name: 'Stop',
        placeName: 'Lyon centre',
        lat: 45.76,
        lng: 4.83,
        startDate: null,
        endDate: null,
        photos: [],
        comments: [],
      },
    ],
  });

  it("stamps the comment's authorId with the caller's userId", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.record({ author: fc.string(), text: fc.string() }),
        (userId, dto) => {
          const journey = buildJourney();
          journey.ownerId = userId;
          const journeysRepository = {
            findById: jest.fn().mockReturnValue(journey),
            save: jest.fn((j: Journey) => j),
          } as unknown as JourneysRepository;
          const stepsService = new StepsService(journeysRepository);

          const updated = stepsService.addComment(
            'journey-1',
            'step-1',
            dto,
            userId,
          );

          const comment = updated.steps[0].comments.at(-1);
          expect(comment?.authorId).toBe(userId);
        },
      ),
    );
  });
});
