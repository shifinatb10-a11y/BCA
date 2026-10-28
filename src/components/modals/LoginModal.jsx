import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { defaultAccounts, roles } from '../../data/accounts'
import { getAutofillCredentials } from '../../utils/security'
import { asset } from '../../utils/storage'

export function LoginModal({ role, setRole, onClose, onSignIn }) {
  const currentCreds = getAutofillCredentials(role)
  const [email, setEmail] = useState(currentCreds.email)
  const [password, setPassword] = useState(currentCreds.password)
  const [error, setError] = useState('')

  const handleRoleChange = (newRole) => {
    setRole(newRole)
    setError('')
    const nextCreds = getAutofillCredentials(newRole)
    setEmail(nextCreds.email)
    setPassword(nextCreds.password)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    const res = onSignIn(role, email, password)
    if (!res.success) {
      setError(res.message)
    }
  }

  const handleQuickLogin = () => {
    setError('')
    const creds = getAutofillCredentials(role)
    setEmail(creds.email)
    setPassword(creds.password)
    onSignIn(role, creds.email, creds.password)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close modal"><Icon name="close" /></button>
        <div className="login-emblem"><img src={asset('college-logo.png')} alt="PSMO College" /></div>
        <span className="eyebrow">PSMO BCA · Secure portal</span>
        <h2>Welcome<br /><em>back.</em></h2>
        <p>Sign in to manage your space. Super admins can manage and edit everything on the site.</p>

        <div className="role-picker">
          <span className="card-kicker">Choose workspace role</span>
          <div>
            {roles.map((item) => (
              <button
                key={item}
                className={role === item ? 'role-active' : ''}
                onClick={() => handleRoleChange(item)}
                type="button"
              >
                {item === 'Super admin' && <Icon name="star" size={13} />}
                {item}
                <span>{role === item && <Icon name="check" size={14} />}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Credentials Callout */}
        <div className="login-creds-box">
          <div className="login-creds-info">
            <strong><Icon name="shield" size={13} /> {role} Credentials</strong>
            <span>Email: {currentCreds.email}</span>
            <span>Password: {currentCreds.password}</span>
          </div>
          <button type="button" className="autofill-btn" onClick={handleQuickLogin}>
            <Icon name="spark" size={14} /> Quick One-Click Login
          </button>
        </div>

        {error && (
          <div className="login-error-msg">
            <Icon name="close" size={14} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@psmocollege.ac.in"
              required
            />
          </label>
          <label>
            Secure access key / Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </label>
          <Button type="submit" className="login-submit" icon="arrow">Continue to portal</Button>
        </form>

        <small className="login-note">
          <Icon name="shield" size={13} /> Protected access · Modern Cyberpunk Midnight Slate & Neon Cyan Portal.
        </small>
      </div>
    </div>
  )
}
