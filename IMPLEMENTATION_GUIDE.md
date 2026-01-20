# Implementation Guide - Banking System Design Principles

This guide provides practical examples and patterns for implementing the iOS 18-inspired design principles in your banking application.

## Quick Start

### 1. Using Design Tokens

All design tokens are available as CSS variables. Use them consistently throughout your application:

```css
/* Spacing */
padding: var(--spacing-base);
margin: var(--spacing-lg);

/* Typography */
font-size: var(--font-size-body);
font-weight: var(--font-weight-semibold);

/* Colors */
background: var(--color-primary-500);
color: var(--color-text-primary);

/* Border Radius */
border-radius: var(--radius-lg);

/* Shadows */
box-shadow: var(--shadow-md);
```

### 2. Component Patterns

#### Button Example

```tsx
// Primary button
<button className="btn btn-primary btn-full-width">
  Transfer Money
</button>

// Secondary button
<button className="btn btn-secondary">
  Cancel
</button>

// Destructive action
<button className="btn btn-destructive">
  Delete Account
</button>
```

#### Input Example

```tsx
<div>
  <label className="input-label">Account Number</label>
  <input 
    type="text" 
    className="input" 
    placeholder="Enter account number"
  />
  <span className="input-error-message">Error message here</span>
</div>
```

#### Card Example

```tsx
<div className="banking-card">
  <h3 className="text-title3">Account Balance</h3>
  <p className="amount-display amount-positive">$12,345.67</p>
</div>
```

#### Transaction List Example

```tsx
<div className="banking-card">
  {transactions.map((transaction) => (
    <div key={transaction.id} className="transaction-item">
      <div>
        <p className="text-body">{transaction.description}</p>
        <p className="text-caption text-secondary">{transaction.date}</p>
      </div>
      <div className="text-financial">
        <p className={`text-body ${transaction.amount > 0 ? 'amount-positive' : 'amount-negative'}`}>
          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
        </p>
      </div>
    </div>
  ))}
</div>
```

### 3. Typography Scale Usage

```tsx
// Large title (for hero sections, account balances)
<h1 className="text-large-title">$50,000.00</h1>

// Section titles
<h2 className="text-title2">Recent Transactions</h2>

// Card headers
<h3 className="text-title3">Account Details</h3>

// Body text
<p className="text-body">Your account summary</p>

// Secondary information
<p className="text-subhead">Last updated: Jan 15, 2024</p>

// Captions and metadata
<span className="text-caption">Transaction ID: 12345</span>
```

### 4. Financial Number Display

Always use the `text-financial` class for monetary values to ensure proper alignment:

```tsx
<div className="text-financial">
  <p className="amount-display amount-positive">$12,345.67</p>
</div>
```

### 5. Color Usage Guidelines

#### Semantic Colors

```tsx
// Positive amounts (deposits, gains)
<span className="amount-positive">+$500.00</span>

// Negative amounts (withdrawals, losses)
<span className="amount-negative">-$200.00</span>

// Neutral information
<span className="text-secondary">Account #1234</span>
```

#### Status Badges

```tsx
<span className="badge badge-success">Completed</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-error">Failed</span>
```

### 6. Spacing Patterns

Follow the 8px grid system:

```tsx
// Card with consistent padding
<div className="banking-card" style={{ padding: 'var(--spacing-base)' }}>
  {/* Content */}
</div>

// Flex container with gap
<div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
  <button>Action 1</button>
  <button>Action 2</button>
</div>

// Vertical spacing
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-base)' }}>
  <input />
  <input />
</div>
```

### 7. Animation Usage

```tsx
// Fade in
<div className="animate-fade-in">Content</div>

// Slide up (for modals)
<div className="modal-content animate-slide-up">Modal content</div>

// Button press feedback
<button className="btn btn-primary button-press">Click me</button>

// Loading spinner
<div className="loading-spinner" />
```

### 8. Loading States

#### Skeleton Loading

```tsx
<div className="skeleton" style={{ width: '100%', height: '60px', borderRadius: 'var(--radius-md)' }} />
```

#### Spinner

```tsx
<div className="loading-spinner" />
```

### 9. Empty States

```tsx
<div className="empty-state">
  <div className="empty-state-icon">
    {/* Icon component */}
  </div>
  <h3 className="empty-state-title">No Transactions</h3>
  <p className="empty-state-description">
    You haven't made any transactions yet.
  </p>
  <button className="btn btn-primary">Get Started</button>
</div>
```

### 10. Modal/Sheet Pattern

```tsx
<div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h2 className="text-title2">Transfer Money</h2>
      <button>Close</button>
    </div>
    <div className="modal-body">
      {/* Form content */}
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary">Cancel</button>
      <button className="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

## Best Practices

### 1. Touch Targets
- Always ensure interactive elements are at least 44x44px
- Use the `touch-target` utility class when needed

### 2. Accessibility
- Always include labels for form inputs
- Use semantic HTML elements
- Provide ARIA labels where needed
- Ensure sufficient color contrast
- Test with keyboard navigation

### 3. Financial Data
- Right-align all monetary values
- Use tabular numbers for alignment
- Always show 2 decimal places for currency
- Use thousands separators
- Color-code positive/negative values

### 4. Error Handling
- Show errors immediately below the input
- Use clear, actionable error messages
- Provide recovery paths
- Use the `input-error` class for error states

### 5. Security Considerations
- Mask sensitive information (show last 4 digits)
- Provide option to hide/show balances
- Clear confirmation for financial transactions
- Show transaction summaries before submission

### 6. Performance
- Use CSS transforms for animations (not position changes)
- Lazy load images and heavy components
- Optimize bundle sizes
- Use skeleton screens instead of spinners for content loading

## Component Checklist

Before implementing any component, ensure:

- [ ] Uses design tokens (not hardcoded values)
- [ ] Meets minimum touch target size (44x44px)
- [ ] Has proper focus states for keyboard navigation
- [ ] Includes loading states
- [ ] Includes error states
- [ ] Includes empty states
- [ ] Is responsive (mobile-first)
- [ ] Has proper semantic HTML
- [ ] Uses appropriate typography scale
- [ ] Follows spacing guidelines
- [ ] Has smooth animations (if applicable)
- [ ] Is accessible (WCAG AA minimum)

## Common Patterns

### Account Balance Display

```tsx
<div className="banking-card">
  <p className="text-subhead text-secondary">Total Balance</p>
  <p className="amount-display amount-neutral">$50,000.00</p>
  <div style={{ display: 'flex', gap: 'var(--spacing-base)', marginTop: 'var(--spacing-base)' }}>
    <span className="badge badge-success">+$500 this month</span>
  </div>
</div>
```

### Transaction Row

```tsx
<div className="transaction-item">
  <div>
    <p className="text-body font-medium">{transaction.merchant}</p>
    <p className="text-caption text-secondary">{transaction.category} • {transaction.date}</p>
  </div>
  <div className="text-financial">
    <p className={`text-body font-semibold ${transaction.amount > 0 ? 'amount-positive' : 'amount-negative'}`}>
      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
    </p>
  </div>
</div>
```

### Form with Validation

```tsx
<div>
  <label className="input-label" htmlFor="amount">
    Transfer Amount
  </label>
  <input
    id="amount"
    type="number"
    className={`input ${errors.amount ? 'input-error' : ''}`}
    placeholder="0.00"
  />
  {errors.amount && (
    <p className="input-error-message">{errors.amount}</p>
  )}
</div>
```

## Resources

- [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) - Full design principles document
- [src/styles/design-tokens.css](./src/styles/design-tokens.css) - All available design tokens
- [src/styles/animations.css](./src/styles/animations.css) - Animation utilities
- [src/styles/components.css](./src/styles/components.css) - Component styles

## Questions?

Refer to the main [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) document for detailed explanations of each principle.
