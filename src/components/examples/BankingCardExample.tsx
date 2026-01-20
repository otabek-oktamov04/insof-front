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
          Jami balans
        </p>
        <p className="amount-display amount-neutral">$50,000.00</p>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-base)' }}>
          <span className="badge badge-success">+$500 bu oy</span>
        </div>
      </div>

      {/* Transaction List Card */}
      <div className="banking-card">
        <h3 className="text-title3" style={{ marginBottom: 'var(--spacing-base)' }}>
          So'nggi tranzaksiyalar
        </h3>
        
        <div className="transaction-item">
          <div>
            <p className="text-body" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Maosh o'tkazmasi
            </p>
            <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
              Ish • 15 Yan, 2024
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
              Oziq-ovqat do'koni
            </p>
            <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
              Xarid • 14 Yan, 2024
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
              Kofe do'koni
            </p>
            <p className="text-caption" style={{ color: 'var(--color-text-secondary)' }}>
              Ovqat va ichimlik • 14 Yan, 2024
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
          Pul o'tkazish
        </button>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }}>
            Barchasini ko'rish
          </button>
          <button className="btn btn-ghost" style={{ flex: 1 }}>
            Sozlamalar
          </button>
        </div>
      </div>
    </div>
  );
}
