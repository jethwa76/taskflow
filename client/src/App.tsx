import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AppProvider, useApp } from './context/AppContext'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { LandingPage } from './pages/LandingPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import { TasksPage } from './pages/TasksPage'

function Toast() { const { toast } = useApp(); return toast ? <div className="toast"><span>✦</span>{toast}</div> : null }
function AppRoutes() { return <><Routes><Route path="/" element={<LandingPage />} /><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/register" element={<AuthPage mode="register" />} /><Route element={<ProtectedRoute />}><Route element={<AppShell />}><Route path="/app" element={<Navigate to="/app/dashboard" replace />} /><Route path="/app/dashboard" element={<DashboardPage />} /><Route path="/app/tasks" element={<TasksPage />} /><Route path="/app/profile" element={<ProfilePage />} /><Route path="/app/settings" element={<SettingsPage />} /></Route></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes><Toast /></> }
export default function App() { return <AppProvider><AppRoutes /></AppProvider> }
