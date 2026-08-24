import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import PrivateRoute from './PrivateRoute';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/tasks" element={<div>Tasks (em construção)</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
