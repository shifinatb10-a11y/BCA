import { Icon } from '../common/Icon'
import { navItems } from '../../data/navItems'

export function Header({
  setMenuOpen,
  activePage,
  session,
  setAdminOpen,
  signOut,
  setLoginOpen,
}) {
  return (
    <header className="topbar">
      <button className="icon-button menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
      <div className="breadcrumb">
        <span>PSMO College</span><i>/</i>
        <strong>{navItems.find((item) => item.id === activePage)?.label || 'Dashboard'}</strong>
      </div>
      <div className="topbar-actions">
        {session ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="topbar-user-badge" onClick={() => setAdminOpen(true)}>
              <Icon name="shield" size={14} />
              <span>{session.role}</span>
            </button>
            <button className="topbar-logout-btn" onClick={signOut} title="Sign out">
              Sign out
            </button>
          </div>
        ) : (
          <button className="profile-button" onClick={() => setLoginOpen(true)}>
            <span>Portal</span>
            <span className="profile-icon"><Icon name="lock" size={15} /></span>
          </button>
        )}
      </div>
    </header>
  )
}
