import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la réinitialisation');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <h1>Réinitialiser le mot de passe</h1>
      {!token && <p className="form-error">Jeton manquant dans l'URL.</p>}
      {success ? (
        <p data-testid="reset-password-success">
          Mot de passe réinitialisé. Redirection vers la connexion...
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Nouveau mot de passe
            <input
              type="password"
              data-testid="reset-password-new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" data-testid="reset-password-submit" disabled={submitting || !token}>
            Réinitialiser
          </button>
        </form>
      )}
      <p>
        <Link to="/login">Retour à la connexion</Link>
      </p>
    </div>
  );
}
