import { useState } from 'react';
import type { FormEvent } from 'react';
import PlaceSearchInput from './PlaceSearchInput';
import { addStep } from '../api/journeys';
import type { PlaceResult } from '../types';

type Props = {
  journeyId: string;
  onCreated: (journeyId: string) => void;
  onCancel: () => void;
};

export default function StepForm({ journeyId, onCreated, onCancel }: Props) {
  const [name, setName] = useState('');
  const [placeQuery, setPlaceQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Le nom de l\'étape est requis');
      return;
    }
    if (!selectedPlace) {
      setError('Veuillez sélectionner un lieu dans les suggestions');
      return;
    }
    setSubmitting(true);
    try {
      await addStep(journeyId, {
        name: name.trim(),
        placeName: selectedPlace.name,
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      onCreated(journeyId);
      setName('');
      setPlaceQuery('');
      setSelectedPlace(null);
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'ajout de l'étape");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="step-form" onSubmit={handleSubmit}>
      <h4>Nouvelle étape</h4>
      <label>
        Nom
        <input
          type="text"
          data-testid="step-form-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Lieu
        <PlaceSearchInput
          value={placeQuery}
          onChange={(v) => {
            setPlaceQuery(v);
            setSelectedPlace(null);
          }}
          onSelect={(place) => {
            setSelectedPlace(place);
            setPlaceQuery(place.displayName);
          }}
        />
      </label>
      <label>
        Date de début (optionnel)
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        Date de fin (optionnel)
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      {error && <p className="form-error">{error}</p>}
      <div className="step-form-actions">
        <button type="submit" data-testid="step-form-submit" disabled={submitting}>
          Ajouter l'étape
        </button>
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}
