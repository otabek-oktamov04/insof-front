/**
 * Example Component - Banking Card
 * Demonstrates iOS 18 design principles for banking application
 */

export default function BankingCardExample() {
  return (
    <div style={{ padding: 'var(--spacing-base)', maxWidth: '400px', margin: '0 auto' }}>
      {/* Account Balance Card */}
      <div className="banking-card" style={{ marginBottom: 'var(--spacing-base)' }}>
        <p className="text-subhead" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
          Total Balance
        </p>
        <p className="amount-display amount-neutral">$50,000.00</p>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-base)' }}>
          <span className="badge badge-success">+$500 this month</span>
        </div>
      </div>

      {/* Transaction List Card */}
      <div className="banking-card">
        <h3 className="text-title3" style={{ marginBottom: 'var(--spacing-base)' }}>
          Recent Transactions
        </h3>
        
        <div className="transaction-item">
          <div>
            <p className="text-body" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Salary Deposit
            </p>
            <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
              Work • Jan 15, 2024
            </p>
          </div>
          <div className="text-financial">
            <p className="text-body amount-positive" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              +$5,000.00
            </p>
          </div>
        </div>

        <div className="transaction-item">
          <div>
            <p className="text-body" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Grocery Store
            </p>
            <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
              Shopping • Jan 14, 2024
            </p>
          </div>
          <div className="text-financial">
            <p className="text-body amount-negative" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              -$125.50
            </p>
          </div>
        </div>

        <div className="transaction-item">
          <div>
            <p className="text-body" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Coffee Shop
            </p>
            <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
              Food & Drink • Jan 14, 2024
            </p>
          </div>
          <div className="text-financial">
            <p className="text-body amount-negative" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
              -$4.50
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--spacing-sm)', 
        marginTop: 'var(--spacing-base)',
        flexDirection: 'column'
      }}>
        <button className="btn btn-primary btn-full-width">
          Transfer Money
        </button>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }}>
            View All
          </button>
          <button className="btn btn-ghost" style={{ flex: 1 }}>
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
