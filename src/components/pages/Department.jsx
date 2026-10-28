import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'

export function Department({ goTo, facultyList }) {
  return (
    <div className="page inner-page">
      <PageIntro
        eyebrow="The people behind the practice"
        title={<>Meet the <em>department.</em></>}
        copy="A close-knit team of educators, mentors and builders helping the next generation find their voice in technology."
      >
        <div className="intro-actions">
          <Button onClick={() => goTo('study')} icon="book">Visit the study zone</Button>
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
          <span className="muted-count">{facultyList.length.toString().padStart(2, '0')} members</span>
        </div>
        <div className="faculty-grid">
          {facultyList.map((person, index) => (
            <article className={`faculty-card faculty-${(index % 4) + 1}`} key={person.id || person.name}>
              <div className="faculty-photo">
                <img src={person.image} alt={person.name} />
                <span>0{index + 1}</span>
              </div>
              <div className="faculty-info">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <small>{person.tag}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="programme-band">
        <div>
          <div className="eyebrow light"><span className="eyebrow-line" />A clear path forward</div>
          <h2>Four years.<br /><em>Many directions.</em></h2>
        </div>
        <div className="semester-list">
          {['Foundation', 'Core computing', 'Applied practice', 'Launch'].map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <small>{index === 0 ? 'Sem 1–2' : index === 1 ? 'Sem 3–4' : index === 2 ? 'Sem 5–6' : 'Sem 7–8'}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
