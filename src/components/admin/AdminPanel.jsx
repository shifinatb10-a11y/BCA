import { useMemo, useState, useEffect } from 'react'
import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { FinanceSummaryCards } from './FinanceSummaryCards'
import { StudentManager } from './StudentManager'
import { AdminPages } from './AdminPages'
import { asset } from '../../utils/storage'
import { rolePermissions, normalizeRole } from '../../utils/security'

export function AdminPanel({
  session,
  onClose,
  batches,
  setBatches,
  visiblePages,
  setVisiblePages,
  showToast,
  onLogout,
  events,
  facultyList,
  subjectsList,
  associationsList = [],
  reportsList,
  clubInfo,
  onUpdateClubInfo,
  clubEventsList,
  galleryList,
  papersList,
  syllabusList = [],
  quizList,
  studentsList,
  financeList,
  adminUsersList = [],
  onOpenModal,
  onDeleteItem,
  onDeleteBatch,
  onResetDefaults,
}) {
  const currentRole = normalizeRole(session?.role)
  const isSuper = currentRole === 'Super admin'
  const isAssocAdmin = currentRole === 'Association'

  // Dynamic tabs strictly based on role
  const tabs = useMemo(() => {
    if (isSuper) {
      return ['Overview', 'Events', 'Department', 'Association', 'Club', 'Study zone', 'Gallery', 'Students', 'Finance', 'Admins', 'Pages']
    }
    if (currentRole === 'Department') return ['Overview', 'Department', 'Students']
    if (currentRole === 'Association') return ['Overview', 'Association']
    if (currentRole === 'Club') return ['Overview', 'Club']
    if (currentRole === 'Study zone') return ['Overview', 'Study zone']
    if (currentRole === 'Media') return ['Overview', 'Gallery']
    if (currentRole === 'Finance') return ['Overview', 'Finance']
    return ['Overview']
  }, [isSuper, currentRole])

  const [adminTab, setAdminTab] = useState('Overview')
  const [studySubtab, setStudySubtab] = useState('subjects') // 'subjects' | 'syllabus' | 'papers' | 'quizzes'
  const [assocSubtab, setAssocSubtab] = useState('associations') // 'associations' | 'reports'
  const [newBatch, setNewBatch] = useState('')

  // Keep adminTab within authorized bounds
  useEffect(() => {
    if (!tabs.includes(adminTab)) {
      setAdminTab('Overview')
    }
  }, [tabs, adminTab])

  // Local state for Club editor
  const [editClubName, setEditClubName] = useState(clubInfo.name)
  const [editClubTagline, setEditClubTagline] = useState(clubInfo.tagline)
  const [editClubEst, setEditClubEst] = useState(clubInfo.estYear)
  const [editClubDesc, setEditClubDesc] = useState(clubInfo.description)

  const handleSaveClubInfo = (e) => {
    e.preventDefault()
    onUpdateClubInfo({
      ...clubInfo,
      name: editClubName,
      tagline: editClubTagline,
      estYear: editClubEst,
      description: editClubDesc,
    })
  }

  const togglePage = (id) =>
    setVisiblePages((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  const addBatch = (event) => {
    event.preventDefault()
    if (newBatch.trim()) {
      setBatches([...batches, newBatch.trim()])
      setNewBatch('')
      showToast(`Batch ${newBatch.trim()} added`)
    }
  }

  const removeBatch = (batch) => {
    if (onDeleteBatch) {
      onDeleteBatch(batch)
    } else {
      setBatches(batches.filter((item) => item !== batch))
      showToast(`Batch ${batch} deleted`)
    }
  }

  return (
    <div className="admin-backdrop">
      <aside className="admin-panel">
        <div className="admin-panel-head">
          <div className="admin-brand">
            <div className="admin-logo"><img src={asset('college-logo.png')} alt="" /></div>
            <span><strong>Admin studio</strong><small>PSMO BCA portal</small></span>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close admin studio"><Icon name="close" /></button>
        </div>

        <div className="admin-user">
          <span className="admin-user-avatar">{currentRole.slice(0, 1)}</span>
          <div>
            <strong>{session.name}</strong>
            <span><i /> {currentRole} · Active</span>
          </div>
        </div>

        <nav className="admin-tabs">
          {tabs.map((tab) => (
            <button
              className={adminTab === tab ? 'admin-tab-active' : ''}
              key={tab}
              onClick={() => setAdminTab(tab)}
            >
              {tab === 'Overview' && <Icon name="grid" size={14} />}
              {tab === 'Events' && <Icon name="spark" size={14} />}
              {tab === 'Department' && <Icon name="building" size={14} />}
              {tab === 'Association' && <Icon name="users" size={14} />}
              {tab === 'Club' && <Icon name="spark" size={14} />}
              {tab === 'Study zone' && <Icon name="book" size={14} />}
              {tab === 'Gallery' && <Icon name="image" size={14} />}
              {tab === 'Students' && <Icon name="users" size={14} />}
              {tab === 'Finance' && <Icon name="shield" size={14} />}
              {tab === 'Admins' && <Icon name="shield" size={14} />}
              {tab === 'Pages' && <Icon name="grid" size={14} />}
              <span>{tab}</span>
              <Icon name="arrow" size={14} />
            </button>
          ))}
        </nav>

        <div className="admin-panel-bottom">
          {isSuper && (
            <button onClick={onResetDefaults} title="Delete all test data from website">
              <Icon name="trash" size={16} /> Delete test data
            </button>
          )}
          <button onClick={onLogout} title="Sign out from portal">
            <Icon name="arrow" size={16} /> Sign out
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <div className="admin-main-header">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />{currentRole} workspace</span>
            <h2>{adminTab === 'Overview' ? `Welcome, ${session.name}` : `${adminTab} Management`}</h2>
          </div>
          <div className="admin-secure">
            <Icon name="shield" size={15} />
            {isSuper ? '★ Full Super Admin Control' : 'Role Authorized'}
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {adminTab === 'Overview' && (
          <div className="admin-overview">
            <div className="admin-stat-grid">
              {isSuper && (
                <>
                  <div><span>Upcoming Events</span><strong>{events.length}</strong><small>Live on dashboard</small></div>
                  <div><span>Faculty Members</span><strong>{facultyList.length}</strong><small>Teaching staff</small></div>
                  <div><span>Active Associations</span><strong>{associationsList.length}</strong><small>Multi-year records</small></div>
                  <div><span>Admin Accounts</span><strong>{adminUsersList.length}</strong><small>Role authorized</small></div>
                </>
              )}
              {currentRole === 'Department' && (
                <>
                  <div><span>Faculty Members</span><strong>{facultyList.length}</strong><small>Teaching staff</small></div>
                  <div><span>Registered Students</span><strong>{studentsList.length}</strong><small>BCA Batches</small></div>
                  <div><span>Active Batches</span><strong>{batches.length}</strong><small>Academic cohorts</small></div>
                </>
              )}
              {currentRole === 'Association' && (
                <>
                  <div><span>Association Tenures</span><strong>{associationsList.length}</strong><small>Year-to-year records</small></div>
                  <div><span>Annual Reports</span><strong>{reportsList.length}</strong><small>Document archive</small></div>
                  <div><span>Active Balance</span><strong>{financeList[0]?.amount || '₹28,500'}</strong><small>Audited statements</small></div>
                </>
              )}
              {currentRole === 'Club' && (
                <>
                  <div><span>Tech Club Events</span><strong>{clubEventsList.length}</strong><small>Workshops & bootcamps</small></div>
                  <div><span>Club Identity</span><strong>{clubInfo.name}</strong><small>Est. {clubInfo.estYear}</small></div>
                </>
              )}
              {currentRole === 'Study zone' && (
                <>
                  <div><span>Syllabus Modules</span><strong>{syllabusList.length}</strong><small>Across semesters</small></div>
                  <div><span>Question Papers</span><strong>{papersList.length}</strong><small>Past university exams</small></div>
                  <div><span>Practice Quizzes</span><strong>{quizList.length}</strong><small>Interactive questions</small></div>
                </>
              )}
              {currentRole === 'Media' && (
                <>
                  <div><span>Gallery Photos</span><strong>{galleryList.length}</strong><small>Campus media moments</small></div>
                  <div><span>Photo Albums</span><strong>3</strong><small>Events, Tech & Campus</small></div>
                </>
              )}
              {currentRole === 'Finance' && (
                <>
                  <div><span>Total Records</span><strong>{financeList.length}</strong><small>Ledger entries</small></div>
                  <div><span>Audited Accounts</span><strong>100%</strong><small>Compliant</small></div>
                </>
              )}
            </div>

            <div className="admin-welcome-card">
              <div>
                <span className="eyebrow light"><span className="eyebrow-line" />Live Portal Controls</span>
                <h3>{isSuper ? 'Superadmin Authority' : `${currentRole} Workspace`}<br /><em>Enabled.</em></h3>
                <p>
                  {isSuper
                    ? 'You have complete control to add, edit, or delete events, faculty, associations, club branding, semester syllabus, past papers, gallery photos, and admin accounts.'
                    : `Manage ${currentRole.toLowerCase()} sections and keep your student community informed.`}
                </p>
              </div>
              <div className="admin-ring">
                <strong>{isSuper ? '100%' : 'Active'}</strong>
                <span>Authority<br />Status</span>
              </div>
            </div>

            <div className="admin-actions">
              <div className="section-heading">
                <h3>Quick Management Links</h3>
                <span>Add new items with one click</span>
              </div>
              <div className="admin-action-grid">
                {isSuper && (
                  <>
                    <button onClick={() => onOpenModal('event', null)}>
                      <Icon name="spark" size={19} />
                      <span><strong>+ New Event</strong><small>Add to dashboard</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                    <button onClick={() => onOpenModal('association', null)}>
                      <Icon name="users" size={19} />
                      <span><strong>+ Association Year</strong><small>Tenure year-to-year</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                    <button onClick={() => onOpenModal('adminUser', null)}>
                      <Icon name="shield" size={19} />
                      <span><strong>+ New Admin</strong><small>Add role account</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                {currentRole === 'Department' && (
                  <>
                    <button onClick={() => onOpenModal('faculty', null)}>
                      <Icon name="building" size={19} />
                      <span><strong>+ Add Faculty</strong><small>New professor or mentor</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                    <button onClick={() => onOpenModal('student', null)}>
                      <Icon name="users" size={19} />
                      <span><strong>+ Add Student</strong><small>New student record</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                {currentRole === 'Association' && (
                  <>
                    <button onClick={() => onOpenModal('association', null)}>
                      <Icon name="users" size={19} />
                      <span><strong>+ Association Year</strong><small>Tenure year-to-year</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                    <button onClick={() => onOpenModal('report', null)}>
                      <Icon name="book" size={19} />
                      <span><strong>+ Add Report</strong><small>Upload tenure report</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                {currentRole === 'Club' && (
                  <>
                    <button onClick={() => onOpenModal('clubEvent', null)}>
                      <Icon name="spark" size={19} />
                      <span><strong>+ Club Event</strong><small>Workshops & bootcamps</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                {currentRole === 'Study zone' && (
                  <>
                    <button onClick={() => onOpenModal('syllabus', null)}>
                      <Icon name="book" size={19} />
                      <span><strong>+ Add Syllabus</strong><small>Course outline by sem</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                    <button onClick={() => onOpenModal('paper', null)}>
                      <Icon name="file" size={19} />
                      <span><strong>+ Add Paper</strong><small>University question paper</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                    <button onClick={() => onOpenModal('quiz', null)}>
                      <Icon name="spark" size={19} />
                      <span><strong>+ Add Quiz</strong><small>Interactive MCQ</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                {currentRole === 'Media' && (
                  <>
                    <button onClick={() => onOpenModal('gallery', null)}>
                      <Icon name="image" size={19} />
                      <span><strong>+ Add Photo</strong><small>Campus & event moment</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                {currentRole === 'Finance' && (
                  <>
                    <button onClick={() => onOpenModal('finance', null)}>
                      <Icon name="shield" size={19} />
                      <span><strong>+ Add Finance Record</strong><small>Income or expenditure</small></span>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {isSuper && (
              <div className="admin-reset-box">
                <div>
                  <strong>Delete All Test Data</strong>
                  <p>Permanently wipe all demo and test records (events, faculty, associations, reports, syllabus, papers, quizzes, gallery, students, finances) from the website so you can start with a clean portal.</p>
                </div>
                <Button variant="outline" onClick={onResetDefaults} icon="trash">Delete all test data</Button>
              </div>
            )}
          </div>
        )}

        {/* EVENTS TAB */}
        {adminTab === 'Events' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="spark" size={19} /> Events Management <span className="admin-count-pill">{events.length}</span></h3>
                <p>Events shown in the "Next up" section on the dashboard.</p>
              </div>
              <Button onClick={() => onOpenModal('event', null)} icon="plus">Add New Event</Button>
            </div>
            <div className="admin-crud-list">
              {events.map((ev) => (
                <div className="admin-item-row" key={ev.id}>
                  <div className="admin-item-main">
                    <span className={`admin-item-badge badge-${ev.color || 'orange'}`}>{ev.date} {ev.month}</span>
                    <div className="admin-item-details">
                      <strong>{ev.title}</strong>
                      <small>{ev.meta} · Tone: {ev.color}</small>
                    </div>
                  </div>
                  <div className="admin-actions-cell">
                    <button className="btn-admin-edit" onClick={() => onOpenModal('event', ev)}><Icon name="edit" size={13} /> Edit</button>
                    <button className="btn-admin-del" onClick={() => onDeleteItem('event', ev.id, ev.title)}><Icon name="trash" size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEPARTMENT / FACULTY TAB */}
        {adminTab === 'Department' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="building" size={19} /> Faculty & Teaching Team <span className="admin-count-pill">{facultyList.length}</span></h3>
                <p>Educators and mentors displayed on the Department page.</p>
              </div>
              <Button onClick={() => onOpenModal('faculty', null)} icon="plus">Add Faculty Member</Button>
            </div>
            <div className="admin-crud-list">
              {facultyList.map((fac) => (
                <div className="admin-item-row" key={fac.id}>
                  <div className="admin-item-main">
                    <img className="admin-item-avatar" src={fac.image} alt={fac.name} />
                    <div className="admin-item-details">
                      <strong>{fac.name}</strong>
                      <small>{fac.role} · {fac.tag}</small>
                    </div>
                  </div>
                  <div className="admin-actions-cell">
                    <button className="btn-admin-edit" onClick={() => onOpenModal('faculty', fac)}><Icon name="edit" size={13} /> Edit</button>
                    <button className="btn-admin-del" onClick={() => onDeleteItem('faculty', fac.id, fac.name)}><Icon name="trash" size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ASSOCIATION TAB - MULTI-YEAR MANAGEMENT & REPORTS */}
        {adminTab === 'Association' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="users" size={19} /> Association Studio</h3>
                <p>Add new associations with year spans (year to year) and manage reports.</p>
              </div>
              {assocSubtab === 'associations' && (
                <Button onClick={() => onOpenModal('association', null)} icon="plus">Add Association (Year to Year)</Button>
              )}
              {assocSubtab === 'reports' && (
                <Button onClick={() => onOpenModal('report', { associationId: associationsList[0]?.id || '', isMagazine: true, type: 'ANNUAL MAGAZINE' })} icon="plus">Add Report / Magazine</Button>
              )}
            </div>

            <div className="admin-subnav">
              <button className={`admin-subnav-btn ${assocSubtab === 'associations' ? 'active' : ''}`} onClick={() => setAssocSubtab('associations')}>
                Tenure Years ({associationsList.length})
              </button>
              <button className={`admin-subnav-btn ${assocSubtab === 'reports' ? 'active' : ''}`} onClick={() => setAssocSubtab('reports')}>
                Reports & Magazines ({reportsList.length})
              </button>
            </div>

            {assocSubtab === 'associations' && (
              <div className="admin-crud-list">
                {associationsList.map((assoc) => (
                  <div className="admin-item-row" key={assoc.id}>
                    <div className="admin-item-main">
                      <span className={`admin-item-badge ${assoc.active ? 'badge-cyan' : 'badge-blue'}`}>
                        {assoc.fromYear}—{assoc.toYear}
                      </span>
                      <div className="admin-item-details">
                        <strong>{assoc.name} {assoc.active ? '(Active Tenure)' : ''}</strong>
                        <small>Secretary: {assoc.secretaryName} · Quote: "{assoc.quote}"</small>
                      </div>
                    </div>
                    <div className="admin-actions-cell">
                      <button className="btn-admin-edit" onClick={() => onOpenModal('association', assoc)}><Icon name="edit" size={13} /> Edit</button>
                      <button className="btn-admin-del" onClick={() => onDeleteItem('association', assoc.id, `${assoc.name} (${assoc.fromYear}–${assoc.toYear})`)}><Icon name="trash" size={13} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {assocSubtab === 'reports' && (
              <div className="admin-crud-list">
                {reportsList.map((rep) => {
                  const linkedAssoc = associationsList.find((a) => a.id === rep.associationId)
                  return (
                    <div className="admin-item-row" key={rep.id}>
                      <div className="admin-item-main">
                        <span className={`admin-item-badge ${rep.isMagazine ? 'badge-violet' : 'badge-orange'}`}>{rep.type}</span>
                        <div className="admin-item-details">
                          <strong>{rep.title}</strong>
                          <small>
                            {linkedAssoc ? `Tenure: ${linkedAssoc.fromYear}–${linkedAssoc.toYear} (${linkedAssoc.secretaryName || 'Secretary'}) · ` : ''}
                            Date: {rep.date} · {rep.isMagazine ? 'Magazine' : 'Report'}
                          </small>
                        </div>
                      </div>
                      <div className="admin-actions-cell">
                        <button className="btn-admin-edit" onClick={() => onOpenModal('report', rep)}><Icon name="edit" size={13} /> Edit</button>
                        <button className="btn-admin-del" onClick={() => onDeleteItem('report', rep.id, rep.title)}><Icon name="trash" size={13} /> Delete</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* CLUB TAB - EDIT CLUB NAME/DESC & CLUB EVENTS */}
        {adminTab === 'Club' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="spark" size={19} /> Club Studio & Branding</h3>
                <p>Club admins can update the club name, tagline, description, and manage calendar events.</p>
              </div>
              <Button onClick={() => onOpenModal('clubEvent', null)} icon="plus">Add Club Event</Button>
            </div>

            {/* Club Name & Description Form */}
            <form onSubmit={handleSaveClubInfo} className="club-editor-card">
              <h4 style={{ margin: '0 0 14px', fontSize: '14px', color: '#38bdf8' }}>Edit Club Identity & Banner</h4>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Club Name</label>
                  <input value={editClubName} onChange={(e) => setEditClubName(e.target.value)} required />
                </div>
                <div className="admin-form-field">
                  <label>Established Year</label>
                  <input value={editClubEst} onChange={(e) => setEditClubEst(e.target.value)} required />
                </div>
              </div>
              <div className="admin-form-row" style={{ marginTop: '12px' }}>
                <div className="admin-form-field">
                  <label>Club Tagline (Header H2)</label>
                  <input value={editClubTagline} onChange={(e) => setEditClubTagline(e.target.value)} required />
                </div>
                <div className="admin-form-field">
                  <label>Club Punchline</label>
                  <input value={editClubDesc} onChange={(e) => setEditClubDesc(e.target.value)} required />
                </div>
              </div>
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" icon="check">Save Club Branding</Button>
              </div>
            </form>

            <h4 style={{ margin: '22px 0 12px', fontSize: '14px', color: '#f8fafc' }}>Club Events & Workshops ({clubEventsList.length})</h4>
            <div className="admin-crud-list">
              {clubEventsList.map((ce) => (
                <div className="admin-item-row" key={ce.id}>
                  <div className="admin-item-main">
                    <span className={`admin-item-badge badge-${ce.color || 'orange'}`}>{ce.number}</span>
                    <div className="admin-item-details">
                      <strong>{ce.title}</strong>
                      <small>{ce.date} · {ce.copy}</small>
                    </div>
                  </div>
                  <div className="admin-actions-cell">
                    <button className="btn-admin-edit" onClick={() => onOpenModal('clubEvent', ce)}><Icon name="edit" size={13} /> Edit</button>
                    <button className="btn-admin-del" onClick={() => onDeleteItem('clubEvent', ce.id, ce.title)}><Icon name="trash" size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDY ZONE TAB - SUBJECTS, SYLLABUS, PAPERS, QUIZZES */}
        {adminTab === 'Study zone' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="book" size={19} /> Study Zone Academic Resources</h3>
                <p>Study zone admins can manage semester subjects, syllabus by semester, past papers, and quizzes.</p>
              </div>
              {studySubtab === 'subjects' && <Button onClick={() => onOpenModal('subject', null)} icon="plus">Add Subject</Button>}
              {studySubtab === 'syllabus' && <Button onClick={() => onOpenModal('syllabus', null)} icon="plus">Add Syllabus Entry</Button>}
              {studySubtab === 'papers' && <Button onClick={() => onOpenModal('paper', null)} icon="plus">Add Past Paper</Button>}
              {studySubtab === 'quizzes' && <Button onClick={() => onOpenModal('quiz', null)} icon="plus">Add Quiz Question</Button>}
            </div>

            <div className="admin-subnav">
              <button className={`admin-subnav-btn ${studySubtab === 'subjects' ? 'active' : ''}`} onClick={() => setStudySubtab('subjects')}>
                Subjects by Sem ({subjectsList.length})
              </button>
              <button className={`admin-subnav-btn ${studySubtab === 'syllabus' ? 'active' : ''}`} onClick={() => setStudySubtab('syllabus')}>
                Syllabus by Sem ({syllabusList.length})
              </button>
              <button className={`admin-subnav-btn ${studySubtab === 'papers' ? 'active' : ''}`} onClick={() => setStudySubtab('papers')}>
                Past Question Papers ({papersList.length})
              </button>
              <button className={`admin-subnav-btn ${studySubtab === 'quizzes' ? 'active' : ''}`} onClick={() => setStudySubtab('quizzes')}>
                Practice Questions ({quizList.length})
              </button>
            </div>

            {studySubtab === 'subjects' && (
              <div className="admin-crud-list">
                {subjectsList.length > 0 ? (
                  subjectsList.map((sub) => (
                    <div className="admin-item-row" key={sub.id}>
                      <div className="admin-item-main">
                        <span className={`admin-item-badge badge-${sub.tone || 'orange'}`}>{sub.code}</span>
                        <div className="admin-item-details">
                          <strong>{sub.title}</strong>
                          <small>{sub.semester || 'Sem 1'} · Color tone: {sub.tone}</small>
                        </div>
                      </div>
                      <div className="admin-actions-cell">
                        <button className="btn-admin-edit" onClick={() => onOpenModal('subject', sub)}><Icon name="edit" size={13} /> Edit</button>
                        <button className="btn-admin-del" onClick={() => onDeleteItem('subject', sub.id, sub.code)}><Icon name="trash" size={13} /> Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ margin: 0, fontSize: '13px' }}>No subjects added yet. Click &quot;Add Subject&quot; above to create one.</p>
                  </div>
                )}
              </div>
            )}

            {studySubtab === 'syllabus' && (
              <div className="admin-crud-list">
                {syllabusList.length > 0 ? (
                  syllabusList.map((syl) => (
                    <div className="admin-item-row" key={syl.id}>
                      <div className="admin-item-main">
                        <span className="admin-item-badge badge-cyan">{syl.subjectCode} · {syl.semester}</span>
                        <div className="admin-item-details">
                          <strong>{syl.subjectTitle}</strong>
                          <small>{syl.credits} · {syl.modules?.length || 0} Modules defined</small>
                        </div>
                      </div>
                      <div className="admin-actions-cell">
                        <button className="btn-admin-edit" onClick={() => onOpenModal('syllabus', syl)}><Icon name="edit" size={13} /> Edit</button>
                        <button className="btn-admin-del" onClick={() => onDeleteItem('syllabus', syl.id, `${syl.subjectCode} Syllabus`)}><Icon name="trash" size={13} /> Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ margin: 0, fontSize: '13px' }}>No syllabus entries uploaded yet.</p>
                  </div>
                )}
              </div>
            )}

            {studySubtab === 'papers' && (
              <div className="admin-crud-list">
                {papersList.length > 0 ? (
                  papersList.map((pap) => (
                    <div className="admin-item-row" key={pap.id}>
                      <div className="admin-item-main">
                        <span className="admin-item-badge badge-blue">PDF {pap.year}</span>
                        <div className="admin-item-details">
                          <strong>{pap.subject} · {pap.semester || 'Sem 1'}</strong>
                          <small>Question paper year: {pap.year}</small>
                        </div>
                      </div>
                      <div className="admin-actions-cell">
                        <button className="btn-admin-edit" onClick={() => onOpenModal('paper', pap)}><Icon name="edit" size={13} /> Edit</button>
                        <button className="btn-admin-del" onClick={() => onDeleteItem('paper', pap.id, `${pap.subject} ${pap.year}`)}><Icon name="trash" size={13} /> Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ margin: 0, fontSize: '13px' }}>No past question papers uploaded yet.</p>
                  </div>
                )}
              </div>
            )}

            {studySubtab === 'quizzes' && (
              <div className="admin-crud-list">
                {quizList.length > 0 ? (
                  quizList.map((q, idx) => (
                    <div className="admin-item-row" key={q.id || idx}>
                      <div className="admin-item-main">
                        <span className="admin-item-badge badge-green">{q.subject || 'Subject'} · {q.semester || 'Sem 1'}</span>
                        <div className="admin-item-details">
                          <strong>Q{idx + 1}: {q.text}</strong>
                          <small>Subject: {q.subject || 'Subject'} ({q.semester || 'Sem 1'}) · Answer: {q.answer}</small>
                        </div>
                      </div>
                      <div className="admin-actions-cell">
                        <button className="btn-admin-edit" onClick={() => onOpenModal('quiz', q)}><Icon name="edit" size={13} /> Edit</button>
                        <button className="btn-admin-del" onClick={() => onDeleteItem('quiz', q.id, q.text)}><Icon name="trash" size={13} /> Delete</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ margin: 0, fontSize: '13px' }}>No practice quiz questions added yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* GALLERY TAB */}
        {adminTab === 'Gallery' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="image" size={19} /> Gallery Moments <span className="admin-count-pill">{galleryList.length}</span></h3>
                <p>Photos and moments displayed in the living campus archive.</p>
              </div>
              <Button onClick={() => onOpenModal('gallery', null)} icon="plus">Add Gallery Photo</Button>
            </div>
            <div className="admin-crud-list">
              {galleryList.map((gal) => (
                <div className="admin-item-row" key={gal.id}>
                  <div className="admin-item-main">
                    <img
                      className="admin-item-avatar"
                      src={gal.image.startsWith('http') ? gal.image : asset(gal.image)}
                      alt={gal.title}
                    />
                    <div className="admin-item-details">
                      <strong>{gal.title}</strong>
                      <small>Category: {gal.type} · Source: {gal.image}</small>
                    </div>
                  </div>
                  <div className="admin-actions-cell">
                    <button className="btn-admin-edit" onClick={() => onOpenModal('gallery', gal)}><Icon name="edit" size={13} /> Edit</button>
                    <button className="btn-admin-del" onClick={() => onDeleteItem('gallery', gal.id, gal.title)}><Icon name="trash" size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS & BATCHES TAB */}
        {adminTab === 'Students' && (
          <StudentManager
            batches={batches}
            newBatch={newBatch}
            setNewBatch={setNewBatch}
            addBatch={addBatch}
            removeBatch={removeBatch}
            showToast={showToast}
            studentsList={studentsList}
            onOpenAddStudent={() => onOpenModal('student', null)}
            onEditStudent={(stu) => onOpenModal('student', stu)}
            onDeleteStudent={(id, name) => onDeleteItem('student', id, name)}
          />
        )}

        {/* FINANCE TAB - REQUIREMENT: ASSOCIATION ADMIN CAN VIEW BUT NOT ADD OR EDIT */}
        {adminTab === 'Finance' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="shield" size={19} /> Association Finance Records <span className="admin-count-pill">{financeList.length}</span></h3>
                <p>Audited balances, sponsorships, grants, and operational expenditures.</p>
              </div>
              {!isAssocAdmin && (
                <Button onClick={() => onOpenModal('finance', null)} icon="plus">Add Finance Record</Button>
              )}
            </div>

            {isAssocAdmin && (
              <div className="readonly-notice">
                <Icon name="shield" size={16} />
                <span><strong>Read-Only Access for Association Admins:</strong> You have authorization to view all statements and balances. Adding, editing, and deleting records is restricted to Finance & Super admins.</span>
              </div>
            )}

            {/* KPI STAT CARDS: TOTAL INCOME, TOTAL EXPENSE, BALANCE */}
            <FinanceSummaryCards financeList={financeList} />

            <div className="admin-crud-list">
              {financeList.map((fin) => (
                <div className="admin-item-row" key={fin.id}>
                  <div className="admin-item-main">
                    <span className={`admin-item-badge ${fin.category === 'Income' ? 'badge-green' : fin.category === 'Expense' ? 'badge-orange' : 'badge-blue'}`}>
                      {fin.category}
                    </span>
                    <div className="admin-item-details">
                      <strong>{fin.title}</strong>
                      <small>Amount: {fin.amount} · Date: {fin.date} · Status: {fin.status}</small>
                    </div>
                  </div>
                  {!isAssocAdmin && (
                    <div className="admin-actions-cell">
                      <button className="btn-admin-edit" onClick={() => onOpenModal('finance', fin)}><Icon name="edit" size={13} /> Edit</button>
                      <button className="btn-admin-del" onClick={() => onDeleteItem('finance', fin.id, fin.title)}><Icon name="trash" size={13} /> Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGES VISIBILITY TAB */}
        {adminTab === 'Pages' && (
          <AdminPages visiblePages={visiblePages} togglePage={togglePage} showToast={showToast} />
        )}

        {/* ADMINS MANAGEMENT TAB (SUPER ADMIN ONLY) */}
        {isSuper && adminTab === 'Admins' && (
          <div className="admin-crud-card">
            <div className="admin-crud-header">
              <div>
                <h3><Icon name="shield" size={19} /> Admin Role & Access Control <span className="admin-count-pill">{adminUsersList.length}</span></h3>
                <p>Super admin console: manage all department admin accounts, assign scoped roles, change passwords, and revoke access.</p>
              </div>
              <Button onClick={() => onOpenModal('adminUser', null)} icon="plus">Add New Admin</Button>
            </div>

            <div className="admin-roles-summary-box">
              <div className="admin-roles-summary-head">
                <Icon name="shield" size={16} />
                <strong>Role Authority Matrix (Scoped Permissions)</strong>
              </div>
              <div className="admin-roles-grid">
                {Object.entries(rolePermissions).map(([roleKey, roleVal]) => (
                  <div key={roleKey} className={`admin-role-badge-card ${roleKey === 'Super admin' ? 'role-card-super' : ''}`}>
                    <div className="role-card-top">
                      <span className="role-card-name">{roleKey}</span>
                      <span className="role-card-scope">{roleVal.allowedTabs.join(', ')}</span>
                    </div>
                    <small>{roleVal.description}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-crud-list">
              {adminUsersList.map((usr) => {
                const isSuperAcc = usr.role === 'Super admin'
                const isCurrent = usr.email === session.email
                return (
                  <div className="admin-item-row" key={usr.id || usr.email}>
                    <div className="admin-item-main">
                      <span className={`admin-item-badge ${isSuperAcc ? 'badge-orange' : 'badge-blue'}`}>
                        {usr.role}
                      </span>
                      <div className="admin-item-details">
                        <strong>{usr.name || usr.email}</strong>
                        <small>{usr.email} · Role: <strong>{usr.role}</strong> {isCurrent ? ' (Current Session)' : ''}</small>
                      </div>
                    </div>
                    <div className="admin-actions-cell">
                      <button className="btn-admin-edit" onClick={() => onOpenModal('adminUser', usr)}>
                        <Icon name="edit" size={13} /> Edit
                      </button>
                      {!isCurrent && (
                        <button className="btn-admin-del" onClick={() => onDeleteItem('adminUser', usr.id || usr.email, usr.name || usr.email)}>
                          <Icon name="trash" size={13} /> Revoke
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
