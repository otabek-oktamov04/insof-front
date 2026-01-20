# Banking System - iOS 18 Design System

This project follows iOS 18 design principles, specifically adapted for a banking application. The design system prioritizes clarity, trust, accessibility, and excellent user experience.

## 📚 Documentation

### Core Documents

1. **[DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md)** - Complete design principles document
   - Core philosophy
   - Visual design guidelines
   - Component design principles
   - Interaction design
   - Banking-specific principles
   - Accessibility standards

2. **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Practical implementation guide
   - Code examples
   - Component patterns
   - Best practices
   - Common patterns

### Style Files

- **[src/styles/design-tokens.css](./src/styles/design-tokens.css)** - All design tokens (spacing, typography, colors, etc.)
- **[src/styles/animations.css](./src/styles/animations.css)** - Animation utilities and keyframes
- **[src/styles/components.css](./src/styles/components.css)** - Pre-built component styles

## 🎨 Key Design Principles

### 1. Clarity Above All
- Every screen should be immediately understandable
- Clear information hierarchy
- Generous use of whitespace
- Plain, clear language

### 2. Trust & Security
- Clean, professional aesthetic
- Transparent communication
- Immediate feedback for all actions
- Error prevention over error correction

### 3. iOS 18 Design Language
- System fonts for native feel
- Subtle shadows and depth
- Smooth, purposeful animations
- Glassmorphism effects
- Respect for safe areas

### 4. Banking-Specific
- Clear financial information display
- Right-aligned monetary values
- Color-coded positive/negative amounts
- Security-first design patterns
- Transaction confirmation flows

## 🚀 Quick Start

### Using Design Tokens

```css
/* In your CSS */
.my-component {
  padding: var(--spacing-base);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

### Using Component Classes

```tsx
// Button
<button className="btn btn-primary btn-full-width">
  Transfer Money
</button>

// Card
<div className="banking-card">
  <h3 className="text-title3">Account Balance</h3>
  <p className="amount-display amount-positive">$12,345.67</p>
</div>

// Input
<div>
  <label className="input-label">Amount</label>
  <input type="number" className="input" />
</div>
```

## 📐 Design Tokens Overview

### Spacing Scale (8px base)
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 12px
- `--spacing-base`: 16px
- `--spacing-lg`: 20px
- `--spacing-xl`: 24px
- `--spacing-2xl`: 32px
- `--spacing-3xl`: 40px
- `--spacing-4xl`: 48px
- `--spacing-5xl`: 64px

### Typography Scale
- `--font-size-caption`: 13px
- `--font-size-subhead`: 15px
- `--font-size-body`: 17px
- `--font-size-callout`: 20px
- `--font-size-title3`: 22px
- `--font-size-title2`: 28px
- `--font-size-title1`: 34px
- `--font-size-large-title`: 40px

### Color System
- **Primary**: Trust-building blue
- **Success**: Green (deposits, gains)
- **Warning**: Amber (caution)
- **Error**: Red (withdrawals, losses, errors)
- **Neutral Grays**: 50-900 scale

### Border Radius
- `--radius-sm`: 8px
- `--radius-md`: 12px
- `--radius-lg`: 16px
- `--radius-xl`: 20px
- `--radius-full`: 9999px

## 🎯 Component Checklist

Before implementing any component:

- [ ] Uses design tokens (not hardcoded values)
- [ ] Meets minimum touch target (44x44px)
- [ ] Has proper focus states
- [ ] Includes loading states
- [ ] Includes error states
- [ ] Includes empty states
- [ ] Is responsive (mobile-first)
- [ ] Has semantic HTML
- [ ] Uses appropriate typography
- [ ] Follows spacing guidelines
- [ ] Is accessible (WCAG AA minimum)

## ♿ Accessibility

- **WCAG 2.1 AA** minimum compliance
- Full screen reader support
- Keyboard navigation support
- Color contrast ratios met
- Font scaling support
- Reduced motion support

## 🎬 Animations

- **Micro-interactions**: 150-200ms
- **Transitions**: 250-300ms
- **Complex**: 400-500ms
- **Easing**: iOS-standard curves
- **Performance**: 60fps, uses transform/opacity

## 📱 Responsive Design

- **Mobile**: 320px - 768px (primary focus)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+ (if applicable)

## 🔒 Security Considerations

- Mask sensitive information
- Option to hide/show balances
- Clear confirmation for transactions
- Transaction summaries before submission
- Auto-logout after inactivity

## 📖 Next Steps

1. Review [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) for complete guidelines
2. Check [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for code examples
3. Use design tokens from `src/styles/design-tokens.css`
4. Follow component patterns from `src/styles/components.css`
5. Implement features following the checklist above

## 🤝 Contributing

When adding new components or features:

1. Follow the design principles
2. Use design tokens consistently
3. Ensure accessibility compliance
4. Test on multiple devices
5. Update documentation if needed

---

**Remember**: Great design is invisible. Users should focus on their banking tasks, not the interface.
