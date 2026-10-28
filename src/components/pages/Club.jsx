import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'

export function ClubEvent({ number, title, date, copy, color, setViewer }) {
  return (
    <article className={`club-event club-${color}`}>
      <span className="club-event-number">{number}</span>
      <div className="club-event-icon"><Icon name="spark" size={25} /></div>
      <span className="event-label">{date}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <button className="text-link" onClick={() => setViewer && setViewer({ title, kind: 'Club Event', date })}>
        Details <Icon name="arrow" size={15} />
      </button>
    </article>
  )
}

export function Club({ goTo, setViewer, clubInfo, clubEventsList, canManageClub, onOpenEditClub }) {
  return (
    <div className="page inner-page club-page">
      <PageIntro
        eyebrow={`A student-led space · Est. ${clubInfo.estYear || '2026'}`}
        title={<>{clubInfo.name || 'The BCA Club'} <em>makers.</em></>}
        copy={clubInfo.description || 'The club is where curiosity gets messy — side projects, new skills, late-night ideas and the joy of building together.'}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button onClick={() => goTo('gallery')} icon="arrow">See club moments</Button>
          {canManageClub && (
            <Button variant="outline" onClick={onOpenEditClub} icon="edit">
              Edit Club Info
            </Button>
          )}
        </div>
      </PageIntro>

      <section className="club-hero">
        <div className="club-symbol"><Icon name="spark" size={58} /></div>
        <div>
          <span className="club-kicker">{clubInfo.name.toUpperCase()} · EST. {clubInfo.estYear || '2026'}</span>
          <h2>{clubInfo.tagline || 'Build the unexpected.'}</h2>
          <p>{clubInfo.punchline || 'Bring a question. Leave with a prototype.'}</p>
        </div>
        <div className="club-number">01<span>/03</span></div>
      </section>

      <section className="club-events">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />The club calendar</div>
            <h2>Come <span>make.</span></h2>
          </div>
          <span className="muted-count">{clubEventsList.length} events</span>
        </div>
        <div className="club-event-grid">
          {clubEventsList.map((ce, index) => (
            <ClubEvent
              key={ce.id || ce.title}
              number={ce.number || `0${index + 1}`}
              title={ce.title}
              date={ce.date}
              copy={ce.copy}
              color={ce.color || 'orange'}
              setViewer={setViewer}
            />
          ))}
        </div>
      </section>

      <section className="club-report-bar">
        <div>
          <span className="eyebrow"><span className="eyebrow-line" />Club archive</span>
          <h3>What we’ve been up to</h3>
        </div>
        <button className="text-link" onClick={() => setViewer({ title: `${clubInfo.name} Activity Report`, kind: 'PDF report', date: '30.03.2026' })}>
          Read the latest report <Icon name="arrow" size={16} />
        </button>
      </section>
    </div>
  )
}
