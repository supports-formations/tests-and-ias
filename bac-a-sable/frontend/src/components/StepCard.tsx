import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Step } from '../types';
import { photoUrl, uploadStepPhoto, addStepComment } from '../api/journeys';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

type Props = {
  journeyId: string;
  step: Step;
  onUpdated: (journeyId: string) => void;
};

export default function StepCard({ journeyId, step, onUpdated }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await uploadStepPhoto(journeyId, step.id, file);
      onUpdated(journeyId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi de la photo");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleComment(author: string, text: string) {
    await addStepComment(journeyId, step.id, author, text);
    onUpdated(journeyId);
  }

  return (
    <li className="step-card" data-testid="step-card">
      <h4>{step.name}</h4>
      <p className="step-place">{step.placeName}</p>
      {(step.startDate || step.endDate) && (
        <p className="step-dates">
          {step.startDate || '?'} → {step.endDate || '?'}
        </p>
      )}

      {step.photos.length > 0 && (
        <div className="step-photos">
          {step.photos.map((p) => (
            <img key={p} src={photoUrl(p)} alt={step.name} className="step-photo" />
          ))}
        </div>
      )}

      <div className="step-photo-upload">
        <label>
          Ajouter une photo
          <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploading} />
        </label>
        {uploading && <span>Envoi...</span>}
        {error && <p className="form-error">{error}</p>}
      </div>

      <div className="step-comments">
        <CommentList comments={step.comments} />
        <CommentForm onSubmit={handleComment} testIdPrefix="step-comment" />
      </div>
    </li>
  );
}
