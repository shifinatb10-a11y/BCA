import { Icon } from '../common/Icon'
import { Button } from '../common/Button'
import { FinanceSummaryCards } from '../admin/FinanceSummaryCards'

export function FinanceViewerModal({ financeList, onClose, isReadOnly }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-form-modal" style={{ width: 'min(780px, 100%)' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />Private Workspace</span>
            <h2>Association Finance Statements</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button>
        </div>

        {isReadOnly && (
          <div className="readonly-notice">
            <Icon name="shield" size={15} />
            <span><strong>Read-Only Mode:</strong> Association admins can review balances and ledgers. Add / Edit / Delete is restricted to Finance and Super admins.</span>
          </div>
        )}

        {/* SUMMARY CARDS: TOTAL INCOME, TOTAL EXPENSE, BALANCE */}
        <FinanceSummaryCards financeList={financeList} />

        <div className="admin-crud-list" style={{ marginTop: '14px' }}>
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
            </div>
          ))}
        </div>

        <div className="admin-form-actions">
          <Button variant="outline" onClick={onClose}>Close Statements</Button>
        </div>
      </div>
    </div>
  )
}
