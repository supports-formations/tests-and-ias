import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Carnet de voyage</div>
      <div className="navbar-links">
        <Link to="/journeys">Voyages</Link>
        <Link to="/map">Carte</Link>
        {user && <span className="navbar-user">{user.name}</span>}
        <button data-testid="logout-button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
