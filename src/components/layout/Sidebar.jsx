import { Icon } from '../common/Icon'
import { asset } from '../../utils/storage'
import { normalizeRole } from '../../utils/security'

export function Sidebar({
  menuOpen,
  setMenuOpen,
  visibleNav,
  activePage,
  goTo,
  session,
  setAdminOpen,
  setLoginOpen,
}) {
  return (
    <>
      {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <a className="brand" href="#dashboard" onClick={() => goTo('dashboard')}>
            <img src={asset('college-logo.png')} alt="PSMO College logo" />
            <span><strong>PSMO</strong><small>BCA department</small></span>
          </a>
          <button className="icon-button sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
        </div>
        <div className="nav-label">Workspace</div>
        <nav className="main-nav" aria-label="Main navigation">
          {visibleNav.map((item) => (
            <button key={item.id} className={`nav-item ${activePage === item.id ? 'nav-item-active' : ''}`} onClick={() => goTo(item.id)}>
              <span className="nav-icon"><Icon name={item.icon} size={19} /></span>
              <span>{item.label}</span>
              {item.id === 'study' && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="campus-mini">
            <div className="mini-orb"><Icon name="spark" size={17} /></div>
            <div><strong>Make. Learn. Lead.</strong><span>4-year BCA programme</span></div>
          </div>
          {session ? (
            <button className="admin-link active" onClick={() => setAdminOpen(true)}>
              <span className="admin-avatar"><Icon name="shield" size={15} /></span>
              <span>{normalizeRole(session.role)} studio</span>
              <Icon name="arrow" size={16} />
            </button>
          ) : (
            <button className="admin-link" onClick={() => setLoginOpen(true)}>
              <span className="admin-avatar"><Icon name="lock" size={15} /></span>
              <span>Admin portal</span>
              <Icon name="arrow" size={16} />
            </button>
          )}
          <div className="sidebar-meta">PSMO College (Autonomous)<br />Tirurangadi · Kerala</div>
        </div>
      </aside>
    </>
  )
}
