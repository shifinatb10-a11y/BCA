import { useMemo } from 'react'
import { PageIntro } from '../common/PageIntro'
import { Button } from '../common/Button'
import { Icon } from '../common/Icon'

export function ReportRow({ title, type, date, setViewer, magazine }) {
  return (
    <article className="report-row">
      <div className={`report-icon ${magazine ? 'report-magazine' : ''}`}>
        <Icon name={magazine ? 'book' : 'external'} size={20} />
      </div>
      <div className="report-main">
        <span>{type}</span>
        <h3>{title}</h3>
      </div>
      <time>{date}</time>
      <button className="round-arrow small" onClick={() => setViewer({ title, kind: type, date })} aria-label={`Open ${title}`}>
        <Icon name="arrow" size={16} />
      </button>
    </article>
  )
}

export function Association({
  setViewer,
  reportsList = [],
  associationsList = [],
  selectedAssocId,
  setSelectedAssocId,
  canManageAssoc,
  onOpenAddAssoc,
  onOpenAddMagazine,
  onOpenFinanceModal,
  canViewFinance,
  financeList = [],
}) {
  const currentAssoc = associationsList.find((a) => a.id === selectedAssocId) || associationsList[0] || {}

  const currentAssocReports = useMemo(() => {
    if (!currentAssoc || !currentAssoc.id) return []
    return reportsList.filter((rep) => {
      if (rep.associationId) return rep.associationId === currentAssoc.id
      return Boolean(currentAssoc.active)
    })
  }, [reportsList, currentAssoc])

  const secretaryMagazine = useMemo(() => {
    if (currentAssoc.magazineTitle) {
      return {
        title: currentAssoc.magazineTitle,
        fileUrl: currentAssoc.magazineUrl,
        date: `${currentAssoc.fromYear}–${currentAssoc.toYear}`,
      }
    }
    const foundMag = currentAssocReports.find((r) => r.isMagazine || r.type === 'ANNUAL MAGAZINE')
    if (foundMag) {
      return {
        title: foundMag.title,
        fileUrl: foundMag.fileUrl,
        date: foundMag.date,
      }
    }
    return null
  }, [currentAssoc, currentAssocReports])

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0
    let exp = 0
    for (const item of financeList) {
      const val = typeof item.amount === 'number'
        ? item.amount
        : parseFloat(String(item.amount || '0').replace(/[^0-9.-]+/g, '')) || 0
      if (item.category === 'Expense') exp += val
      else inc += val
    }
    return { totalIncome: inc, totalExpense: exp, balance: inc - exp }
  }, [financeList])

  const formatCurr = (num) => '₹' + Math.round(num).toLocaleString('en-IN')

  if (associationsList.length === 0) {
    return (
      <div className="page inner-page">
        <PageIntro
          eyebrow="Student association"
          title={<>Lead from the <em>middle.</em></>}
          copy="The BCA Association turns good ideas into shared experiences — one event, one conversation and one bold experiment at a time."
        />
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#081220', border: '1px dashed #1e3a5f', borderRadius: '12px', margin: '30px 0' }}>
          <Icon name="users" size={32} style={{ color: '#06b6d4', marginBottom: '12px' }} />
          <h3 style={{ color: '#f8fafc', margin: '0 0 8px' }}>No Association Tenures Added Yet</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 18px' }}>Create an association tenure year-to-year to appoint a secretary, upload annual magazines, and manage student reports.</p>
          {canManageAssoc && (
            <Button icon="plus" onClick={onOpenAddAssoc}>Add Association Tenure</Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page inner-page">
      <PageIntro
        eyebrow={`Student association · ${currentAssoc.fromYear || '2026'}—${currentAssoc.toYear || '2027'}`}
        title={<>Lead from the <em>middle.</em></>}
        copy="The BCA Association turns good ideas into shared experiences — one event, one conversation and one bold experiment at a time."
      >
        <div className="association-meta">
          <span>{currentAssoc.fromYear?.slice(-2) || '02'}</span>
          <div>
            <strong>{currentAssoc.name || 'Active association'}</strong>
            <small>{currentAssoc.fromYear}—{currentAssoc.toYear} tenure {currentAssoc.active ? '· Active' : '· Past'}</small>
          </div>
        </div>
      </PageIntro>

      {/* Multi-Year Association Timeline Selector */}
      <div className="association-timeline">
        <span style={{ fontSize: '11px', color: '#94a3b8', marginRight: '6px' }}>Association Tenure:</span>
        {associationsList.map((assoc) => (
          <button
            key={assoc.id}
            className={`association-year-btn ${selectedAssocId === assoc.id ? 'active' : ''}`}
            onClick={() => setSelectedAssocId(assoc.id)}
          >
            <Icon name="spark" size={13} />
            {assoc.fromYear}—{assoc.toYear} {assoc.active ? '(Current)' : ''}
          </button>
        ))}
        {canManageAssoc && (
          <button className="association-year-btn" onClick={onOpenAddAssoc} style={{ borderColor: '#06b6d4', color: '#38bdf8' }}>
            <Icon name="plus" size={13} /> Add tenure
          </button>
        )}
      </div>

      <section className="secretary-card">
        <div className="secretary-photo">
          <img src={currentAssoc.secretaryPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=560&q=85'} alt={currentAssoc.secretaryName || 'Secretary'} />
          <span className="photo-label">ASSOCIATION<br />SECRETARY</span>
        </div>
        <div className="secretary-copy">
          <div className="eyebrow"><span className="eyebrow-line" />Meet the team</div>
          <h2>“{currentAssoc.quote || 'We make room for everyone.'}”</h2>
          <p>{currentAssoc.description || 'Our association is a shared table: a place for first ideas, half-finished thoughts and the confidence to put them into the world.'}</p>
          <div className="signature">
            {currentAssoc.secretaryName || 'Secretary'} <small>{currentAssoc.secretaryRole || `Secretary · ${currentAssoc.fromYear}—${currentAssoc.toYear}`}</small>
          </div>
        </div>
        <div className="secretary-stamp">BCA<br /><span>{currentAssoc.fromYear?.slice(-2) || '02'}</span></div>
      </section>

      {/* Secretary's Annual Magazine Card if present */}
      {secretaryMagazine && (
        <section className="secretary-magazine-strip" style={{
          marginTop: '18px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(14, 165, 233, 0.03) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Icon name="book" size={22} />
            </div>
            <div>
              <span className="eyebrow" style={{ color: '#38bdf8', fontSize: '10px', margin: 0 }}>
                {currentAssoc.name} · Annual Magazine
              </span>
              <h4 style={{ margin: '3px 0 2px', fontSize: '15px', color: '#f8fafc' }}>{secretaryMagazine.title}</h4>
              <small style={{ color: '#94a3b8', fontSize: '11px' }}>
                Published under tenure of {currentAssoc.secretaryName || 'Association Secretary'} ({currentAssoc.fromYear}–{currentAssoc.toYear})
              </small>
            </div>
          </div>
          {secretaryMagazine.fileUrl ? (
            <Button
              variant="outline"
              icon="external"
              onClick={() => setViewer({
                title: secretaryMagazine.title,
                kind: 'Annual Magazine',
                url: secretaryMagazine.fileUrl,
                date: secretaryMagazine.date
              })}
            >
              Read Magazine
            </Button>
          ) : (
            <span style={{ fontSize: '11px', color: '#64748b' }}>Document in archive</span>
          )}
        </section>
      )}

      <section className="reports-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />From {currentAssoc.name || 'Association'} desk</div>
            <h2>Reports & <span>magazines.</span></h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {canManageAssoc && currentAssoc?.id && (
              <Button
                icon="plus"
                onClick={() => onOpenAddMagazine && onOpenAddMagazine(currentAssoc.id)}
              >
                Add Magazine / Report
              </Button>
            )}
            <Button variant="outline" icon="external" onClick={() => setViewer({ title: `${currentAssoc.name || 'Association'} Archive`, kind: 'All reports & publications', date: `${currentAssoc.fromYear}—${currentAssoc.toYear}` })}>
              Open archive
            </Button>
          </div>
        </div>
        <div className="report-list">
          {currentAssocReports.length > 0 ? (
            currentAssocReports.map((rep) => (
              <ReportRow
                key={rep.id || rep.title}
                title={rep.title}
                type={rep.type}
                date={rep.date}
                setViewer={setViewer}
                magazine={rep.isMagazine || rep.type?.toLowerCase().includes('magazine')}
              />
            ))
          ) : (
            <div className="empty-state-card" style={{ padding: '24px', textAlign: 'center', background: '#081220', border: '1px dashed #1e3a5f', borderRadius: '8px', color: '#94a3b8', gridColumn: '1 / -1' }}>
              <p>No reports or magazines added for {currentAssoc.fromYear}–{currentAssoc.toYear} yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
