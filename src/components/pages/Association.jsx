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
  reportsList,
  associationsList = [],
  selectedAssocId,
  setSelectedAssocId,
  canManageAssoc,
  onOpenAddAssoc,
  onOpenFinanceModal,
  canViewFinance,
  financeList = [],
}) {
  const currentAssoc = associationsList.find((a) => a.id === selectedAssocId) || associationsList[0] || {}

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
            {currentAssoc.secretaryName || 'Aisha Rahman'} <small>{currentAssoc.secretaryRole || `Secretary · ${currentAssoc.fromYear}—${currentAssoc.toYear}`}</small>
          </div>
        </div>
        <div className="secretary-stamp">BCA<br /><span>{currentAssoc.fromYear?.slice(-2) || '02'}</span></div>
      </section>

      <section className="reports-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" />From the association desk</div>
            <h2>Reports & <span>magazines.</span></h2>
          </div>
          <Button variant="outline" icon="external" onClick={() => setViewer({ title: 'Association archive', kind: 'All reports & publications', date: `${currentAssoc.fromYear}—${currentAssoc.toYear}` })}>
            Open archive
          </Button>
        </div>
        <div className="report-list">
          {reportsList.map((rep) => (
            <ReportRow
              key={rep.id || rep.title}
              title={rep.title}
              type={rep.type}
              date={rep.date}
              setViewer={setViewer}
              magazine={rep.isMagazine}
            />
          ))}
        </div>
      </section>

      <section className="finance-callout">
        <div className="finance-lock"><Icon name="shield" size={22} /></div>
        <div>
          <div className="eyebrow"><span className="eyebrow-line" />Private workspace</div>
          <h3>Association finance</h3>
          <p>Transactions, statements, and budgets are visible to authorised association, finance, and super admins.</p>
        </div>
        {canViewFinance ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto', flexWrap: 'wrap' }}>
            <div className="finance-callout-stats">
              <span className="finance-stat-pill income">Income: {formatCurr(totalIncome)}</span>
              <span className="finance-stat-pill expense">Expense: {formatCurr(totalExpense)}</span>
              <span className="finance-stat-pill balance">Balance: {formatCurr(balance)}</span>
            </div>
            <Button variant="outline" icon="shield" onClick={onOpenFinanceModal}>
              View Statements
            </Button>
          </div>
        ) : (
          <span className="private-badge"><Icon name="lock" size={13} /> Admin only</span>
        )}
      </section>
    </div>
  )
}
