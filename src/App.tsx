import BankingCardExample from './components/examples/BankingCardExample'

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--color-background)',
      padding: 'var(--spacing-base)'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        paddingTop: 'var(--spacing-2xl)'
      }}>
        <h1 className="text-title1" style={{ marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
          Banking System
        </h1>
        <p className="text-body" style={{ 
          color: 'var(--color-text-secondary)', 
          textAlign: 'center',
          marginBottom: 'var(--spacing-2xl)'
        }}>
          iOS 18 Design Principles Example
        </p>
        <BankingCardExample />
      </div>
    </div>
  )
}