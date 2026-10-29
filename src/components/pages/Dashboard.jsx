import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { QuickLink } from '../layout/QuickLink'
import { asset } from '../../utils/storage'

export function Dashboard({ goTo, setViewer, events }) {
  return (
    <div className="page dashboard-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="eyebrow-line" />Department of Computer Applications</div>
          <h1>Build what<br /><em>matters.</em></h1>
          <p>A four-year journey through code, creativity and the courage to solve real problems.</p>
          <div className="hero-actions">
            <Button onClick={() => goTo('department')} icon="arrow">Explore the department</Button>
            <button className="text-link light-link" onClick={() => goTo('study')}>Browse study zone <Icon name="arrow" size={16} /></button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-image-wrap"><img src={asset('college-photo.jpg')} alt="PSMO College campus" /></div>
          <div className="hero-caption"><span>PSMO College</span><small>Tirurangadi · Kerala</small></div>
        </div>
        <div className="hero-scroll">Scroll to explore <span /></div>
      </section>

      <div className="dashboard-grid">
        <section className="welcome-card card">
          <div className="card-kicker">THE BCA EDIT</div>
          <h2>Small steps.<br /><span>Big systems.</span></h2>
          <p>Learning here is hands-on, human and always connected to the world outside the classroom.</p>
          <button className="round-arrow" onClick={() => goTo('department')} aria-label="Learn about BCA"><Icon name="arrow" size={18} /></button>
          <div className="welcome-lines" />
        </section>

        <section className="stat-card card">
          <div className="stat-icon"><Icon name="building" size={21} /></div>
          <span className="card-kicker">OUR PROGRAMME</span>
          <strong>4 years</strong>
          <p>8 semesters · 128 credits</p>
          <div className="progress-label"><span>Programme journey</span><span>01 / 08</span></div>
          <div className="progress"><i /></div>
        </section>

        <section className="links-card card">
          <div className="card-kicker">QUICK ACCESS</div>
          <QuickLink icon="users" title="Association" subtitle="Student-led initiatives" onClick={() => goTo('association')} />
          <QuickLink icon="book" title="Study zone" subtitle="Papers & practice" onClick={() => goTo('study')} />
          <QuickLink icon="image" title="Gallery" subtitle="Life on campus" onClick={() => goTo('gallery')} />
        </section>
      </div>

      <section className="section-block events-block">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />Happening around us</div>
            <h2>Next up <span>—</span></h2>
          </div>
          <button className="text-link" onClick={() => goTo('association')}>See all events <Icon name="arrow" size={16} /></button>
        </div>
        <div className="event-grid">
          {events.length > 0 ? (
            events.map((event) => (
              <article className={`event-card event-${event.color || 'orange'}`} key={event.id || event.title}>
                <div className="event-date">
                  <strong>{event.date}</strong>
                  <span>{event.month}</span>
                </div>
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.meta}</p>
                </div>
                <span className="event-arrow"><Icon name="arrow" size={17} /></span>
              </article>
            ))
          ) : (
            <div className="empty-state-card" style={{ padding: '30px 20px', textAlign: 'center', background: '#081220', border: '1px dashed #1e3a5f', borderRadius: '8px', color: '#94a3b8', gridColumn: '1 / -1' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>No upcoming events scheduled right now.</p>
            </div>
          )}
        </div>
      </section>

      <section className="quote-strip">
        <div className="quote-mark">“</div>
        <blockquote>Technology is at its best when it brings people together.</blockquote>
        <span>— BCA community, PSMO College</span>
        <div className="quote-shape" />
      </section>

      <section className="campus-slice">
        <img src={asset('college-garden.jpg')} alt="PSMO College garden" />
        <div>
          <div className="eyebrow light"><span className="eyebrow-line" />A place to grow</div>
          <h2>More than a<br /><em>classroom.</em></h2>
          <p>Find your people, your pace and your next big idea in a campus that keeps moving.</p>
          <Button variant="light" onClick={() => goTo('gallery')} icon="arrow">See campus life</Button>
        </div>
      </section>
    </div>
  )
}
