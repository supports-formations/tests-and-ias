import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { listJourneys, getJourney } from '../api/journeys';
import { getRoute } from '../api/map';
import type { Journey } from '../types';

// Fix default marker icon paths for bundlers
const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const DEFAULT_CENTER: [number, number] = [46.6034, 1.8883]; // France

export default function MapPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>('');
  const [routeCoords, setRouteCoords] = useState<Array<[number, number]> | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listJourneys()
      .then((summaries) => Promise.all(summaries.map((s) => getJourney(s.id))))
      .then((full) => {
        if (!cancelled) setJourneys(full);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur de chargement');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedJourney = journeys.find((j) => j.id === selectedJourneyId) || null;

  async function handleTraceRoute() {
    if (!selectedJourney) return;
    setRouteLoading(true);
    setRouteError(null);
    setRouteCoords(null);
    try {
      const points = selectedJourney.steps.map((s) => ({ lat: s.lat, lng: s.lng }));
      if (points.length < 2) {
        setRouteError("Il faut au moins deux étapes pour tracer un itinéraire.");
        return;
      }
      const result = await getRoute(points);
      setRouteCoords(result.coordinates);
    } catch (err) {
      setRouteError(err instanceof Error ? err.message : "Erreur lors du tracé de l'itinéraire");
    } finally {
      setRouteLoading(false);
    }
  }

  if (loading) return <p>Chargement de la carte...</p>;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <div className="page map-page">
      <div className="page-header">
        <h1>Carte</h1>
        <div className="map-controls">
          <select
            data-testid="map-journey-select"
            value={selectedJourneyId}
            onChange={(e) => {
              setSelectedJourneyId(e.target.value);
              setRouteCoords(null);
              setRouteError(null);
            }}
          >
            <option value="">Sélectionner un voyage...</option>
            {journeys.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
          <button
            data-testid="trace-route-button"
            onClick={handleTraceRoute}
            disabled={!selectedJourney || routeLoading}
          >
            Tracer l'itinéraire
          </button>
        </div>
      </div>
      {routeError && <p className="form-error">{routeError}</p>}

      <MapContainer center={DEFAULT_CENTER} zoom={5} style={{ height: '70vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {journeys.map((journey) => (
          <div key={journey.id}>
            <Marker position={[journey.destination.lat, journey.destination.lng]}>
              <Popup>
                <strong>{journey.title}</strong>
                <br />
                {journey.destination.name}
              </Popup>
            </Marker>
            {journey.steps.map((step) => (
              <Marker key={step.id} position={[step.lat, step.lng]}>
                <Popup>
                  <strong>{step.name}</strong>
                  <br />
                  {step.placeName}
                  <br />
                  {journey.title}
                </Popup>
              </Marker>
            ))}
          </div>
        ))}
        {routeCoords && <Polyline positions={routeCoords} />}
      </MapContainer>
    </div>
  );
}
