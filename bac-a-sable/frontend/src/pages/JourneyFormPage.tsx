import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlaceSearchInput from '../components/PlaceSearchInput';
import { createJourney, getJourney, updateJourney } from '../api/journeys';
import type { PlaceResult } from '../types';

export default function JourneyFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [placeQuery, setPlaceQuery] = useState('');
  const [destination, setDestination] = useState<PlaceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    getJourney(id)
      .then((journey) => {
        if (cancelled) return;
        setTitle(journey.title);
        setStartDate(journey.startDate);
        setEndDate(journey.endDate);
        setPlaceQuery(journey.destination.name);
        setDestination({
          name: journey.destination.name,
          displayName: journey.destination.name,
          lat: journey.destination.lat,
          lng: journey.destination.lng,
        });
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
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!destination) {
      setError('Veuillez sélectionner une destination dans les suggestions');
      return;
    }
    if (endDate < startDate) {
      setError('La date de fin doit être postérieure à la date de début');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        startDate,
        endDate,
        destination: { name: destination.name, lat: destination.lat, lng: destination.lng },
      };
      if (isEdit && id) {
        await updateJourney(id, payload);
        navigate(`/journeys/${id}`);
      } else {
        const journey = await createJourney(payload);
        navigate(`/journeys/${journey.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="page">
      <h1>{isEdit ? 'Modifier le voyage' : 'Nouveau voyage'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titre
          <input
            type="text"
            data-testid="journey-form-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Date de début
          <input
            type="date"
            data-testid="journey-form-startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Date de fin
          <input
            type="date"
            data-testid="journey-form-endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          Destination
          <PlaceSearchInput
            value={placeQuery}
            onChange={(v) => {
              setPlaceQuery(v);
              setDestination(null);
            }}
            onSelect={(place) => {
              setDestination(place);
              setPlaceQuery(place.displayName);
            }}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" data-testid="journey-form-submit" disabled={submitting}>
          {isEdit ? 'Enregistrer' : 'Créer le voyage'}
        </button>
      </form>
    </div>
  );
}
