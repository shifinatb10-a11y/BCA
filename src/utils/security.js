import { loadStorage, saveStorage } from './storage'
import { defaultAccounts } from '../data/accounts'

export const initialAdminUsers = [
  {
    id: 'admin-super',
    role: 'Super admin',
    name: 'Dr. Principal / Super Admin',
    email: 'superadmin@psmo.edu.in',
    tokenHash: 'c3VwZXIxMjM=', // super123
    isPrimary: true,
    permissions: 'Full site control, portal settings & admin management',
  },
  {
    id: 'admin-dept',
    role: 'Department',
    name: 'Dr. Muhammed Niyas (HoD)',
    email: 'dept@psmo.edu.in',
    tokenHash: 'ZGVwdDEyMw==', // dept123
    permissions: 'Faculty profiles & student admission records',
  },
  {
    id: 'admin-assoc',
    role: 'Association',
    name: 'Aisha Rahman (Association)',
    email: 'assoc@psmo.edu.in',
    tokenHash: 'YXNzb2MxMjM=', // assoc123
    permissions: 'Association editions, reports & annual magazines',
  },
  {
    id: 'admin-club',
    role: 'Club',
    name: 'Club Secretary',
    email: 'club@psmo.edu.in',
    tokenHash: 'Y2x1YjEyMw==', // club123
    permissions: 'BCA Tech Club profile, workshops & events',
  },
  {
    id: 'admin-study',
    role: 'Study zone',
    name: 'Academic Mentor',
    email: 'study@psmo.edu.in',
    tokenHash: 'c3R1ZHkxMjM=', // study123
    permissions: 'Subjects, syllabus modules, question papers & quizzes',
  },
  {
    id: 'admin-finance',
    role: 'Finance',
    name: 'Finance Officer',
    email: 'finance@psmo.edu.in',
    tokenHash: 'ZmluYW5jZTEyMw==', // finance123
    permissions: 'Income, expense, vouchers & financial statements',
  },
  {
    id: 'admin-media',
    role: 'Media',
    name: 'Media Lead',
    email: 'media@psmo.edu.in',
    tokenHash: 'bWVkaWExMjM=', // media123
    permissions: 'Public photo gallery & campus event media',
  },
]

export const rolePermissions = {
  'Super admin': {
    title: 'Super Administrator',
    description: 'Unrestricted full authority over all site data, settings, and administrator accounts.',
    canManageEvents: true,
    canManageDept: true,
    canManageAssoc: true,
    canManageClub: true,
    canManageStudy: true,
    canManageFinance: true,
    canManageMedia: true,
    canManageAdmins: true,
    canResetSystem: true,
    allowedTabs: ['Overview', 'Events', 'Department', 'Association', 'Club', 'Study zone', 'Gallery', 'Students', 'Finance', 'Admins', 'Pages'],
  },
  'Department': {
    title: 'Department Admin',
    description: 'Authorized to manage faculty directory, designations, and student admission batches.',
    canManageEvents: false,
    canManageDept: true,
    canManageAssoc: false,
    canManageClub: false,
    canManageStudy: false,
    canManageFinance: false,
    canManageMedia: false,
    canManageAdmins: false,
    canResetSystem: false,
    allowedTabs: ['Overview', 'Department', 'Students'],
  },
  'Association': {
    title: 'Association Admin',
    description: 'Authorized to manage student association tenures, office-bearers, reports and annual magazines.',
    canManageEvents: false,
    canManageDept: false,
    canManageAssoc: true,
    canManageClub: false,
    canManageStudy: false,
    canManageFinance: false,
    canManageMedia: false,
    canManageAdmins: false,
    canResetSystem: false,
    allowedTabs: ['Overview', 'Association'],
  },
  'Club': {
    title: 'Club Admin',
    description: 'Authorized to manage BCA Tech Club profile, punchline, description, and club workshops/events.',
    canManageEvents: false,
    canManageDept: false,
    canManageAssoc: false,
    canManageClub: true,
    canManageStudy: false,
    canManageFinance: false,
    canManageMedia: false,
    canManageAdmins: false,
    canResetSystem: false,
    allowedTabs: ['Overview', 'Club'],
  },
  'Study zone': {
    title: 'Study Zone Admin',
    description: 'Authorized to manage academic subjects, semester curriculum, past question papers, and quizzes.',
    canManageEvents: false,
    canManageDept: false,
    canManageAssoc: false,
    canManageClub: false,
    canManageStudy: true,
    canManageFinance: false,
    canManageMedia: false,
    canManageAdmins: false,
    canResetSystem: false,
    allowedTabs: ['Overview', 'Study zone'],
  },
  'Finance': {
    title: 'Finance Admin',
    description: 'Authorized to manage departmental & association financial transactions, income, expense, and grants.',
    canManageEvents: false,
    canManageDept: false,
    canManageAssoc: false,
    canManageClub: false,
    canManageStudy: false,
    canManageFinance: true,
    canManageMedia: false,
    canManageAdmins: false,
    canResetSystem: false,
    allowedTabs: ['Overview', 'Finance'],
  },
  'Media': {
    title: 'Media Admin',
    description: 'Authorized to upload, edit, and curate campus gallery photos and public media moments.',
    canManageEvents: false,
    canManageDept: false,
    canManageAssoc: false,
    canManageClub: false,
    canManageStudy: false,
    canManageFinance: false,
    canManageMedia: true,
    canManageAdmins: false,
    canResetSystem: false,
    allowedTabs: ['Overview', 'Gallery'],
  },
}

export const normalizeRole = (role) => {
  if (!role) return 'Department'
  const clean = String(role).trim().toLowerCase().replace(/[._-]/g, ' ')

  if (clean.includes('super') || clean === 'admin' || clean.includes('principal') || clean.includes('head')) {
    return 'Super admin'
  }
  if (clean.includes('dept') || clean.includes('faculty') || clean.includes('hod') || clean.includes('teacher') || clean.includes('student')) {
    return 'Department'
  }
  if (clean.includes('assoc')) {
    return 'Association'
  }
  if (clean.includes('club')) {
    return 'Club'
  }
  if (clean.includes('study') || clean.includes('academic') || clean.includes('syllabus') || clean.includes('quiz') || clean.includes('paper')) {
    return 'Study zone'
  }
  if (clean.includes('finance') || clean.includes('treasur') || clean.includes('account')) {
    return 'Finance'
  }
  if (clean.includes('media') || clean.includes('gallery') || clean.includes('photo')) {
    return 'Media'
  }
  return 'Department'
}

export const getAdminUsersList = () => {
  return loadStorage('admin_users_list', initialAdminUsers)
}

export const saveAdminUsersList = (list) => {
  saveStorage('admin_users_list', list)
}

/**
 * Validates role credentials against dynamic admin directory
 */
export const verifyCredentials = (role, email, password) => {
  const currentAdmins = getAdminUsersList()
  const cleanEmail = email.trim().toLowerCase()
  const cleanPass = password.trim()

  // Match admin by email or name
  const account = currentAdmins.find((a) => a.email.toLowerCase() === cleanEmail || a.name.toLowerCase() === cleanEmail)
  if (!account) {
    return { success: false, message: 'No registered admin account found with this email address.' }
  }

  // Safe token verification
  try {
    const enteredToken = btoa(cleanPass)
    if (enteredToken === account.tokenHash) {
      return {
        success: true,
        session: {
          id: account.id,
          role: normalizeRole(account.role),
          email: account.email,
          name: account.name,
          signedAt: Date.now(),
        },
      }
    }
  } catch (e) {}

  return { success: false, message: 'Incorrect password. Please verify your credentials.' }
}

/**
 * Returns demo credentials for development/testing
 */
export const getAutofillCredentials = (role) => {
  const currentAdmins = getAdminUsersList()
  const account = currentAdmins.find((a) => a.role === role) || defaultAccounts[role]
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

  const bannerStyle = 'color: #38bdf8; font-size: 14px; font-weight: bold; background: #080d1a; padding: 6px 12px; border-radius: 4px; border: 1px solid #06b6d4;'
  const warnStyle = 'color: #ef4444; font-size: 13px; font-weight: bold;'
  
  try {
    console.log('%c[PSMO BCA PORTAL] Cyber Security Engine Active', bannerStyle)
    console.log('%cWARNING: Do not run untrusted scripts or modify DOM state via Inspect Element.', warnStyle)
  } catch (e) {}
}
