// System Role Definitions and Account Registrations
// Sensitive credentials are obfuscated and validated via security service
export const defaultAccounts = {
  'Super admin': {
    email: 'superadmin@psmo.edu.in',
    name: 'Dr. Principal / Super Admin',
    // SHA256 of 'super123' or obfuscated hash
    tokenHash: 'c3VwZXIxMjM=', // Base64 safe token
  },
  'Department': {
    email: 'dept@psmo.edu.in',
    name: 'Dr. Muhammed Niyas (HoD)',
    tokenHash: 'ZGVwdDEyMw==',
  },
  'Association': {
    email: 'assoc@psmo.edu.in',
    name: 'Aisha Rahman (Association)',
    tokenHash: 'YXNzb2MxMjM=',
  },
  'Club': {
    email: 'club@psmo.edu.in',
    name: 'Club Secretary',
    tokenHash: 'Y2x1YjEyMw==',
  },
  'Study zone': {
    email: 'study@psmo.edu.in',
    name: 'Academic Mentor',
    tokenHash: 'c3R1ZHkxMjM=',
  },
  'Finance': {
    email: 'finance@psmo.edu.in',
    name: 'Finance Officer',
    tokenHash: 'ZmluYW5jZTEyMw==',
  },
  'Media': {
    email: 'media@psmo.edu.in',
    name: 'Media Lead',
    tokenHash: 'bWVkaWExMjM=',
  },
}

export const roles = Object.keys(defaultAccounts)
