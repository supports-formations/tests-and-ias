import fc from 'fast-check';
import axios from 'axios';
import { MapService } from './map.service';
import { RoutePointDto } from './dto/route.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

/**
 * Feature #16 — Calcul d'itinéraire.
 *
 * The API contract (docs/API-CONTRACT.md line 83) requires OSRM's
 * `lng,lat` coordinate order to be respected when building the proxied
 * request URL. `MapService.getRoute` builds the path with `${p.lat},
 * ${p.lng}` (see the `// BUG:` comment in map.service.ts), swapping the
 * pair.
 *
 * Property: the coordinate path segment sent to OSRM must list, for every
 * point, the longitude before the latitude.
 */
describe('MapService#getRoute — OSRM coordinate order (feature #16)', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: { routes: [{ geometry: { coordinates: [] } }] } });
  });

  it('encodes each point as lng,lat in the OSRM request URL', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            lat: fc.double({ min: -90, max: 90, noNaN: true }),
            lng: fc.double({ min: -180, max: 180, noNaN: true }),
          }),
          { minLength: 2 },
        ),
        async (points: RoutePointDto[]) => {
          mockedAxios.get.mockClear();
          const mapService = new MapService();

          await mapService.getRoute(points);

          const requestedUrl = mockedAxios.get.mock.calls[0][0] as string;
          const expectedPath = points.map((p) => `${p.lng},${p.lat}`).join(';');
          expect(requestedUrl).toContain(expectedPath);
        },
      ),
    );
  });
});
