import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import JourneysListPage from './pages/JourneysListPage';
import JourneyFormPage from './pages/JourneyFormPage';
import JourneyDetailPage from './pages/JourneyDetailPage';
import MapPage from './pages/MapPage';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/journeys" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/journeys"
            element={
              <ProtectedRoute>
                <JourneysListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journeys/new"
            element={
              <ProtectedRoute>
                <JourneyFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journeys/:id/edit"
            element={
              <ProtectedRoute>
                <JourneyFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journeys/:id"
            element={
              <ProtectedRoute>
                <JourneyDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/journeys" replace />} />
        </Routes>
      </main>
    </div>
  );
}
