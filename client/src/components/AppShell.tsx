import { Bell, ChevronDown, Command, LayoutDashboard, ListTodo, LogOut, Menu, Moon, Plus, Settings, Sun, UserRound, X } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navigation = [{ to: '/app/dashboard', label: 'Overview', icon: LayoutDashboard }, { to: '/app/tasks', label: 'My tasks', icon: ListTodo }, { to: '/app/profile', label: 'Profile', icon: UserRound }, { to: '/app/settings', label: 'Settings', icon: Settings }]

export function AppShell() {
  const { user, tasks, theme, isSidebarOpen, setSidebarOpen, toggleTheme, showToast } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const pageTitle = location.pathname.includes('tasks') ? 'My tasks' : location.pathname.includes('profile') ? 'Profile' : location.pathname.includes('settings') ? 'Settings' : 'Overview'
  return <div className="app-shell">
    <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><Command size={18} strokeWidth={2.5} /></div><span>taskflow</span>{isSidebarOpen && <button className="mobile-close" onClick={() => setSidebarOpen(false)}><X size={18} /></button>}</div>
      <div className="workspace-switcher"><div className="workspace-icon">A</div><div><strong>Acme Studio</strong><span>Personal workspace</span></div><ChevronDown size={15} /></div>
      <div className="sidebar-section-label">Workspace</div>
      <nav>{navigation.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}><Icon size={18} /><span>{label}</span>{label === 'My tasks' && <span className="nav-count">{tasks.filter((task) => task.status !== 'Completed').length}</span>}</NavLink>)}</nav>
      <div className="sidebar-spacer" />
      <div className="focus-card"><div className="focus-spark">✦</div><strong>Keep your focus</strong><p>Small steps compound into big wins.</p><button onClick={() => showToast('You are doing great work')}>View note <span>→</span></button></div>
      <div className="sidebar-footer"><button className="profile-mini" onClick={() => navigate('/app/profile')}><span className="avatar avatar-small">{user.initials}</span><span><strong>{user.name}</strong><small>{user.role}</small></span><MoreDots /></button></div>
    </aside>
    <main className="main-content"><header className="topbar"><button className="mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button><div className="topbar-title"><span className="breadcrumb">Workspace <span>/</span></span><strong>{pageTitle}</strong></div><div className="topbar-actions"><button className="icon-button search-icon" aria-label="Search" onClick={() => navigate('/app/tasks')}><span className="search-key">⌘ K</span></button><button className="icon-button" aria-label="Toggle theme" onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button><button className="icon-button notification-button" aria-label="Notifications" onClick={() => showToast('You are all caught up')}><Bell size={18} /><span /></button><span className="topbar-divider" /><span className="avatar">{user.initials}</span></div></header><div className="page-content"><Outlet /></div></main>
  </div>
}

function MoreDots() { return <span className="more-dots"><span /><span /><span /></span> }
