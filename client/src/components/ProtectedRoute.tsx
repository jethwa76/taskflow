import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
  const location = useLocation()
  const hasSession = localStorage.getItem('taskflow-session') !== 'false'
  return hasSession ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
