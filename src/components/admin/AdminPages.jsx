import { Icon } from '../common/Icon'
import { navItems } from '../../data/navItems'

export function AdminPages({ visiblePages, togglePage, showToast }) {
  return (
    <div className="admin-content-card">
      <div className="admin-card-heading">
        <div>
          <h3>Visibility Controls</h3>
          <p>Super admins can hide pages from the public and other admin workspaces.</p>
        </div>
        <span className="private-badge"><Icon name="shield" size={13} /> Super admin only</span>
      </div>
      <div className="page-toggle-list">
        {navItems.map((item) => (
          <div className="page-toggle" key={item.id}>
            <span className="toggle-page-icon"><Icon name={item.icon} size={18} /></span>
            <div>
              <strong>{item.label}</strong>
              <small>{item.eyebrow}</small>
            </div>
            <button
              className={`switch ${visiblePages.includes(item.id) ? 'switch-on' : ''}`}
              onClick={() => {
                togglePage(item.id)
                showToast(`${item.label} visibility updated`)
              }}
              aria-label={`Toggle ${item.label} visibility`}
            >
              <i />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
