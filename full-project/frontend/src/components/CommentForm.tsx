import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  onSubmit: (author: string, text: string) => Promise<void> | void;
  testIdPrefix?: string;
};

export default function CommentForm({ onSubmit, testIdPrefix = 'comment' }: Props) {
  const { user } = useAuth();
  const [author, setAuthor] = useState(user?.name || '');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(author.trim() || user?.name || 'Anonyme', text.trim());
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi du commentaire');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        data-testid={`${testIdPrefix}-author`}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Votre nom"
      />
      <textarea
        data-testid={`${testIdPrefix}-text`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter un commentaire..."
        rows={2}
        required
      />
      {error && <p className="form-error">{error}</p>}
      <button type="submit" data-testid={`${testIdPrefix}-submit`} disabled={submitting}>
        Envoyer
      </button>
    </form>
  );
}
