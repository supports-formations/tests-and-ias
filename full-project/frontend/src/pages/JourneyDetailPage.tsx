import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getJourney, updateJourney, addJourneyComment } from '../api/journeys';
import type { Journey } from '../types';
import RatingStars from '../components/RatingStars';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import StepCard from '../components/StepCard';
import StepForm from '../components/StepForm';

export default function JourneyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStepForm, setShowStepForm] = useState(false);

  const reload = useCallback((journeyId: string) => {
    getJourney(journeyId)
      .then(setJourney)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'));
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getJourney(id)
      .then(setJourney)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleRate(rating: number) {
    if (!id) return;
    const updated = await updateJourney(id, { rating });
    setJourney(updated);
  }

  async function handleComment(author: string, text: string) {
    if (!id) return;
    const updated = await addJourneyComment(id, author, text);
    setJourney(updated);
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!journey) return <p>Voyage introuvable.</p>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{journey.title}</h1>
          <p>{journey.destination.name}</p>
          <p>
            {journey.startDate} → {journey.endDate}
          </p>
        </div>
        <Link to={`/journeys/${journey.id}/edit`} className="button">
          Modifier
        </Link>
      </div>

      <section>
        <h2>Note</h2>
        <RatingStars rating={journey.rating} onRate={handleRate} />
      </section>

      <section>
        <h2>Commentaires</h2>
        <CommentList comments={journey.comments} />
        <CommentForm onSubmit={handleComment} testIdPrefix="journey-comment" />
      </section>

      <section>
        <div className="page-header">
          <h2>Étapes</h2>
          {!showStepForm && (
            <button data-testid="add-step-button" onClick={() => setShowStepForm(true)}>
              Ajouter une étape
            </button>
          )}
        </div>

        {showStepForm && (
          <StepForm
            journeyId={journey.id}
            onCreated={(journeyId) => {
              reload(journeyId);
              setShowStepForm(false);
            }}
            onCancel={() => setShowStepForm(false)}
          />
        )}

        {journey.steps.length === 0 ? (
          <p>Aucune étape pour le moment.</p>
        ) : (
          <ul className="step-list" data-testid="step-list">
            {journey.steps.map((step) => (
              <StepCard key={step.id} journeyId={journey.id} step={step} onUpdated={reload} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
