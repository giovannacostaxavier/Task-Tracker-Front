// src/routes/AppLayout.tsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/authStore';

const AppLayout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-bg">
      <nav className="flex items-center justify-between border-b border-hairline bg-surface px-6 py-3">
        <Link
          to="/tasks"
          className="font-display text-sm font-semibold text-ink"
        >
          Task Tracker
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm text-ink-muted hover:text-status-doing"
        >
          Sair
        </button>
      </nav>

      <Outlet />
    </div>
  );
};

export default AppLayout;
