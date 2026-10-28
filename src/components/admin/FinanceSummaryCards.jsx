import { useMemo } from 'react'
import { Icon } from '../common/Icon'

export function FinanceSummaryCards({ financeList = [] }) {
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0
    let exp = 0
    for (const item of financeList) {
      const val = typeof item.amount === 'number'
        ? item.amount
        : parseFloat(String(item.amount || '0').replace(/[^0-9.-]+/g, '')) || 0

      if (item.category === 'Expense') {
        exp += val
      } else {
        // Income or Grant
        inc += val
      }
    }
    return { totalIncome: inc, totalExpense: exp, balance: inc - exp }
  }, [financeList])

  const formatCurr = (num) => '₹' + Math.round(num).toLocaleString('en-IN')

  return (
    <div className="finance-kpi-grid">
      <div className="finance-kpi-card kpi-income">
        <div className="kpi-top">
          <span className="kpi-badge"><Icon name="arrow" size={12} className="rot-down" /> Total Income</span>
          <span className="kpi-icon"><Icon name="check" size={15} /></span>
        </div>
        <div className="kpi-value">{formatCurr(totalIncome)}</div>
        <div className="kpi-label">Sponsorships, grants & income receipts</div>
      </div>

      <div className="finance-kpi-card kpi-expense">
        <div className="kpi-top">
          <span className="kpi-badge"><Icon name="arrow" size={12} className="rot-up" /> Total Expense</span>
          <span className="kpi-icon"><Icon name="close" size={15} /></span>
        </div>
        <div className="kpi-value">{formatCurr(totalExpense)}</div>
        <div className="kpi-label">Approved event & operations spend</div>
      </div>

      <div className="finance-kpi-card kpi-balance">
        <div className="kpi-top">
          <span className="kpi-badge"><Icon name="shield" size={12} /> Net Balance</span>
          <span className="kpi-icon"><Icon name="spark" size={15} /></span>
        </div>
        <div className="kpi-value">{formatCurr(balance)}</div>
        <div className="kpi-label">{balance >= 0 ? 'Surplus funds in reserve' : 'Budget deficit'}</div>
      </div>
    </div>
  )
}
