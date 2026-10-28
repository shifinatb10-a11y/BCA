import { useEffect, useMemo } from 'react'
import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'
import { QuizModal } from '../modals/QuizModal'

export function PaperRow({ subject, year, semester = 'Sem 1' }) {
  return (
    <article className="paper-row">
      <span className="pdf-badge">PDF</span>
      <div>
        <strong>{subject} · {semester}</strong>
        <small>Previous year question paper · {year}</small>
      </div>
      <button className="download-button" aria-label={`Download ${subject} paper`}><Icon name="download" size={16} /></button>
    </article>
  )
}

export function StudyZone({
  subjectsList,
  selectedSubject,
  setSelectedSubject,
  semester,
  setSemester,
  papersList,
  syllabusList = [],
  quizList,
  quizStarted,
  setQuizStarted,
  quizSubmitted,
  setQuizSubmitted,
  quizAnswers,
  setQuizAnswers,
  canManageStudy,
  onOpenAddSubject,
  onOpenAddSyllabus,
  onEditSyllabus,
  onDeleteSyllabus,
  onOpenAddPaper,
  onOpenAddQuiz,
}) {
  // Filter subjects strictly by the selected semester
  const semesterSubjects = useMemo(() => {
    return subjectsList.filter((s) => (s.semester || 'Sem 1') === semester)
  }, [subjectsList, semester])

  // Automatically sync selectedSubject when semester changes or if current selectedSubject is not in semesterSubjects
  useEffect(() => {
    if (semesterSubjects.length > 0) {
      const exists = semesterSubjects.some((s) => s.code === selectedSubject)
      if (!exists) {
        setSelectedSubject(semesterSubjects[0].code)
        setQuizStarted(false)
        setQuizSubmitted(false)
        setQuizAnswers({})
      }
    }
  }, [semester, semesterSubjects, selectedSubject, setSelectedSubject, setQuizStarted, setQuizSubmitted, setQuizAnswers])

  // Filter syllabus, past papers, and quiz strictly by selectedSubject and semester (does not show others)
  const filteredSyllabus = useMemo(() => {
    return syllabusList.filter((s) => s.subjectCode === selectedSubject && ((s.semester || 'Sem 1') === semester))
  }, [syllabusList, selectedSubject, semester])

  const filteredPapers = useMemo(() => {
    return papersList.filter((p) => p.subject === selectedSubject && ((p.semester || 'Sem 1') === semester))
  }, [papersList, selectedSubject, semester])

  const filteredQuiz = useMemo(() => {
    return quizList.filter((q) => q.subject === selectedSubject && ((q.semester || 'Sem 1') === semester))
  }, [quizList, selectedSubject, semester])

  const score = useMemo(() => {
    return filteredQuiz.filter((q, index) => quizAnswers[index] === q.answer).length
  }, [filteredQuiz, quizAnswers])

  const activeSubjectObj = semesterSubjects.find((s) => s.code === selectedSubject)

  return (
    <div className="page inner-page study-page">
      <PageIntro
        eyebrow="Your academic toolkit"
        title={<>Study <em>smarter.</em></>}
        copy="Curriculum syllabus, previous year papers, and interactive practice tests curated strictly for each subject and semester."
      >
        <div className="study-controls">
          <label>
            Semester
            <select
              value={semester}
              onChange={(event) => {
                setSemester(event.target.value)
                setQuizStarted(false)
                setQuizSubmitted(false)
                setQuizAnswers({})
              }}
            >
              {Array.from({ length: 8 }, (_, i) => <option key={i}>Sem {i + 1}</option>)}
            </select>
            <Icon name="chevron" size={15} />
          </label>
          <span className="intro-note"><span className="status-dot" /> Showing {semester} · {selectedSubject || 'Subject'}</span>
        </div>
      </PageIntro>

      <div className="study-layout">
        <aside className="subject-nav">
          <div className="card-kicker">{semester} · SUBJECTS ({semesterSubjects.length})</div>
          <div className="subject-buttons-wrap">
            {semesterSubjects.length > 0 ? (
              semesterSubjects.map((subject) => (
                <button
                  key={subject.id || subject.code}
                  className={`subject-button ${selectedSubject === subject.code ? 'subject-selected' : ''}`}
                  onClick={() => {
                    setSelectedSubject(subject.code)
                    setQuizStarted(false)
                    setQuizSubmitted(false)
                    setQuizAnswers({})
                  }}
                >
                  <span className={`subject-dot dot-${subject.tone || 'cyan'}`} />
                  {subject.code}
                  <Icon name="arrow" size={14} />
                </button>
              ))
            ) : (
              <p style={{ color: '#94a3b8', fontSize: '11px', padding: '8px 4px' }}>No subjects added for {semester} yet.</p>
            )}

            {/* Only Study Zone Admin and Super Admin can see and click Add Subject */}
            {canManageStudy && (
              <button className="add-subject" onClick={onOpenAddSubject}>
                <Icon name="plus" size={15} /> Add subject to {semester}
              </button>
            )}
          </div>
        </aside>

        <section className="study-main">
          <div className="study-heading">
            <div>
              <span className="eyebrow"><span className="eyebrow-line" />{semester} · {selectedSubject} Academic Hub</span>
              <h2>{selectedSubject} <span>{activeSubjectObj?.title ? `· ${activeSubjectObj.title}` : 'Resources.'}</span></h2>
            </div>
            <p>Syllabus modules, previous year question papers, and interactive practice quiz strictly for {selectedSubject} ({semester}).</p>
          </div>

          <div className="test-grid">
            <article className="test-card test-featured">
              <div className="test-top">
                <span>TEST 01 · {selectedSubject}</span>
                <span>{filteredQuiz.length > 0 ? 'Ready' : 'In prep'}</span>
              </div>
              <h3>Module 1: Foundations<br /><em>{selectedSubject} Practice Quiz</em></h3>
              <div className="test-bottom">
                <span>{filteredQuiz.length > 0 ? `${filteredQuiz.length} questions · 5 min` : 'No quiz questions uploaded yet'}</span>
                {filteredQuiz.length > 0 ? (
                  <button
                    className="play-button"
                    onClick={() => {
                      setQuizStarted(true)
                      setQuizSubmitted(false)
                      setQuizAnswers({})
                    }}
                    aria-label={`Start ${selectedSubject} test`}
                  >
                    <Icon name="play" size={14} />
                  </button>
                ) : (
                  <span className="lock-small"><Icon name="lock" size={13} /></span>
                )}
              </div>
            </article>

            {[2, 3, 4].map((test) => (
              <article className="test-card" key={test}>
                <div className="test-top">
                  <span>TEST 0{test}</span>
                  <span>Coming soon</span>
                </div>
                <h3>Module {test}<br /><em>{selectedSubject} advanced set</em></h3>
                <div className="test-bottom">
                  <span>Advanced module questions</span>
                  <span className="lock-small"><Icon name="lock" size={13} /></span>
                </div>
              </article>
            ))}
          </div>

          {/* SYLLABUS SECTION - FILTERED STRICTLY TO SELECTED SUBJECT */}
          <section className="syllabus-section">
            <div className="section-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" />Course breakdown & curriculum</div>
                <h2>{selectedSubject} <span>Syllabus.</span></h2>
              </div>
              {canManageStudy && (
                <Button onClick={onOpenAddSyllabus} icon="plus">
                  Add {selectedSubject} Syllabus
                </Button>
              )}
            </div>

            <div className="syllabus-grid">
              {filteredSyllabus.length > 0 ? (
                filteredSyllabus.map((syl) => (
                  <article className="syllabus-card" key={syl.id || syl.subjectCode}>
                    <div className="syllabus-header">
                      <div className="syllabus-header-main">
                        <div className="syllabus-top">
                          <span className="syllabus-badge">{syl.subjectCode} · {syl.semester || semester}</span>
                          <span className="syllabus-credits">{syl.credits}</span>
                          {syl.modules && (
                            <span className="syllabus-unit-count">{syl.modules.length} Modules</span>
                          )}
                        </div>
                        <h3>{syl.subjectTitle}</h3>
                        <div className="syllabus-regulation">{syl.regulation}</div>
                      </div>
                      {canManageStudy && (
                        <div className="syllabus-header-actions">
                          <button className="btn-admin-edit" onClick={() => onEditSyllabus(syl)} style={{ padding: '6px 12px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <Icon name="edit" size={13} /> Edit
                          </button>
                          <button className="btn-admin-del" onClick={() => onDeleteSyllabus(syl.id, `${syl.subjectCode} Syllabus`)} style={{ padding: '6px 12px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <Icon name="trash" size={13} /> Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="syllabus-modules-list">
                      {syl.modules && syl.modules.map((mod, idx) => {
                        const isOpenEnded = Boolean(mod.isOpenEnded || mod.unit?.toLowerCase().includes('open ended'))
                        return (
                          <div className={`syllabus-module-item ${isOpenEnded ? 'syllabus-module-open-ended' : ''}`} key={idx}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                              <strong>{mod.unit}</strong>
                              {isOpenEnded && (
                                <span className="open-ended-pill">
                                  <Icon name="spark" size={10} /> Open Ended
                                </span>
                              )}
                            </div>
                            <span>{mod.desc}</span>
                          </div>
                        )
                      })}
                    </div>
                  </article>
                ))
              ) : (
                <div style={{ width: '100%', padding: '24px', background: '#111c2e', border: '1px dashed #1e3a5f', borderRadius: '8px', textAlign: 'center', color: '#94a3b8' }}>
                  <p style={{ margin: 0, fontSize: '12px' }}>No syllabus entries uploaded for {selectedSubject} ({semester}) yet.</p>
                  {canManageStudy && (
                    <Button onClick={onOpenAddSyllabus} icon="plus" style={{ marginTop: '12px' }}>
                      Add {selectedSubject} Syllabus
                    </Button>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* PAST QUESTION PAPERS - FILTERED STRICTLY TO SELECTED SUBJECT */}
          <div className="papers-header" style={{ marginTop: '44px' }}>
            <div>
              <span className="eyebrow"><span className="eyebrow-line" />Past question papers</span>
              <h3>{selectedSubject} <span>Papers.</span></h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="muted-count">{filteredPapers.length} papers</span>
              {canManageStudy && (
                <button className="btn-admin-edit" onClick={onOpenAddPaper} style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon name="plus" size={13} /> Add Paper
                </button>
              )}
            </div>
          </div>

          <div className="paper-list">
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper) => (
                <PaperRow key={paper.id || `${paper.subject}-${paper.year}`} subject={paper.subject} year={paper.year} semester={paper.semester || semester} />
              ))
            ) : (
              <div
                style={{
                  width: '100%',
                  padding: '24px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '13px',
                  minHeight: '72px',
                }}
              >
                No past papers uploaded yet for {selectedSubject} in {semester}.
              </div>
            )}
          </div>
        </section>
      </div>

      {quizStarted && (
        <QuizModal
          questions={filteredQuiz}
          score={score}
          answers={quizAnswers}
          setAnswers={setQuizAnswers}
          submitted={quizSubmitted}
          setSubmitted={setQuizSubmitted}
          onClose={() => setQuizStarted(false)}
          subjectCode={selectedSubject}
          semester={semester}
        />
      )}
    </div>
  )
}
