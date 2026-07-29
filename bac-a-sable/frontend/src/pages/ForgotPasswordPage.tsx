import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await forgotPassword(email.trim());
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la demande');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <h1>Mot de passe oublié</h1>
      {submitted ? (
        <div>
          <p data-testid="forgot-password-dev-notice">
            En mode développement, consultez la console du backend ou le dossier data/mails pour le
            lien de réinitialisation.
          </p>
          <Link to="/login">Retour à la connexion</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              data-testid="forgot-password-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" data-testid="forgot-password-submit" disabled={submitting}>
            Envoyer le lien de réinitialisation
          </button>
        </form>
      )}
    </div>
  );
}
