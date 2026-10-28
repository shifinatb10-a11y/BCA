import { Icon } from '../common/Icon'

export function QuickLink({ icon, title, subtitle, onClick }) {
  return (
    <button className="quick-link" onClick={onClick} type="button">
      <div className="quick-icon">
        <Icon name={icon} size={18} />
      </div>
      <div className="quick-link-content">
        <strong className="quick-link-title">{title}</strong>
        <small className="quick-link-sub">{subtitle}</small>
      </div>
      <span className="quick-link-arrow">
        <Icon name="arrow" size={16} />
      </span>
    </button>
  )
}
