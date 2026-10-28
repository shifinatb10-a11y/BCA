import { Icon } from '../common/Icon'

export function QuickLink({ icon, title, subtitle, onClick }) {
  return (
    <button className="quick-link-card" onClick={onClick}>
      <div className="ql-icon"><Icon name={icon} size={20} /></div>
      <div className="ql-text"><strong>{title}</strong><small>{subtitle}</small></div>
      <span className="ql-arrow"><Icon name="arrow" size={16} /></span>
    </button>
  )
}
