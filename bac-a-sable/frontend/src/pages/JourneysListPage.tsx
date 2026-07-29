import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listJourneys } from '../api/journeys';
import type { JourneySummary } from '../types';

export default function JourneysListPage() {
  const [journeys, setJourneys] = useState<JourneySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listJourneys()
      .then((data) => {
        if (!cancelled) setJourneys(data);
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

  return (
    <div className="page">
      <div className="page-header">
        <h1>Mes voyages</h1>
        <Link to="/journeys/new" data-testid="create-journey-button" className="button">
          Nouveau voyage
        </Link>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && journeys.length === 0 && <p>Aucun voyage pour le moment.</p>}

      <ul className="journeys-list" data-testid="journeys-list">
        {journeys.map((journey) => (
          <li key={journey.id} className="journey-card" data-testid="journey-card">
            <Link to={`/journeys/${journey.id}`}>
              <h3>{journey.title}</h3>
              <p>{journey.destination.name}</p>
              <p>
                {journey.startDate} → {journey.endDate}
              </p>
              <p>{journey.rating ? `Note : ${journey.rating}/5` : 'Pas encore noté'}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
