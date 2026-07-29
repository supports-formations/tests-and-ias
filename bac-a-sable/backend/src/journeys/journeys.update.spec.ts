import { JourneysService } from './journeys.service';
import { JourneysRepository } from './journeys.repository';
import { Journey } from './journey.entity';

/**
 * Feature #7 — Modification d'une journey.
 *
 * INTENTIONALLY FLAWED TEST — do not "fix" this file and do not add a
 * second, correct test next to it. This is the pedagogical trap for
 * feature #7: `JourneysService.update` has a real bug (it drops `steps[]`
 * on every PATCH — see the `// BUG:` comment in journeys.service.ts), but
 * this test over-mocks the repository's `save()` so heavily that it
 * fabricates the expected `steps` in the mock itself, instead of asserting
 * on what the service actually computed. As a result the test passes
 * (green) even though the real bug is present — a classic "false sense of
 * security" test that trainees should learn to spot and rewrite.
 */
describe('JourneysService#update (feature #7)', () => {
  it('appears to keep steps after a PATCH', () => {
    const existingSteps = [
      {
        id: 'step-1',
        name: 'Eiffel Tower',
        placeName: 'Eiffel Tower',
        lat: 48.8584,
        lng: 2.2945,
        startDate: null,
        endDate: null,
        photos: [],
        comments: [],
      },
    ];

    const existingJourney: Journey = {
      id: 'journey-1',
      ownerId: 'user-1',
      title: 'Paris trip',
      startDate: '2026-08-01',
      endDate: '2026-08-10',
      destination: { name: 'Paris', lat: 48.8566, lng: 2.3522 },
      rating: null,
      comments: [],
      steps: existingSteps,
    };

    const journeysRepository = {
      findById: jest.fn().mockReturnValue(existingJourney),
      // NOTE (the mistake): instead of asserting on what the service
      // actually passes to save(), the mock re-injects the original steps
      // into whatever it's given — so the returned value always "has" the
      // steps, regardless of what update() really computed.
      save: jest.fn((journeyToSave: Journey) => ({
        ...journeyToSave,
        steps: existingSteps,
      })),
    } as unknown as JourneysRepository;

    const journeysService = new JourneysService(journeysRepository);

    const result = journeysService.update(
      'journey-1',
      { title: 'Paris trip (updated)' },
      'user-1',
    );

    expect(result.title).toBe('Paris trip (updated)');
    expect(result.steps).toEqual(existingSteps);
  });
});
