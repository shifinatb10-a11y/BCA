import { Icon } from './Icon'

export function Button({
  children,
  variant = 'primary',
  onClick,
  icon,
  type = 'button',
  className = '',
  disabled = false,
  style = {},
}) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
      {icon && <Icon name={icon} size={16} />}
    </button>
  )
}
