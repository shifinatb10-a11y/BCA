import { useEffect, useState } from 'react'

// Data collections
import { navItems } from './data/navItems'
import {
  defaultEvents,
  defaultFaculty,
  defaultSubjects,
  defaultAssociations,
  defaultReports,
  defaultClubInfo,
  defaultClubEvents,
  defaultGallery,
  defaultPapers,
  defaultSyllabus,
  defaultQuizQuestions,
  defaultStudents,
  defaultBatches,
  defaultFinance,
} from './data/seedData'

// Utilities & Security
import { loadStorage, saveStorage } from './utils/storage'
import { verifyCredentials, initBrowserSecurity } from './utils/security'

// Common & Layout
import { Icon } from './components/common/Icon'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

// Modals
import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal'
import { ViewerModal } from './components/modals/ViewerModal'
import { FinanceViewerModal } from './components/modals/FinanceViewerModal'
import { LoginModal } from './components/modals/LoginModal'

// Admin Components
import { AdminPanel } from './components/admin/AdminPanel'
import { AdminFormModal } from './components/admin/AdminFormModal'

// Pages
import { Dashboard } from './components/pages/Dashboard'
import { Department } from './components/pages/Department'
import { Association } from './components/pages/Association'
import { Club } from './components/pages/Club'
import { StudyZone } from './components/pages/StudyZone'
import { Gallery } from './components/pages/Gallery'

export function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [adminRole, setAdminRole] = useState('Super admin')
  const [session, setSession] = useState(() => loadStorage('session', null))
  const [toast, setToast] = useState('')
  const [semester, setSemester] = useState('Sem 1')
  const [selectedSubject, setSelectedSubject] = useState('MFC')
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [viewer, setViewer] = useState(null)
  const [financeViewerOpen, setFinanceViewerOpen] = useState(false)

  // Initialize browser security banner
  useEffect(() => {
    initBrowserSecurity()
  }, [])

  // Dynamic CMS collections
  const [events, setEvents] = useState(() => loadStorage('events', defaultEvents))
  const [facultyList, setFacultyList] = useState(() => loadStorage('faculty', defaultFaculty))
  const [subjectsList, setSubjectsList] = useState(() => {
    const loaded = loadStorage('subjects', defaultSubjects)
    if (!Array.isArray(loaded) || loaded.length === 0 || !loaded.some((s) => s.semester === 'Sem 2')) {
      return defaultSubjects
    }
    return loaded
  })
  const [associationsList, setAssociationsList] = useState(() => {
    const loaded = loadStorage('associations', defaultAssociations)
    if (!Array.isArray(loaded) || loaded.length === 0 || !loaded.some((a) => a.fromYear)) {
      return defaultAssociations
    }
    return loaded
  })
  const [selectedAssocId, setSelectedAssocId] = useState(() => defaultAssociations[0]?.id || '')
  const [reportsList, setReportsList] = useState(() => loadStorage('reports', defaultReports))
  const [clubInfo, setClubInfo] = useState(() => {
    const loaded = loadStorage('club_info', defaultClubInfo)
    if (!loaded || !loaded.name || !loaded.punchline) {
      return defaultClubInfo
    }
    return loaded
  })
  const [clubEventsList, setClubEventsList] = useState(() => loadStorage('club_events', defaultClubEvents))
  const [galleryList, setGalleryList] = useState(() => loadStorage('gallery', defaultGallery))
  const [papersList, setPapersList] = useState(() => {
    const loaded = loadStorage('papers', defaultPapers)
    if (!Array.isArray(loaded) || loaded.length === 0 || !loaded.some((p) => p.subject === 'DM') || !loaded.some((p) => p.subject === 'COA')) {
      return defaultPapers
    }
    return loaded
  })
  const [syllabusList, setSyllabusList] = useState(() => {
    const loaded = loadStorage('syllabus', defaultSyllabus)
    if (!Array.isArray(loaded) || loaded.length === 0 || !loaded.some((s) => s.subjectCode === 'DM') || !loaded.some((s) => s.subjectCode === 'DS')) {
      return defaultSyllabus
    }
    return loaded
  })
  const [quizList, setQuizList] = useState(() => {
    const loaded = loadStorage('quiz_questions', defaultQuizQuestions)
    if (!Array.isArray(loaded) || loaded.length === 0 || !loaded.some((q) => q.subject === 'DM') || !loaded.some((q) => q.subject === 'COA')) {
      return defaultQuizQuestions
    }
    return loaded
  })
  const [studentsList, setStudentsList] = useState(() => loadStorage('students', defaultStudents))
  const [batches, setBatches] = useState(() => loadStorage('batches', defaultBatches))
  const [financeList, setFinanceList] = useState(() => loadStorage('finance', defaultFinance))
  const [visiblePages, setVisiblePages] = useState(() => loadStorage('visible_pages', navItems.map((item) => item.id)))
  const [galleryFilter, setGalleryFilter] = useState('All')

  // Edit / Add modal state
  const [modalForm, setModalForm] = useState(null) // { open: boolean, type: string, item: object | null }
  const [deleteConfirm, setDeleteConfirm] = useState(null) // { title, itemType, itemName, warning, confirmText, onConfirm }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3000)
  }

  const goTo = (page) => {
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Admin authentication using security service
  const signInWithCredentials = (role, email, pass) => {
    const res = verifyCredentials(role, email, pass)
    if (res.success) {
      setSession(res.session)
      saveStorage('session', res.session)
      setLoginOpen(false)
      setAdminOpen(true)
      showToast(`Welcome, ${res.session.name} (${role})`)
      return { success: true }
    }
    return { success: false, message: res.message }
  }

  const signOut = () => {
    setSession(null)
    saveStorage('session', null)
    setAdminOpen(false)
    showToast('Signed out from admin studio')
  }

  // Universal CRUD Handlers
  const handleSaveItem = (type, itemData) => {
    const id = itemData.id || `${type.slice(0, 3)}-${Date.now()}`
    const finalItem = { ...itemData, id }

    if (type === 'event') {
      const updated = events.some((i) => i.id === id) ? events.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...events]
      setEvents(updated)
      saveStorage('events', updated)
    } else if (type === 'faculty') {
      const updated = facultyList.some((i) => i.id === id) ? facultyList.map((i) => (i.id === id ? finalItem : i)) : [...facultyList, finalItem]
      setFacultyList(updated)
      saveStorage('faculty', updated)
    } else if (type === 'association') {
      const updated = associationsList.some((i) => i.id === id) ? associationsList.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...associationsList]
      setAssociationsList(updated)
      saveStorage('associations', updated)
      if (finalItem.active) setSelectedAssocId(finalItem.id)
    } else if (type === 'report') {
      const updated = reportsList.some((i) => i.id === id) ? reportsList.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...reportsList]
      setReportsList(updated)
      saveStorage('reports', updated)
    } else if (type === 'clubEvent') {
      const updated = clubEventsList.some((i) => i.id === id) ? clubEventsList.map((i) => (i.id === id ? finalItem : i)) : [...clubEventsList, finalItem]
      setClubEventsList(updated)
      saveStorage('club_events', updated)
    } else if (type === 'subject') {
      const updated = subjectsList.some((i) => i.id === id) ? subjectsList.map((i) => (i.id === id ? finalItem : i)) : [...subjectsList, finalItem]
      setSubjectsList(updated)
      saveStorage('subjects', updated)
    } else if (type === 'syllabus') {
      const updated = syllabusList.some((i) => i.id === id) ? syllabusList.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...syllabusList]
      setSyllabusList(updated)
      saveStorage('syllabus', updated)
    } else if (type === 'paper') {
      const updated = papersList.some((i) => i.id === id) ? papersList.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...papersList]
      setPapersList(updated)
      saveStorage('papers', updated)
    } else if (type === 'quiz') {
      const updated = quizList.some((i) => i.id === id) ? quizList.map((i) => (i.id === id ? finalItem : i)) : [...quizList, finalItem]
      setQuizList(updated)
      saveStorage('quiz_questions', updated)
    } else if (type === 'gallery') {
      const updated = galleryList.some((i) => i.id === id) ? galleryList.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...galleryList]
      setGalleryList(updated)
      saveStorage('gallery', updated)
    } else if (type === 'student') {
      const updated = studentsList.some((i) => i.id === id) ? studentsList.map((i) => (i.id === id ? finalItem : i)) : [...studentsList, finalItem]
      setStudentsList(updated)
      saveStorage('students', updated)
    } else if (type === 'finance') {
      const updated = financeList.some((i) => i.id === id) ? financeList.map((i) => (i.id === id ? finalItem : i)) : [finalItem, ...financeList]
      setFinanceList(updated)
      saveStorage('finance', updated)
    }

    setModalForm(null)
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully`)
  }

  const executeDeleteItem = (type, id) => {
    if (type === 'event') {
      const updated = events.filter((i) => i.id !== id)
      setEvents(updated)
      saveStorage('events', updated)
    } else if (type === 'faculty') {
      const updated = facultyList.filter((i) => i.id !== id)
      setFacultyList(updated)
      saveStorage('faculty', updated)
    } else if (type === 'association') {
      const updated = associationsList.filter((i) => i.id !== id)
      setAssociationsList(updated)
      saveStorage('associations', updated)
      if (selectedAssocId === id && updated.length > 0) setSelectedAssocId(updated[0].id)
    } else if (type === 'report') {
      const updated = reportsList.filter((i) => i.id !== id)
      setReportsList(updated)
      saveStorage('reports', updated)
    } else if (type === 'clubEvent') {
      const updated = clubEventsList.filter((i) => i.id !== id)
      setClubEventsList(updated)
      saveStorage('club_events', updated)
    } else if (type === 'subject') {
      const updated = subjectsList.filter((i) => i.id !== id)
      setSubjectsList(updated)
      saveStorage('subjects', updated)
    } else if (type === 'syllabus') {
      const updated = syllabusList.filter((i) => i.id !== id)
      setSyllabusList(updated)
      saveStorage('syllabus', updated)
    } else if (type === 'paper') {
      const updated = papersList.filter((i) => i.id !== id)
      setPapersList(updated)
      saveStorage('papers', updated)
    } else if (type === 'quiz') {
      const updated = quizList.filter((i) => i.id !== id)
      setQuizList(updated)
      saveStorage('quiz_questions', updated)
    } else if (type === 'gallery') {
      const updated = galleryList.filter((i) => i.id !== id)
      setGalleryList(updated)
      saveStorage('gallery', updated)
    } else if (type === 'student') {
      const updated = studentsList.filter((i) => i.id !== id)
      setStudentsList(updated)
      saveStorage('students', updated)
    } else if (type === 'finance') {
      const updated = financeList.filter((i) => i.id !== id)
      setFinanceList(updated)
      saveStorage('finance', updated)
    }

    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`)
  }

  const handleDeleteItem = (type, id, label) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
    setDeleteConfirm({
      title: `Delete ${typeLabel}`,
      itemType: typeLabel,
      itemName: label || id,
      warning: `Are you sure you want to delete this ${typeLabel.toLowerCase()}? This record will be permanently deleted from the website and cannot be undone.`,
      confirmText: `Yes, Delete`,
      onConfirm: () => {
        executeDeleteItem(type, id)
        setDeleteConfirm(null)
      }
    })
  }

  const handleDeleteBatch = (batch) => {
    setDeleteConfirm({
      title: 'Delete Student Batch',
      itemType: 'Batch',
      itemName: `Batch ${batch}`,
      warning: `Are you sure you want to delete admission Batch ${batch}? Student records will remain but their batch classification will be deleted. This cannot be undone.`,
      confirmText: 'Yes, Delete Batch',
      onConfirm: () => {
        const updated = batches.filter((item) => item !== batch)
        setBatches(updated)
        saveStorage('batches', updated)
        showToast(`Batch ${batch} deleted`)
        setDeleteConfirm(null)
      }
    })
  }

  const handleUpdateClubInfo = (newInfo) => {
    setClubInfo(newInfo)
    saveStorage('club_info', newInfo)
    showToast('Club details updated successfully')
  }

  const executeResetDefaults = () => {
    localStorage.clear()
    setEvents(defaultEvents)
    setFacultyList(defaultFaculty)
    setSubjectsList(defaultSubjects)
    setAssociationsList(defaultAssociations)
    setSelectedAssocId(defaultAssociations[0]?.id || '')
    setReportsList(defaultReports)
    setClubInfo(defaultClubInfo)
    setClubEventsList(defaultClubEvents)
    setGalleryList(defaultGallery)
    setPapersList(defaultPapers)
    setSyllabusList(defaultSyllabus)
    setQuizList(defaultQuizQuestions)
    setStudentsList(defaultStudents)
    setBatches(defaultBatches)
    setFinanceList(defaultFinance)
    setVisiblePages(navItems.map((item) => item.id))
    showToast('All collections restored to initial defaults')
  }

  const handleResetDefaults = () => {
    setDeleteConfirm({
      title: 'Reset All Collections',
      itemType: 'System Reset',
      itemName: 'All Custom Portal Records',
      warning: 'WARNING: This will wipe all custom additions and reset all events, faculty, associations, syllabus, papers, quiz, gallery, students, and finances back to initial demo data. This cannot be undone.',
      confirmText: 'Yes, Reset All Data',
      onConfirm: () => {
        executeResetDefaults()
        setDeleteConfirm(null)
      }
    })
  }

  const visibleNav = navItems.filter((item) => visiblePages.includes(item.id))

  // Permissions helpers
  const canManageStudy = session && (session.role === 'Study zone' || session.role === 'Super admin')
  const canManageAssoc = session && (session.role === 'Association' || session.role === 'Super admin')
  const canManageClub = session && (session.role === 'Club' || session.role === 'Super admin')
  const canViewFinance = session && (session.role === 'Finance' || session.role === 'Association' || session.role === 'Super admin')

  return (
    <div className="app-shell">
      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        visibleNav={visibleNav}
        activePage={activePage}
        goTo={goTo}
        session={session}
        setAdminOpen={setAdminOpen}
        setLoginOpen={setLoginOpen}
      />

      <main className="main-content">
        <Header
          setMenuOpen={setMenuOpen}
          activePage={activePage}
          session={session}
          setAdminOpen={setAdminOpen}
          signOut={signOut}
          setLoginOpen={setLoginOpen}
        />

        {activePage === 'dashboard' && <Dashboard goTo={goTo} setViewer={setViewer} events={events} />}
        {activePage === 'department' && <Department goTo={goTo} facultyList={facultyList} />}
        {activePage === 'association' && (
          <Association
            setViewer={setViewer}
            reportsList={reportsList}
            associationsList={associationsList}
            selectedAssocId={selectedAssocId}
            setSelectedAssocId={setSelectedAssocId}
            canManageAssoc={canManageAssoc}
            onOpenAddAssoc={() => setModalForm({ open: true, type: 'association', item: null })}
            onOpenFinanceModal={() => setFinanceViewerOpen(true)}
            canViewFinance={canViewFinance}
            financeList={financeList}
          />
        )}
        {activePage === 'club' && (
          <Club
            goTo={goTo}
            setViewer={setViewer}
            clubInfo={clubInfo}
            clubEventsList={clubEventsList}
            canManageClub={canManageClub}
            onOpenEditClub={() => { setAdminOpen(true); }}
          />
        )}
        {activePage === 'study' && (
          <StudyZone
            subjectsList={subjectsList}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            semester={semester}
            setSemester={setSemester}
            papersList={papersList}
            syllabusList={syllabusList}
            quizList={quizList}
            quizStarted={quizStarted}
            setQuizStarted={setQuizStarted}
            quizSubmitted={quizSubmitted}
            setQuizSubmitted={setQuizSubmitted}
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            canManageStudy={canManageStudy}
            onOpenAddSubject={() => setModalForm({ open: true, type: 'subject', item: { semester } })}
            onOpenAddSyllabus={() => setModalForm({ open: true, type: 'syllabus', item: { semester, subjectCode: selectedSubject } })}
            onEditSyllabus={(syl) => setModalForm({ open: true, type: 'syllabus', item: syl })}
            onDeleteSyllabus={(id, title) => handleDeleteItem('syllabus', id, title)}
            onOpenAddPaper={() => setModalForm({ open: true, type: 'paper', item: { semester, subject: selectedSubject } })}
            onOpenAddQuiz={() => setModalForm({ open: true, type: 'quiz', item: { semester, subject: selectedSubject } })}
          />
        )}
        {activePage === 'gallery' && (
          <Gallery
            galleryList={galleryList}
            filter={galleryFilter}
            setFilter={setGalleryFilter}
            setViewer={setViewer}
            canManageMedia={session && (session.role === 'Media' || session.role === 'Super admin')}
            onOpenAddPhoto={() => setModalForm({ open: true, type: 'gallery', item: null })}
          />
        )}

        <Footer />
      </main>

      {viewer && <ViewerModal item={viewer} onClose={() => setViewer(null)} />}

      {financeViewerOpen && (
        <FinanceViewerModal
          financeList={financeList}
          onClose={() => setFinanceViewerOpen(false)}
          isReadOnly={session?.role === 'Association'}
        />
      )}

      {loginOpen && (
        <LoginModal
          role={adminRole}
          setRole={setAdminRole}
          onClose={() => setLoginOpen(false)}
          onSignIn={signInWithCredentials}
        />
      )}

      {adminOpen && session && (
        <AdminPanel
          session={session}
          onClose={() => setAdminOpen(false)}
          batches={batches}
          setBatches={(b) => { setBatches(b); saveStorage('batches', b) }}
          visiblePages={visiblePages}
          setVisiblePages={(p) => { setVisiblePages(p); saveStorage('visible_pages', p) }}
          showToast={showToast}
          onLogout={signOut}
          events={events}
          facultyList={facultyList}
          subjectsList={subjectsList}
          associationsList={associationsList}
          reportsList={reportsList}
          clubInfo={clubInfo}
          onUpdateClubInfo={handleUpdateClubInfo}
          clubEventsList={clubEventsList}
          galleryList={galleryList}
          papersList={papersList}
          syllabusList={syllabusList}
          quizList={quizList}
          studentsList={studentsList}
          financeList={financeList}
          onOpenModal={(type, item) => setModalForm({ open: true, type, item })}
          onDeleteItem={handleDeleteItem}
          onDeleteBatch={handleDeleteBatch}
          onResetDefaults={handleResetDefaults}
        />
      )}

      {modalForm && modalForm.open && (
        <AdminFormModal
          type={modalForm.type}
          initialItem={modalForm.item}
          onClose={() => setModalForm(null)}
          onSave={(itemData) => handleSaveItem(modalForm.type, itemData)}
          batches={batches}
          subjectsList={subjectsList}
          semester={semester}
        />
      )}

      {deleteConfirm && (
        <ConfirmDeleteModal
          dialog={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
        />
      )}

      {toast && (
        <div className="toast">
          <span className="toast-check"><Icon name="check" size={15} /></span>
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
