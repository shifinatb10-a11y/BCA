import { createClient } from '@supabase/supabase-js'
import { normalizeRole } from './security'

const getEnv = (key, fallback = '') => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback
  }
  return fallback
}

export const SUPABASE_URL =
  getEnv('VITE_SUPABASE_URL') ||
  getEnv('NEXT_PUBLIC_SUPABASE_URL') ||
  'https://mtvokalfbvgqpeqwrgle.supabase.co'

export const SUPABASE_ANON_KEY =
  getEnv('VITE_SUPABASE_ANON_KEY') ||
  getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dm9rYWxmYnZncXBlcXdyZ2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwODQzODcsImV4cCI6MjEwNzY2MDM4N30.K4F9yuGyamSzMmf1qmhMB1W0KmSwrmo08X0Qd0GN82M'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// ==========================================
// SUPABASE AUTHENTICATION
// ==========================================

export const signInWithSupabase = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    })

    if (error) {
      return { success: false, message: error.message }
    }

    const user = data.user
    let role = user?.user_metadata?.role || user?.app_metadata?.role || ''

    // Check if role is recorded in admin_users table
    try {
      const { data: adminRows } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email.trim())
        .limit(1)

      if (adminRows && adminRows.length > 0 && adminRows[0].role) {
        role = adminRows[0].role
      }
    } catch (e) {}

    // Fallback: derive from email username if role is still empty
    if (!role) {
      role = email.split('@')[0]
    }

    const canonicalRole = normalizeRole(role)

    return {
      success: true,
      session: {
        role: canonicalRole,
        email: user.email,
        name: user?.user_metadata?.full_name || email.split('@')[0],
        id: user.id,
        supabaseAuth: true,
        signedAt: Date.now(),
      },
    }
  } catch (err) {
    return { success: false, message: err.message || 'Supabase authentication failed.' }
  }
}

export const signOutSupabase = async () => {
  try {
    await supabase.auth.signOut()
  } catch (e) {}
}

export const getSupabaseSession = async () => {
  try {
    const { data } = await supabase.auth.getSession()
    return data.session
  } catch (e) {
    return null
  }
}

// ==========================================
// DATA ADAPTERS (Supabase Schema <-> Portal UI)
// ==========================================

export const mapSupabaseFaculty = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r) => ({
    id: r.id,
    name: r.name || '',
    role: r.designation || r.role_title || 'Assistant Professor',
    tag: r.qualification || 'MCA · Faculty',
    image: r.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=85',
    email: r.email || '',
    bio: r.bio || '',
    displayOrder: r.display_order ?? 0,
  }))
}

export const mapSupabaseAssociations = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r, idx) => ({
    id: r.id,
    fromYear: r.start_year ? String(r.start_year) : (r.year_label ? r.year_label.split(/[-–—]/)[0]?.trim() : '2025'),
    toYear: r.end_year ? String(r.end_year) : (r.year_label ? r.year_label.split(/[-–—]/)[1]?.trim() : '2026'),
    name: r.name || "BCA Students' Association",
    secretaryName: r.secretary_name || 'Association Secretary',
    secretaryRole: r.secretary_designation || `Secretary · ${r.year_label || 'Term'}`,
    secretaryPhoto: r.secretary_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=560&q=85',
    quote: r.secretary_details || 'Innovate together, inspire forever.',
    description: r.description || 'Student-led association organizing technical and cultural programs.',
    magazineTitle: r.magazine_title || '',
    magazineUrl: r.magazine_url || '',
    active: idx === 0,
  }))
}

export const mapSupabaseReports = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r) => ({
    id: r.id,
    associationId: r.association_id,
    title: r.title || 'Report',
    type: r.title?.toLowerCase().includes('magazine') ? 'ANNUAL MAGAZINE' : 'EVENT REPORT',
    date: r.event_date ? new Date(r.event_date).toLocaleDateString('en-GB') : '12.07.2026',
    fileUrl: r.file_url || '',
    isMagazine: Boolean(r.title?.toLowerCase().includes('magazine')),
  }))
}

export const mapSupabaseClub = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  const c = rows[0]
  return {
    id: c.id,
    name: c.name || 'BCA Tech Club',
    punchline: c.tagline || 'Explore, build and share technology together.',
    description: c.description || 'A student-driven community bringing together learners passionate about technology.',
    coverImage: c.cover_image_url || '',
    tags: ['Workshops', 'Coding Hub', 'Bootcamps', 'Hackathons', 'Open Source'],
  }
}

export const mapSupabaseClubEvents = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  const colors = ['orange', 'violet', 'blue']
  return rows.map((r, idx) => ({
    id: r.id,
    number: String(idx + 1).padStart(2, '0'),
    title: r.title || 'Tech Meet',
    date: r.event_date ? new Date(r.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ' · 10:00 AM' : '24 Jul · 2:00 PM',
    copy: r.description || 'Interactive student workshop and technical demonstration.',
    image: r.image_url || '',
    reportUrl: r.report_url || '',
    color: colors[idx % colors.length],
  }))
}

export const mapSupabaseGallery = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r) => ({
    id: r.id,
    title: r.title || 'Department Gallery',
    type: r.media_type === 'image' ? 'Campus' : 'Event',
    image: r.url || 'college-photo.jpg',
    thumbnailUrl: r.thumbnail_url || r.url,
    imagekitFileId: r.imagekit_file_id || '',
  }))
}

export const mapSupabaseStudyMaterials = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return { papers: null, syllabi: null }
  
  const papers = []
  const syllabi = []

  rows.forEach((r) => {
    const isPaper = r.category === 'question_paper' || !r.category
    const sem = r.semester ? (r.semester.toLowerCase().includes('sem') ? r.semester.replace(/sem/i, 'Sem ') : `Sem ${r.semester}`) : 'Sem 1'

    if (isPaper) {
      papers.push({
        id: r.id,
        subject: r.subject || '',
        semester: sem,
        year: r.year ? String(r.year) : '2026',
        title: r.title || `${r.subject || 'Question'} Paper`,
        fileUrl: r.file_url || '',
      })
    } else {
      // Syllabus / notes
      let modules = []
      try {
        if (r.description && r.description.startsWith('[')) {
          modules = JSON.parse(r.description)
        }
      } catch (e) {}

      if (modules.length === 0) {
        modules = [
          { unit: 'Unit 1: Fundamentals', desc: r.description || 'Core foundational concepts.' },
          { unit: 'Unit 2: Applied Techniques', desc: 'Practical methodologies and implementations.' },
        ]
      }

      syllabi.push({
        id: r.id,
        subjectCode: r.subject || '',
        subjectTitle: r.title || 'Curriculum Syllabus',
        semester: sem,
        credits: '4 Credits · 60 Hours',
        regulation: 'PSMO Autonomous / Calicut University 2026',
        modules,
        fileUrl: r.file_url || '',
      })
    }
  })

  return { papers: papers.length > 0 ? papers : null, syllabi: syllabi.length > 0 ? syllabi : null }
}

export const mapSupabaseQuizzes = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  const allQuestions = []
  rows.forEach((qObj) => {
    const sem = qObj.semester ? (qObj.semester.toLowerCase().includes('sem') ? qObj.semester.replace(/semester/i, 'Sem').trim() : `Sem ${qObj.semester}`) : 'Sem 1'
    const subject = qObj.subject || ''

    if (Array.isArray(qObj.questions)) {
      qObj.questions.forEach((q, idx) => {
        allQuestions.push({
          id: q.id || `${qObj.id}-q${idx}`,
          quizId: qObj.id,
          subject,
          semester: sem,
          text: q.question || q.text || 'Question',
          options: q.options || [],
          answer: typeof q.correct_option === 'number' ? (q.options ? q.options[q.correct_option] : '') : (q.answer || ''),
          explanation: q.explanation || '',
        })
      })
    }
  })
  return allQuestions.length > 0 ? allQuestions : null
}

export const mapSupabaseStudents = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r) => ({
    id: r.id,
    rollNo: r.roll_no || '',
    name: r.name || '',
    admissionNo: r.admission_no || '',
    registerNo: r.register_no || '',
    email: r.email || '',
    batch: r.batch || '2025–2029',
    gender: r.gender || '',
  }))
}

export const mapSupabaseBatches = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r) => r.label).filter(Boolean)
}

export const mapSupabaseTransactions = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) return null
  return rows.map((r) => ({
    id: r.id,
    title: r.title || 'Transaction',
    category: r.category || 'Income',
    amount: r.amount ? (String(r.amount).startsWith('₹') ? String(r.amount) : `₹${Number(r.amount).toLocaleString('en-IN')}`) : '₹0',
    date: r.transaction_date ? new Date(r.transaction_date).toLocaleDateString('en-GB') : '15.06.2026',
    status: 'Completed',
    description: r.description || '',
  }))
}

// ==========================================
// MASTER FETCH FUNCTION
// ==========================================

export const fetchAllSupabaseData = async () => {
  const result = {
    faculty: null,
    associations: null,
    reports: null,
    clubInfo: null,
    clubEvents: null,
    gallery: null,
    papers: null,
    syllabi: null,
    quizzes: null,
    students: null,
    batches: null,
    finance: null,
  }

  try {
    const [
      facRes,
      assocRes,
      repRes,
      clubRes,
      cEvtRes,
      galRes,
      matRes,
      quizRes,
      stuRes,
      batRes,
      finRes,
    ] = await Promise.allSettled([
      supabase.from('faculty').select('*').order('display_order', { ascending: true }),
      supabase.from('associations').select('*').order('display_order', { ascending: true }),
      supabase.from('association_reports').select('*').order('created_at', { ascending: false }),
      supabase.from('clubs').select('*').limit(1),
      supabase.from('club_events').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery_items').select('*').order('created_at', { ascending: false }),
      supabase.from('study_materials').select('*').order('created_at', { ascending: false }),
      supabase.from('quizzes').select('*').order('created_at', { ascending: false }),
      supabase.from('students').select('*').order('created_at', { ascending: false }),
      supabase.from('student_batches').select('*'),
      supabase.from('transactions').select('*').order('created_at', { ascending: false }),
    ])

    if (facRes.status === 'fulfilled' && facRes.value.data) {
      result.faculty = mapSupabaseFaculty(facRes.value.data)
    }
    if (assocRes.status === 'fulfilled' && assocRes.value.data) {
      result.associations = mapSupabaseAssociations(assocRes.value.data)
    }
    if (repRes.status === 'fulfilled' && repRes.value.data) {
      result.reports = mapSupabaseReports(repRes.value.data)
    }
    if (clubRes.status === 'fulfilled' && clubRes.value.data) {
      result.clubInfo = mapSupabaseClub(clubRes.value.data)
    }
    if (cEvtRes.status === 'fulfilled' && cEvtRes.value.data) {
      result.clubEvents = mapSupabaseClubEvents(cEvtRes.value.data)
    }
    if (galRes.status === 'fulfilled' && galRes.value.data) {
      result.gallery = mapSupabaseGallery(galRes.value.data)
    }
    if (matRes.status === 'fulfilled' && matRes.value.data) {
      const { papers, syllabi } = mapSupabaseStudyMaterials(matRes.value.data)
      result.papers = papers
      result.syllabi = syllabi
    }
    if (quizRes.status === 'fulfilled' && quizRes.value.data) {
      result.quizzes = mapSupabaseQuizzes(quizRes.value.data)
    }
    if (stuRes.status === 'fulfilled' && stuRes.value.data) {
      result.students = mapSupabaseStudents(stuRes.value.data)
    }
    if (batRes.status === 'fulfilled' && batRes.value.data) {
      result.batches = mapSupabaseBatches(batRes.value.data)
    }
    if (finRes.status === 'fulfilled' && finRes.value.data) {
      result.finance = mapSupabaseTransactions(finRes.value.data)
    }
  } catch (err) {
    console.warn('[Supabase] Sync notice:', err.message)
  }

  return result
}
