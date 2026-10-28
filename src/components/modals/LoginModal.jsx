import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { defaultAccounts, roles } from '../../data/accounts'
import { getAutofillCredentials } from '../../utils/security'
import { asset } from '../../utils/storage'
import { isSupabaseConfigured } from '../../utils/supabase'

export function LoginModal({ role, setRole, onClose, onSignIn }) {
  const currentCreds = getAutofillCredentials(role)
  const [email, setEmail] = useState(currentCreds.email)
  const [password, setPassword] = useState(currentCreds.password)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isSupabaseReady = isSupabaseConfigured()

  const handleRoleChange = (newRole) => {
    setRole(newRole)
    setError('')
    const nextCreds = getAutofillCredentials(newRole)
    setEmail(nextCreds.email)
    setPassword(nextCreds.password)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await onSignIn(role, email, password)
      if (!res.success) {
        setError(res.message)
      }
    } catch (err) {
      setError(err.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = async () => {
    setError('')
    const creds = getAutofillCredentials(role)
    setEmail(creds.email)
    setPassword(creds.password)
    setLoading(true)
    try {
      const res = await onSignIn(role, creds.email, creds.password)
      if (!res.success) {
        setError(res.message)
      }
    } catch (err) {
      setError(err.message || 'Authentication error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close modal"><Icon name="close" /></button>
        <div className="login-emblem"><img src={asset('college-logo.png')} alt="PSMO College" /></div>
        <span className="eyebrow"><span className="eyebrow-line" />PSMO BCA · Secure Portal</span>
        <h2>Welcome<br /><em>back.</em></h2>
        <p>Sign in to manage your space. Powered by Supabase Cloud Authentication & PostgreSQL.</p>

        {/* Database Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', padding: '6px 12px', background: '#0a1628', borderRadius: '6px', border: '1px solid #1e3a5f' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isSupabaseReady ? '#10b981' : '#f59e0b', display: 'inline-block', boxShadow: isSupabaseReady ? '0 0 8px #10b981' : 'none' }} />
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
            {isSupabaseReady ? 'Supabase Auth & Database Live' : 'Local Fallback Storage Active'}
          </span>
          <span style={{ fontSize: '10px', color: '#06b6d4', marginLeft: 'auto', background: 'rgba(6,182,212,0.1)', padding: '1px 6px', borderRadius: '3px' }}>
            mtvokalfbvgqpeqwrgle
          </span>
        </div>

        <div className="role-picker">
          <span className="card-kicker">Choose workspace role</span>
          <div>
            {roles.map((item) => (
              <button
                key={item}
                className={role === item ? 'role-active' : ''}
                onClick={() => handleRoleChange(item)}
                type="button"
                disabled={loading}
              >
                {item === 'Super admin' && <Icon name="star" size={13} />}
                {item}
                <span>{role === item && <Icon name="check" size={14} />}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Callout with One-Click Login */}
        <div className="login-creds-box">
          <div className="login-creds-info">
            <strong><Icon name="shield" size={13} /> {role} Credentials</strong>
            <span>Email: {currentCreds.email}</span>
            <span>Password: {currentCreds.password}</span>
          </div>
          <button type="button" className="autofill-btn" onClick={handleQuickLogin} disabled={loading}>
            <Icon name="spark" size={14} /> {loading ? 'Signing in...' : 'Quick One-Click Login'}
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
              disabled={loading}
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
              disabled={loading}
            />
          </label>
          <Button type="submit" className="login-submit" icon="arrow" disabled={loading}>
            {loading ? 'Authenticating with Supabase...' : 'Continue to portal'}
          </Button>
        </form>

        <small className="login-note">
          <Icon name="shield" size={13} /> Protected access · Modern Cyberpunk Midnight Slate & Neon Cyan Portal.
        </small>
      </div>
    </div>
  )
}
