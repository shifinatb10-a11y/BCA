import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'

export function Department({
  goTo,
  facultyList,
  canManageDept,
  onOpenAddFaculty,
  onEditFaculty,
  onDeleteFaculty,
}) {
  return (
    <div className="page inner-page department-page">
      <PageIntro
        eyebrow="Department of Computer Applications · Est. 2013"
        title={<>A place to grow <em>curious minds.</em></>}
        copy="The Department of Computer Applications at PSMO College creates an environment where students explore foundational computing, applied software design, and critical problem solving."
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button onClick={() => goTo('study')} icon="arrow">Explore curriculum</Button>
          <span className="intro-note"><span className="status-dot" /> {facultyList.length} faculty & mentors</span>
        </div>
      </PageIntro>

      <section className="department-story">
        <div className="story-number">01</div>
        <div>
          <div className="eyebrow"><span className="eyebrow-line" />Our approach</div>
          <h2>Curiosity is<br /><span>our curriculum.</span></h2>
        </div>
        <p>We believe a strong BCA education is a balance of fundamentals and freedom. Learn the logic, then use it to make something useful, thoughtful and distinctly yours.</p>
      </section>

      <section className="faculty-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />The teaching team</div>
            <h2>People to <span>learn from.</span></h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="muted-count">{facultyList.length.toString().padStart(2, '0')} members</span>
            {canManageDept && (
              <Button onClick={onOpenAddFaculty} icon="plus" style={{ padding: '6px 12px', fontSize: '12px' }}>
                Add Faculty
              </Button>
            )}
          </div>
        </div>
        <div className="faculty-grid">
          {facultyList.length > 0 ? (
            facultyList.map((person, index) => (
              <article className={`faculty-card faculty-${(index % 4) + 1}`} key={person.id || person.name}>
                <div className="faculty-photo">
                  <img src={person.image} alt={person.name} />
                  <span>0{index + 1}</span>
                </div>
                <div className="faculty-info">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                  <small>{person.tag}</small>
                  {canManageDept && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '6px', borderTop: '1px solid #1e3a5f', paddingTop: '8px' }}>
                      <button
                        type="button"
                        className="btn-admin-edit"
                        onClick={() => onEditFaculty(person)}
                        style={{ padding: '3px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Icon name="edit" size={11} /> Edit
                      </button>
                      <button
                        type="button"
                        className="btn-admin-del"
                        onClick={() => onDeleteFaculty(person.id, person.name)}
                        style={{ padding: '3px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Icon name="trash" size={11} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state-card" style={{ padding: '36px 20px', textAlign: 'center', background: '#081220', border: '1px dashed #1e3a5f', borderRadius: '8px', color: '#94a3b8', gridColumn: '1 / -1' }}>
              <Icon name="users" size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h4 style={{ color: '#e2e8f0', margin: '0 0 6px' }}>No faculty profiles listed</h4>
              <p style={{ margin: 0, fontSize: '13px' }}>Faculty members will appear here once added from the Department admin desk.</p>
            </div>
          )}
        </div>
      </section>

      <section className="department-highlights-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />Core pillars</div>
            <h2>Built for <span>depth & discovery.</span></h2>
          </div>
        </div>

        <div className="department-highlights-grid">
          <article className="highlight-card">
            <div className="highlight-card-top">
              <div className="highlight-icon-box">
                <Icon name="book" size={20} />
              </div>
              <span className="highlight-tag">01 · PROGRAMME</span>
            </div>
            <h3>Four years. <em>Real depth.</em></h3>
            <p>Autonomous curriculum structured to bridge academic theory and industry reality.</p>
            <div className="highlight-card-footer">
              <span>8 Semesters</span>
              <span>128 Credits</span>
            </div>
          </article>

          <article className="highlight-card">
            <div className="highlight-card-top">
              <div className="highlight-icon-box">
                <Icon name="users" size={20} />
              </div>
              <span className="highlight-tag">02 · COMMUNITY</span>
            </div>
            <h3>Student-first <em>spaces.</em></h3>
            <p>From the BCA Association to the tech club, every initiative is led and shaped by learners.</p>
            <div className="highlight-card-footer">
              <span>BCA Association</span>
              <span>Tech Club</span>
            </div>
          </article>

          <article className="highlight-card">
            <div className="highlight-card-top">
              <div className="highlight-icon-box">
                <Icon name="spark" size={20} />
              </div>
              <span className="highlight-tag">03 · OUTCOMES</span>
            </div>
            <h3>Beyond the <em>degree.</em></h3>
            <p>Graduates move into software engineering, research, and technical leadership across domains.</p>
            <div className="highlight-card-footer">
              <span>Industry Ready</span>
              <span>Research & Startups</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
