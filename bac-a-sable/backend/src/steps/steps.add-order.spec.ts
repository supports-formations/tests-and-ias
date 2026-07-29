import { StepsService } from './steps.service';
import { JourneysRepository } from '../journeys/journeys.repository';
import { Journey } from '../journeys/journey.entity';

/**
 * Feature #8 — Ajout d'une étape.
 *
 * The API contract requires new steps to be appended at the END of
 * `steps[]` (insertion order preserved). `StepsService.addStep` currently
 * uses `array.unshift(...)` instead of `array.push(...)` (see the
 * `// BUG:` comment in steps.service.ts), which reverses the order. This
 * test is EXPECTED TO FAIL (red) until that bug is fixed. Do not weaken
 * this assertion and do not fix the bug here.
 */
describe('StepsService#addStep — insertion order (feature #8)', () => {
  it('keeps steps in the order they were added', () => {
    const journey: Journey = {
      id: 'journey-1',
      ownerId: 'user-1',
      title: 'Road trip',
      startDate: '2026-08-01',
      endDate: '2026-08-10',
      destination: { name: 'Lyon', lat: 45.764, lng: 4.8357 },
      rating: null,
      comments: [],
      steps: [],
    };

    const journeysRepository = {
      findById: jest.fn().mockReturnValue(journey),
      save: jest.fn((j: Journey) => j),
    } as unknown as JourneysRepository;

    const stepsService = new StepsService(journeysRepository);

    stepsService.addStep(
      'journey-1',
      { name: 'First stop', placeName: 'Lyon centre', lat: 45.76, lng: 4.83 },
      'user-1',
    );
    const updated = stepsService.addStep(
      'journey-1',
      { name: 'Second stop', placeName: 'Annecy', lat: 45.9, lng: 6.12 },
      'user-1',
    );

    expect(updated.steps).toHaveLength(2);
    expect(updated.steps[0].name).toBe('First stop');
    expect(updated.steps[1].name).toBe('Second stop');
  });
});
