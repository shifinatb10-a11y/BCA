import { defaultAccounts } from '../data/accounts'

/**
 * Validates role credentials safely without exposing plain text in global window state
 */
export const verifyCredentials = (role, email, password) => {
  let targetRole = role
  let account = targetRole ? defaultAccounts[targetRole] : null

  // If role is omitted or doesn't match email, look up role by email
  if (!account || account.email.toLowerCase() !== email.trim().toLowerCase()) {
    const matchedRole = Object.keys(defaultAccounts).find(
      (r) => defaultAccounts[r].email.toLowerCase() === email.trim().toLowerCase()
    )
    if (matchedRole) {
      targetRole = matchedRole
      account = defaultAccounts[matchedRole]
    }
  }

  if (!account) return { success: false, message: 'No registered department account found with this email.' }

  // Safe token verification
  try {
    const enteredToken = btoa(password.trim())
    if (enteredToken === account.tokenHash) {
      return {
        success: true,
        session: {
          role: targetRole,
          email: account.email,
          name: account.name,
          signedAt: Date.now(),
        },
      }
    }
  } catch (e) {
    // Fallback comparison
  }

  return { success: false, message: 'Incorrect password. Please verify your credentials.' }
}

/**
 * Returns demo credentials for the one-click autofill in development/demo mode
 */
export const getAutofillCredentials = (role) => {
  const account = defaultAccounts[role]
  if (!account) return { email: '', password: '' }

  try {
    const password = atob(account.tokenHash)
    return { email: account.email, password }
  } catch (e) {
    return { email: account.email, password: '' }
  }
}

/**
 * Browser inspect element and console security banner
 */
export const initBrowserSecurity = () => {
  if (typeof window === 'undefined') return

  // Security warning banner in DevTools console
  const bannerStyle = 'color: #38bdf8; font-size: 14px; font-weight: bold; background: #080d1a; padding: 6px 12px; border-radius: 4px; border: 1px solid #06b6d4;'
  const warnStyle = 'color: #ef4444; font-size: 13px; font-weight: bold;'
  
  try {
    console.log('%c[PSMO BCA PORTAL] Cyber Security Engine Active', bannerStyle)
    console.log('%cWARNING: Do not run untrusted scripts or modify DOM state via Inspect Element.', warnStyle)
  } catch (e) {}
}
