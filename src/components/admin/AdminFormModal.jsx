import { useState } from 'react'
import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { ImageKitUploader } from '../common/ImageKitUploader'

export function AdminFormModal({
  type,
  initialItem,
  onClose,
  onSave,
  batches,
  subjectsList,
  semester: defaultSem = 'Sem 1',
}) {
  const isEdit = Boolean(initialItem && initialItem.id)
  const [formData, setFormData] = useState(() => {
    if (initialItem) return { ...initialItem }
    if (type === 'event') return { title: '', date: '15', month: 'JUL', meta: 'Department · 10:00 AM', color: 'orange' }
    if (type === 'faculty') return { name: '', role: 'Assistant Professor', tag: 'MCA · Data Science', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=85' }
    if (type === 'association') return {
      fromYear: '2027',
      toYear: '2028',
      name: 'Third BCA Association',
      secretaryName: '',
      secretaryRole: 'Secretary · 2027—28',
      secretaryPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=560&q=85',
      quote: 'Innovate together, inspire forever.',
      description: 'Continuing the legacy of student-led innovation and tech exploration.',
      active: true,
    }
    if (type === 'report') return { title: '', type: 'EVENT REPORT', date: '12.07.2026', isMagazine: false, fileUrl: '' }
    if (type === 'clubEvent') return { number: '04', title: '', date: '20 Jul · 11:00 AM', copy: '', color: 'orange', image: '' }
    if (type === 'subject') return { code: '', title: '', tone: 'cyan', semester: defaultSem }
    if (type === 'syllabus') {
      const sem = initialItem?.semester || defaultSem
      const semSubs = subjectsList?.filter((s) => (s.semester || 'Sem 1') === sem) || []
      const matched = semSubs.find((s) => s.code === initialItem?.subjectCode) || semSubs[0] || subjectsList?.[0]
      return {
        subjectCode: initialItem?.subjectCode || matched?.code || 'MFC',
        subjectTitle: initialItem?.subjectTitle || matched?.title || 'Mathematical Foundations of Computing',
        semester: sem,
        credits: initialItem?.credits || '4 Credits · 60 Hours',
        regulation: initialItem?.regulation || 'PSMO Autonomous / Calicut University 2026',
        fileUrl: initialItem?.fileUrl || '',
        modules: initialItem?.modules || [
          { unit: 'Unit 1: Fundamentals', desc: 'Core foundational principles and mathematical structures.' },
          { unit: 'Unit 2: Applied Techniques', desc: 'Methodologies, algorithms, and practical implementations.' },
          { unit: 'Unit 3: Advanced Concepts', desc: 'System design, optimization, and complex analysis.' },
          { unit: 'Unit 4: Case Studies & Lab', desc: 'Hands-on laboratory work and project exercises.' },
        ],
      }
    }
    if (type === 'paper') return { subject: subjectsList?.[0]?.code || 'MFC', semester: defaultSem, year: '2026', fileUrl: '' }
    if (type === 'quiz') return { text: '', options: ['', '', '', ''], answer: '', subject: subjectsList?.[0]?.code || 'MFC', semester: defaultSem }
    if (type === 'gallery') return { title: '', type: 'Campus', image: 'college-photo.jpg' }
    if (type === 'student') return { rollNo: 'BC05', name: '', admissionNo: 'ADM-2620', registerNo: 'PSM-26120', email: '', batch: batches?.[0] || '2025–2029', semester: defaultSem }
    if (type === 'finance') return { title: '', category: 'Income', amount: '₹10,000', date: '15.06.2026', status: 'Completed', receiptUrl: '' }
    return {}
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleModuleChange = (index, field, value) => {
    const mods = [...(formData.modules || [])]
    if (!mods[index]) mods[index] = {}
    mods[index][field] = value
    setFormData((prev) => ({ ...prev, modules: mods }))
  }

  const handleAddOpenEndedModule = () => {
    const existing = formData.modules || []
    const hasOpenEnded = existing.some((m) => m.isOpenEnded || m.unit?.toLowerCase().includes('open ended'))
    if (hasOpenEnded) {
      alert('An Open Ended Module is already present at the end of this syllabus.')
      return
    }
    const newMod = {
      unit: 'Open Ended Module: Self-Learning & Emerging Trends',
      desc: 'Exploratory mini-project, case study, or research analysis on emerging industry technologies.',
      isOpenEnded: true,
    }
    setFormData((prev) => ({
      ...prev,
      modules: [...(prev.modules || []), newMod],
    }))
  }

  const handleAddModule = () => {
    const existing = formData.modules || []
    const newIdx = existing.length + 1
    const newMod = {
      unit: `Unit ${newIdx}: Advanced Topics`,
      desc: 'Core methodologies, algorithms, and practical implementations.',
      isOpenEnded: false,
    }
    setFormData((prev) => ({
      ...prev,
      modules: [...existing, newMod],
    }))
  }

  const handleRemoveModule = (index) => {
    const existing = [...(formData.modules || [])]
    existing.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      modules: existing,
    }))
  }

  const handleOptionChange = (index, value) => {
    const opts = [...(formData.options || ['', '', '', ''])]
    opts[index] = value
    setFormData((prev) => ({ ...prev, options: opts }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />Admin Studio</span>
            <h2>{isEdit ? 'Edit' : 'Add New'} {type === 'association' ? 'Association Year' : type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-grid">
          {/* EVENT FORM */}
          {type === 'event' && (
            <>
              <div className="admin-form-field">
                <label>Event Title</label>
                <input required value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Hackathon 2026" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Date (Day)</label>
                  <input required value={formData.date} onChange={(e) => handleChange('date', e.target.value)} placeholder="e.g. 15" />
                </div>
                <div className="admin-form-field">
                  <label>Month</label>
                  <input required value={formData.month} onChange={(e) => handleChange('month', e.target.value.toUpperCase())} placeholder="e.g. JUL" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Meta Details</label>
                  <input required value={formData.meta} onChange={(e) => handleChange('meta', e.target.value)} placeholder="e.g. Department · 10:00 AM" />
                </div>
                <div className="admin-form-field">
                  <label>Theme Color</label>
                  <select value={formData.color} onChange={(e) => handleChange('color', e.target.value)}>
                    <option value="orange">Neon Cyan / Turquoise</option>
                    <option value="violet">Sky Blue / Violet</option>
                    <option value="blue">Deep Cyan Blue</option>
                    <option value="green">Emerald Green</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ASSOCIATION FORM (YEAR FROM YEAR TO YEAR) */}
          {type === 'association' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>From Year</label>
                  <input required value={formData.fromYear} onChange={(e) => handleChange('fromYear', e.target.value)} placeholder="e.g. 2026" />
                </div>
                <div className="admin-form-field">
                  <label>To Year</label>
                  <input required value={formData.toYear} onChange={(e) => handleChange('toYear', e.target.value)} placeholder="e.g. 2027" />
                </div>
              </div>
              <div className="admin-form-field">
                <label>Association Title / Edition</label>
                <input required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Second BCA Association" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Secretary Name</label>
                  <input required value={formData.secretaryName} onChange={(e) => handleChange('secretaryName', e.target.value)} placeholder="e.g. Aisha Rahman" />
                </div>
                <div className="admin-form-field">
                  <label>Secretary Role / Tenure Tag</label>
                  <input required value={formData.secretaryRole} onChange={(e) => handleChange('secretaryRole', e.target.value)} placeholder="Secretary · 2026—27" />
                </div>
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Secretary Photo"
                  folder="/bca_portal/associations"
                  value={formData.secretaryPhoto}
                  onChange={(url) => handleChange('secretaryPhoto', url)}
                  placeholder="https://ik.imagekit.io/... or upload photo"
                />
              </div>
              <div className="admin-form-field">
                <label>Association Motto / Quote</label>
                <input required value={formData.quote} onChange={(e) => handleChange('quote', e.target.value)} placeholder="e.g. We make room for everyone." />
              </div>
              <div className="admin-form-field">
                <label>Description / Message</label>
                <textarea required value={formData.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Association desk description..." />
              </div>
              <div className="admin-form-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="activeAssoc" checked={Boolean(formData.active)} onChange={(e) => handleChange('active', e.target.checked)} />
                <label htmlFor="activeAssoc" style={{ margin: 0, cursor: 'pointer' }}>Set as Current Active Association</label>
              </div>
            </>
          )}

          {/* FACULTY FORM */}
          {type === 'faculty' && (
            <>
              <div className="admin-form-field">
                <label>Full Name & Title</label>
                <input required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Dr. Jane Doe" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Designation / Role</label>
                  <input required value={formData.role} onChange={(e) => handleChange('role', e.target.value)} placeholder="e.g. Assistant Professor" />
                </div>
                <div className="admin-form-field">
                  <label>Specialization / Degree</label>
                  <input required value={formData.tag} onChange={(e) => handleChange('tag', e.target.value)} placeholder="e.g. PhD · Cloud Computing" />
                </div>
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Faculty Portrait Photo"
                  folder="/bca_portal/faculty"
                  value={formData.image}
                  onChange={(url) => handleChange('image', url)}
                  placeholder="https://ik.imagekit.io/... or upload photo"
                />
              </div>
            </>
          )}

          {/* SYLLABUS FORM (SEMESTER BY SEMESTER & SUBJECT DROPDOWN) */}
          {type === 'syllabus' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => {
                      const newSem = e.target.value
                      const available = subjectsList?.filter((s) => (s.semester || 'Sem 1') === newSem) || []
                      const firstSub = available[0]
                      setFormData((prev) => ({
                        ...prev,
                        semester: newSem,
                        subjectCode: firstSub ? firstSub.code : prev.subjectCode,
                        subjectTitle: firstSub ? firstSub.title : prev.subjectTitle,
                      }))
                    }}
                  >
                    {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
                  </select>
                </div>

                <div className="admin-form-field">
                  <label>Subject Code (from added subjects)</label>
                  <select
                    value={formData.subjectCode}
                    onChange={(e) => {
                      const selCode = e.target.value
                      const found = subjectsList?.find((s) => s.code === selCode)
                      setFormData((prev) => ({
                        ...prev,
                        subjectCode: selCode,
                        subjectTitle: found ? found.title : prev.subjectTitle,
                      }))
                    }}
                  >
                    {subjectsList && subjectsList.filter((s) => (s.semester || 'Sem 1') === formData.semester).length > 0 ? (
                      subjectsList
                        .filter((s) => (s.semester || 'Sem 1') === formData.semester)
                        .map((s) => (
                          <option key={s.id || s.code} value={s.code}>
                            {s.code} - {s.title}
                          </option>
                        ))
                    ) : (
                      subjectsList?.map((s) => (
                        <option key={s.id || s.code} value={s.code}>
                          {s.code} - {s.title} ({s.semester})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div className="admin-form-field">
                <label>Course Title</label>
                <input
                  required
                  value={formData.subjectTitle}
                  onChange={(e) => handleChange('subjectTitle', e.target.value)}
                  placeholder="e.g. Mathematical Foundations of Computing"
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Credits & Hours</label>
                  <input required value={formData.credits} onChange={(e) => handleChange('credits', e.target.value)} placeholder="e.g. 4 Credits · 60 Hours" />
                </div>
                <div className="admin-form-field">
                  <label>University / Regulation</label>
                  <input required value={formData.regulation} onChange={(e) => handleChange('regulation', e.target.value)} placeholder="e.g. PSMO Autonomous 2026" />
                </div>
              </div>

              <div className="admin-form-field">
                <ImageKitUploader
                  label="Official Syllabus PDF Document (Optional)"
                  folder="/bca_portal/syllabus"
                  accept=".pdf"
                  value={formData.fileUrl}
                  onChange={(url) => handleChange('fileUrl', url)}
                  placeholder="https://ik.imagekit.io/... or upload syllabus PDF"
                />
              </div>

              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <label style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600, margin: 0 }}>
                    Module / Unit Outlines ({formData.modules?.length || 0})
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handleAddModule}
                      className="btn-admin-edit"
                      style={{ padding: '4px 9px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Icon name="plus" size={12} /> Add Unit
                    </button>
                    <button
                      type="button"
                      onClick={handleAddOpenEndedModule}
                      className="btn-admin-edit"
                      style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', borderColor: '#06b6d4', color: '#38bdf8', background: 'rgba(6,182,212,0.12)' }}
                    >
                      <Icon name="spark" size={12} /> + Add Open Ended Module
                    </button>
                  </div>
                </div>

                {formData.modules?.map((mod, idx) => {
                  const isOpenEnded = Boolean(mod.isOpenEnded || mod.unit?.toLowerCase().includes('open ended'))
                  return (
                    <div
                      key={idx}
                      style={{
                        marginBottom: '10px',
                        background: isOpenEnded ? 'linear-gradient(145deg, rgba(6,182,212,0.08) 0%, #0b1329 100%)' : '#0b1329',
                        padding: '12px',
                        borderRadius: '6px',
                        border: isOpenEnded ? '1px solid #06b6d4' : '1px solid #1e3a5f',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: isOpenEnded ? '#38bdf8' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {isOpenEnded && <Icon name="spark" size={13} />}
                          {isOpenEnded ? 'Open Ended Module (Self-Learning / Project)' : `Unit ${idx + 1}`}
                        </span>
                        {formData.modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(idx)}
                            style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}
                          >
                            <Icon name="trash" size={12} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="admin-form-field" style={{ marginBottom: '6px' }}>
                        <label>Unit / Module Heading</label>
                        <input
                          required
                          value={mod.unit || ''}
                          onChange={(e) => handleModuleChange(idx, 'unit', e.target.value)}
                          placeholder="e.g. Unit 1: Fundamentals or Open Ended Module: ..."
                        />
                      </div>
                      <div className="admin-form-field">
                        <label>Topics Covered / Details</label>
                        <input
                          required
                          value={mod.desc || ''}
                          onChange={(e) => handleModuleChange(idx, 'desc', e.target.value)}
                          placeholder="Module topics breakdown..."
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* SUBJECT FORM (WITH SEMESTER CORRESPONDENCE) */}
          {type === 'subject' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Target Semester</label>
                  <select value={formData.semester} onChange={(e) => handleChange('semester', e.target.value)}>
                    {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Subject Code</label>
                  <input required value={formData.code} onChange={(e) => handleChange('code', e.target.value.toUpperCase())} placeholder="e.g. OS" />
                </div>
              </div>
              <div className="admin-form-field">
                <label>Full Subject Title</label>
                <input required value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Operating Systems & Shell" />
              </div>
              <div className="admin-form-field">
                <label>Color Tone</label>
                <select value={formData.tone} onChange={(e) => handleChange('tone', e.target.value)}>
                  <option value="cyan">Electric Cyan</option>
                  <option value="blue">Sky Blue</option>
                  <option value="violet">Violet</option>
                  <option value="orange">Amber Coral</option>
                  <option value="green">Emerald Green</option>
                  <option value="pink">Pink</option>
                  <option value="indigo">Indigo</option>
                </select>
              </div>
            </>
          )}

          {/* REPORT FORM */}
          {type === 'report' && (
            <>
              <div className="admin-form-field">
                <label>Document Title</label>
                <input required value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Annual Symposium Report 2026" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Publication Type</label>
                  <select value={formData.type} onChange={(e) => handleChange('type', e.target.value)}>
                    <option value="EVENT REPORT">EVENT REPORT</option>
                    <option value="ANNUAL MAGAZINE">ANNUAL MAGAZINE</option>
                    <option value="NEWSLETTER">NEWSLETTER</option>
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Publication Date</label>
                  <input required value={formData.date} onChange={(e) => handleChange('date', e.target.value)} placeholder="DD.MM.YYYY" />
                </div>
              </div>
              <div className="admin-form-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="magCheck" checked={Boolean(formData.isMagazine)} onChange={(e) => handleChange('isMagazine', e.target.checked)} />
                <label htmlFor="magCheck" style={{ margin: 0, cursor: 'pointer' }}>Mark as Annual Magazine / Journal</label>
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Report / Magazine Document (PDF or Image)"
                  folder="/bca_portal/reports"
                  accept=".pdf,image/*"
                  value={formData.fileUrl}
                  onChange={(url) => handleChange('fileUrl', url)}
                  placeholder="https://ik.imagekit.io/... or upload document"
                />
              </div>
            </>
          )}

          {/* CLUB EVENT FORM */}
          {type === 'clubEvent' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Event Number</label>
                  <input required value={formData.number} onChange={(e) => handleChange('number', e.target.value)} placeholder="04" />
                </div>
                <div className="admin-form-field">
                  <label>Accent Color</label>
                  <select value={formData.color} onChange={(e) => handleChange('color', e.target.value)}>
                    <option value="orange">Electric Cyan</option>
                    <option value="violet">Violet</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-field">
                <label>Event Name</label>
                <input required value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Web3 Build Jam" />
              </div>
              <div className="admin-form-field">
                <label>Date & Location</label>
                <input required value={formData.date} onChange={(e) => handleChange('date', e.target.value)} placeholder="e.g. 24 Jul · 2:00 PM" />
              </div>
              <div className="admin-form-field">
                <label>Description / Copy</label>
                <textarea required value={formData.copy} onChange={(e) => handleChange('copy', e.target.value)} placeholder="Short event description..." />
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Event Poster / Graphic (Optional)"
                  folder="/bca_portal/clubs"
                  value={formData.image}
                  onChange={(url) => handleChange('image', url)}
                  placeholder="https://ik.imagekit.io/... or upload poster"
                />
              </div>
            </>
          )}

          {/* PAST PAPER FORM */}
          {type === 'paper' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Subject Code</label>
                  <select value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)}>
                    {subjectsList?.map((s) => <option key={s.id || s.code} value={s.code}>{s.code} - {s.title}</option>)}
                    <option value="Common">Common</option>
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Semester</label>
                  <select value={formData.semester} onChange={(e) => handleChange('semester', e.target.value)}>
                    {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-field">
                <label>Exam Year</label>
                <input required value={formData.year} onChange={(e) => handleChange('year', e.target.value)} placeholder="e.g. 2026" />
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Question Paper PDF Document"
                  folder="/bca_portal/question_papers"
                  accept=".pdf"
                  value={formData.fileUrl}
                  onChange={(url) => handleChange('fileUrl', url)}
                  placeholder="https://ik.imagekit.io/... or upload question paper PDF"
                />
              </div>
            </>
          )}

          {/* QUIZ QUESTION FORM */}
          {type === 'quiz' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Subject Code</label>
                  <select value={formData.subject || subjectsList?.[0]?.code || 'MFC'} onChange={(e) => handleChange('subject', e.target.value)}>
                    {subjectsList?.map((s) => <option key={s.id || s.code} value={s.code}>{s.code} - {s.title} ({s.semester})</option>)}
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Target Semester</label>
                  <select value={formData.semester || defaultSem} onChange={(e) => handleChange('semester', e.target.value)}>
                    {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-field">
                <label>Question Text</label>
                <textarea required value={formData.text} onChange={(e) => handleChange('text', e.target.value)} placeholder="e.g. Which algorithm is used for shortest path search?" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Option A</label>
                  <input required value={formData.options?.[0] || ''} onChange={(e) => handleOptionChange(0, e.target.value)} placeholder="Option A" />
                </div>
                <div className="admin-form-field">
                  <label>Option B</label>
                  <input required value={formData.options?.[1] || ''} onChange={(e) => handleOptionChange(1, e.target.value)} placeholder="Option B" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Option C</label>
                  <input required value={formData.options?.[2] || ''} onChange={(e) => handleOptionChange(2, e.target.value)} placeholder="Option C" />
                </div>
                <div className="admin-form-field">
                  <label>Option D</label>
                  <input required value={formData.options?.[3] || ''} onChange={(e) => handleOptionChange(3, e.target.value)} placeholder="Option D" />
                </div>
              </div>
              <div className="admin-form-field">
                <label>Exact Correct Answer</label>
                <input required value={formData.answer} onChange={(e) => handleChange('answer', e.target.value)} placeholder="Must match one of the options above" />
              </div>
            </>
          )}

          {/* GALLERY FORM */}
          {type === 'gallery' && (
            <>
              <div className="admin-form-field">
                <label>Photo Caption / Title</label>
                <input required value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Coding Marathon in Lab 1" />
              </div>
              <div className="admin-form-field">
                <label>Category</label>
                <select value={formData.type} onChange={(e) => handleChange('type', e.target.value)}>
                  <option value="Campus">Campus</option>
                  <option value="Events">Events</option>
                  <option value="Identity">Identity</option>
                </select>
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Gallery Photo / Media"
                  folder="/bca_portal/gallery"
                  value={formData.image}
                  onChange={(url) => handleChange('image', url)}
                  placeholder="https://ik.imagekit.io/... or upload photo"
                />
              </div>
            </>
          )}

          {/* STUDENT FORM */}
          {type === 'student' && (
            <>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Roll Number</label>
                  <input required value={formData.rollNo} onChange={(e) => handleChange('rollNo', e.target.value)} placeholder="e.g. BC05" />
                </div>
                <div className="admin-form-field">
                  <label>Student Name</label>
                  <input required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Rohan Nair" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Admission No.</label>
                  <input required value={formData.admissionNo} onChange={(e) => handleChange('admissionNo', e.target.value)} placeholder="e.g. ADM-2621" />
                </div>
                <div className="admin-form-field">
                  <label>Register No.</label>
                  <input required value={formData.registerNo} onChange={(e) => handleChange('registerNo', e.target.value)} placeholder="e.g. PSM-26121" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Batch Year</label>
                  <select value={formData.batch} onChange={(e) => handleChange('batch', e.target.value)}>
                    {batches?.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Semester</label>
                  <select value={formData.semester} onChange={(e) => handleChange('semester', e.target.value)}>
                    {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-field">
                <label>Email Address</label>
                <input type="email" value={formData.email || ''} onChange={(e) => handleChange('email', e.target.value)} placeholder="student@psmo.edu.in" />
              </div>
            </>
          )}

          {/* FINANCE FORM */}
          {type === 'finance' && (
            <>
              <div className="admin-form-field">
                <label>Transaction Title</label>
                <input required value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Cloud Hosting Sponsorship" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Category</label>
                  <select value={formData.category} onChange={(e) => handleChange('category', e.target.value)}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Grant">Grant</option>
                  </select>
                </div>
                <div className="admin-form-field">
                  <label>Amount (₹)</label>
                  <input required value={formData.amount} onChange={(e) => handleChange('amount', e.target.value)} placeholder="e.g. ₹25,000" />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label>Date</label>
                  <input required value={formData.date} onChange={(e) => handleChange('date', e.target.value)} placeholder="DD.MM.YYYY" />
                </div>
                <div className="admin-form-field">
                  <label>Status</label>
                  <select value={formData.status} onChange={(e) => handleChange('status', e.target.value)}>
                    <option value="Completed">Completed</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="admin-form-field">
                <ImageKitUploader
                  label="Receipt / Bill / Voucher Attachment (Image or PDF)"
                  folder="/bca_portal/finance"
                  accept="image/*,.pdf"
                  value={formData.receiptUrl}
                  onChange={(url) => handleChange('receiptUrl', url)}
                  placeholder="https://ik.imagekit.io/... or upload voucher"
                />
              </div>
            </>
          )}

          <div className="admin-form-actions">
            <button type="button" className="btn-admin-del" onClick={onClose}>Cancel</button>
            <Button type="submit" icon="check">{isEdit ? 'Save Changes' : 'Create Item'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
