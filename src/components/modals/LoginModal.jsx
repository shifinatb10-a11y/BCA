import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { asset } from '../../utils/storage'

export function LoginModal({ role, onClose, onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close modal"><Icon name="close" /></button>
        <div className="login-emblem"><img src={asset('college-logo.png')} alt="PSMO College" /></div>
        <span className="eyebrow"><span className="eyebrow-line" />PSMO BCA · Secure Portal</span>
        <h2>Welcome<br /><em>back.</em></h2>
        <p>Sign in to manage your workspace.</p>

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
              autoFocus
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
            {loading ? 'Authenticating...' : 'Continue to portal'}
          </Button>
        </form>

        <small className="login-note">
          <Icon name="shield" size={13} /> Protected access · PSMO College BCA Department.
        </small>
      </div>
    </div>
  )
}
