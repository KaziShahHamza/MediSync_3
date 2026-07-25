# Styles & Design System

## Design Philosophy

**MediSync** follows a **modern, clean, professional healthcare design** system that prioritizes:
- **Clarity**: Medical information must be crystal clear
- **Trust**: Professional appearance for sensitive health data
- **Accessibility**: Usable by all age groups and abilities
- **Consistency**: Uniform patterns across the entire application
- **Efficiency**: Quick access to critical information

---

## Color Palette

### Primary Colors
- **Primary Blue** `#2563EB` (rgb: 37, 99, 235)
  - Main brand color for buttons, links, headers
  - Conveys trust and professionalism
  - Usage: Primary CTAs, links, primary text

- **Primary Hover** `#1E4ED8` (rgb: 29, 78, 216)
  - Darker shade for hover states
  - Usage: Button hover, active states

### Accent Colors
- **Accent Cyan** `#0EA5E9` (rgb: 14, 165, 233)
  - Secondary highlight color
  - Usage: Secondary buttons, accents, highlights
  - Energetic and approachable

### Neutral Colors
- **Background** `#F8FAFC` (rgb: 248, 250, 252)
  - Page background, light fill
  - Very light blue-gray, easy on eyes

- **Card** `#FFFFFF` (rgb: 255, 255, 255)
  - Component backgrounds, cards, containers
  - Pure white for content areas

- **Text Primary** `#0F172A` (rgb: 15, 23, 42)
  - Main readable text
  - High contrast with backgrounds
  - Usage: Headings, body text

- **Text Secondary** `#475569` (rgb: 71, 85, 105)
  - Secondary information
  - Lower contrast, visually lighter
  - Usage: Subheadings, metadata

- **Text Muted** `#64748B` (rgb: 100, 116, 139)
  - Disabled text, helper text, hints
  - Very low contrast
  - Usage: Placeholders, disabled states, footnotes

- **Border** `#E2E8F0` (rgb: 226, 232, 240)
  - Dividers, borders, separators
  - Subtle, doesn't compete with content

### Status Colors
- **Success** `#16A34A` (rgb: 22, 163, 74)
  - Green for positive actions and messages
  - Usage: Success states, positive indicators

- **Warning** `#F59E0B` (rgb: 245, 158, 11)
  - Amber for caution and alerts
  - Usage: Warning messages, pending states

- **Danger** `#DC2626` (rgb: 220, 38, 38)
  - Red for errors and critical information
  - Usage: Error messages, destructive actions

### Health-Specific Colors (Future Enhancement)
- **Blood Pressure Chart**: Blue gradient `#0EA5E9` → `#2563EB`
- **Blood Sugar Chart**: Orange/Amber `#F59E0B` (warning levels)
- **BMI Chart**: Green for healthy `#16A34A`, Yellow for overweight `#F59E0B`, Red for obese `#DC2626`

---

## Typography System

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

Fallback order:
1. Apple system fonts (macOS, iOS)
2. Windows: Segoe UI
3. Android: Roboto
4. Generic sans-serif

### Font Sizes
| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| H1 | 48px | 700 (bold) | 1.2 | Page titles, hero sections |
| H2 | 36px | 700 (bold) | 1.25 | Section titles |
| H3 | 28px | 700 (bold) | 1.3 | Subsection titles |
| H4 | 24px | 700 (bold) | 1.35 | Component titles |
| Body Large | 18px | 400 (normal) | 1.6 | Large body text |
| Body | 16px | 400 (normal) | 1.5 | Standard text, paragraphs |
| Body Small | 14px | 400 (normal) | 1.5 | Secondary text, labels |
| Label | 12px | 500 (medium) | 1.4 | Form labels, captions |
| Caption | 12px | 400 (normal) | 1.4 | Footnotes, metadata |

### Font Weights
- **400 (Regular)**: Body text, standard content
- **500 (Medium)**: Labels, secondary headings
- **600 (Semibold)**: Form labels, emphasized text
- **700 (Bold)**: Headings, strong emphasis

### Line Heights (for readability)
- **Headings**: 1.2 - 1.35 (tighter for hierarchy)
- **Body**: 1.5 - 1.6 (comfortable reading)
- **Large text**: 1.6+ (extra readable)

### Letter Spacing
- Default: 0 (normal)
- Headings: -0.02em (slight tightening for better aesthetics)
- Metadata: 0.05em (subtle widening for distinction)

---

## Spacing System

### Base Unit: 4px
All spacing uses multiples of 4px for consistency.

| Unit | Pixels | Token | Usage |
|------|--------|-------|-------|
| xs | 4px | `gap-1` | Tight spacing, rarely used |
| sm | 8px | `gap-2` | Minimal spacing |
| md | 12px | `gap-3` | Small components spacing |
| base | 16px | `gap-4` | Standard spacing |
| lg | 20px | `gap-5` | Component internal spacing |
| xl | 24px | `gap-6` | Card padding, section spacing |
| 2xl | 32px | `gap-8` | Large section spacing |
| 3xl | 40px | `gap-10` | Hero section spacing |
| 4xl | 48px | `gap-12` | Major section separation |

### Common Spacing Patterns

**Card**:
```css
padding: 24px;           /* 1x xl */
border-radius: 8px;
gap: 16px;              /* between children */
margin-bottom: 16px;
```

**Button**:
```css
padding: 8px 16px;      /* y: sm, x: base */
border-radius: 6px;
gap: 8px;               /* button text + icon */
```

**Form Field**:
```css
padding: 12px;          /* md */
border-radius: 6px;
margin-bottom: 16px;    /* space to next field */
```

**Section Container**:
```css
padding: 48px 24px;     /* y: 4xl, x: xl */
margin-bottom: 48px;    /* separate sections */
```

---

## Shadow System

### Elevation Scale
```css
--shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.05);
--shadow-sm: 0 2px 4px rgba(15, 23, 42, 0.05);
--shadow-md: 0 4px 8px rgba(15, 23, 42, 0.08);
--shadow-lg: 0 8px 16px rgba(15, 23, 42, 0.1);
--shadow-xl: 0 12px 24px rgba(15, 23, 42, 0.12);

/* Card specific */
--shadow-card: 0 1px 2px rgba(15, 23, 42, 0.05);
--shadow-card-hover: 0 8px 24px rgba(15, 23, 42, 0.08);
```

### Usage
- **Resting state**: shadow-sm or shadow-card
- **Hover state**: shadow-md or shadow-card-hover
- **Modal/Dialog**: shadow-xl
- **Floating buttons**: shadow-lg
- **Interactive elements**: Elevate on hover

### Tailwind Classes
```
shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl
hover:shadow-lg transition
```

---

## Border Radius Scale

| Size | Pixels | Usage |
|------|--------|-------|
| xs | 2px | Minimal rounding |
| sm | 4px | Slight rounding |
| base | 6px | Standard buttons, inputs |
| md | 8px | Cards, containers |
| lg | 12px | Larger components |
| full | 9999px | Pills, badges, circles |

### Application
- **Buttons**: `border-radius: 6px` (base)
- **Cards**: `border-radius: 8px` (md)
- **Inputs**: `border-radius: 6px` (base)
- **Modals**: `border-radius: 12px` (lg)
- **Badges**: `border-radius: 9999px` (full/pill)

---

## Component States

### Button States
```
Default
├─ Hover (darker background, elevated shadow)
├─ Active (pressed appearance)
├─ Disabled (reduced opacity, cursor: not-allowed)
└─ Loading (spinner overlay)
```

### Input States
```
Default
├─ Focus (blue border, shadow ring)
├─ Filled (user entered value)
├─ Error (red border, error message)
├─ Disabled (grayed out, cursor: not-allowed)
└─ Success (green checkmark, success message)
```

### Card States
```
Default
├─ Hover (elevated shadow, slight scale)
├─ Active (highlighted border)
└─ Loading (skeleton or spinner)
```

### Transitions
```css
transition: all 0.2s ease;
transition: background-color 0.2s ease, box-shadow 0.2s ease;
```

---

## Responsive Design

### Breakpoints
| Name | Size | Device |
|------|------|--------|
| (none) | 0px | Mobile |
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Large screens |
| 2xl | 1536px | Extra large screens |

### Mobile-First Approach
```html
<!-- Mobile by default, enhance for larger screens -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
</div>
```

### Common Responsive Patterns

**Container**:
```html
<div class="px-4 md:px-6 lg:px-8">
  <!-- Padding adjusts based on screen size -->
</div>
```

**Grid Layout**:
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  <!-- Dashboard cards: 1 col mobile, 2 tablet, 4 desktop -->
</div>
```

**Navigation**:
```html
<nav class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
  <!-- Stacked on mobile, horizontal on desktop -->
</nav>
```

---

## Dark Mode (Future Enhancement)

### Color Mapping for Dark Mode
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: 15 23 42;           /* Dark background */
    --color-card: 30 41 59;         /* Slightly lighter dark */
    --color-text: 241 245 250;      /* Light text */
    --color-border: 71 85 105;      /* Lighter border */
  }
}
```

### Toggle Implementation (Future)
```javascript
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

---

## Accessibility (A11y)

### Color Contrast
- **AAA Standard**: Ratio of 7:1
- **AA Standard**: Ratio of 4.5:1
- Our colors meet **AA standard** minimum

### Focus States
```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Alternative using ring utility */
focus:ring-2 focus:ring-offset-2 focus:ring-primary
```

### High Contrast Mode Support
```css
@media (prefers-contrast: more) {
  /* Increase color contrast for users who prefer it */
  color: #000000;  /* Even darker text */
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Screen Reader Support
```jsx
// Descriptive alt text for images
<img alt="Blood pressure chart showing weekly trend" src="..." />

// ARIA labels for icons
<button aria-label="Add new medicine">
  <Plus size={20} />
</button>

// Semantic HTML
<header>, <nav>, <main>, <footer>, <section>, <article>
```

---

## Icon Design Guidelines

### Icon Sizing
| Context | Size | CSS Class |
|---------|------|-----------|
| Inline text | 16px | `size-4` |
| Form labels | 18px | `size-4.5` |
| Buttons | 20px | `size-5` |
| Card headers | 24px | `size-6` |
| Section headers | 28px | `size-7` |
| Hero icons | 32-48px | `size-8` to `size-12` |

### Icon Colors
- **Primary action**: Primary blue `#2563EB`
- **Secondary action**: Accent cyan `#0EA5E9`
- **Danger action**: Danger red `#DC2626`
- **Success indicator**: Success green `#16A34A`
- **Neutral**: Text muted `#64748B`

### Icon Usage Pattern
```jsx
import { Heart, Pill, Activity } from 'lucide-react';

<Heart size={24} className="text-primary" />
<Pill size={20} className="text-success" />
<Activity size={20} className="text-muted" />
```

---

## Animation Guidelines

### Preferred Transitions
- **Quick interactions**: 0.1s - 0.2s
- **Standard transitions**: 0.2s - 0.3s
- **Deliberate actions**: 0.3s - 0.5s

### Timing Functions
- **Ease-in-out**: Standard, smooth motion
- **Ease-out**: Objects entering view
- **Ease-in**: Objects leaving view
- **Linear**: For continuous motion

### Animation Examples
```css
/* Button hover */
transition: background-color 0.2s ease, box-shadow 0.2s ease;

/* Page transitions */
transition: opacity 0.3s ease-in-out;

/* Chart animations */
animation: slideUp 0.4s ease-out;
```

### Reduced Motion Respect
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Design Patterns

### Card Component
```jsx
<div className="bg-card rounded-md p-6 shadow-card hover:shadow-card-hover transition">
  <h3 className="text-xl font-bold text-text-primary mb-4">Title</h3>
  <p className="text-text-secondary">Content</p>
</div>
```

**Characteristics**:
- White background
- Subtle shadow
- Elevated on hover
- Medium border radius
- Standard padding

### Button Component
```jsx
<button className="px-6 py-2 bg-primary text-white rounded-base hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed">
  Action
</button>
```

**Variants**:
- **Primary**: Blue background, white text
- **Secondary**: Cyan background, white text
- **Ghost**: Transparent, colored text border
- **Danger**: Red background, white text

### Form Input Component
```jsx
<input
  className="w-full px-4 py-2 border border-border rounded-base focus:outline-none focus:ring-2 focus:ring-primary"
  placeholder="Enter value"
/>
```

**States**:
- Default: Gray border
- Focus: Blue ring, no outline
- Error: Red border
- Disabled: Gray background, opacity-50

---

## Layout Patterns

### Container Widths
```css
/* Mobile: Full width with padding */
padding: 0 1rem;  /* 16px */

/* Tablet (md): 90% width, centered */
max-width: 90%;
margin: 0 auto;

/* Desktop (lg+): Fixed max-width */
max-width: 1200px;
margin: 0 auto;
```

### Section Structure
```
┌─────────────────────────────────┐
│      Navigation Bar             │  Fixed/Sticky
├─────────────────────────────────┤
│                                 │
│  Hero Section                   │  Full width, colored background
│                                 │
├─────────────────────────────────┤
│  Container (max-width)          │
│                                 │
│  Content Section 1              │  24px padding, 48px gap
│  ...                            │
│                                 │
│  Content Section 2              │
│  ...                            │
│                                 │
├─────────────────────────────────┤
│      Footer                     │  Full width
└─────────────────────────────────┘
```

---

## Design System Checklist

When creating new UI components, ensure:

### Visual Design
- [ ] Uses colors from approved palette
- [ ] Typography follows scale
- [ ] Spacing follows 4px grid
- [ ] Border radius is consistent
- [ ] Shadow depth is appropriate
- [ ] Responsive at all breakpoints

### Interaction Design
- [ ] Hover states are visible
- [ ] Focus states are clear
- [ ] Disabled states are obvious
- [ ] Loading states are indicated
- [ ] Error states are prominent

### Accessibility
- [ ] Color contrast meets AA standard
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] ARIA labels where needed
- [ ] Semantic HTML used
- [ ] Respects prefers-reduced-motion

### Code Quality
- [ ] Uses design tokens (CSS variables)
- [ ] Tailwind classes when available
- [ ] No hard-coded colors
- [ ] DRY principle followed
- [ ] Well-commented
- [ ] Consistent naming

---

## Brand Usage Guidelines

### Logo
- Minimum size: 32px
- Clear space: Equal to logo height on all sides
- Colors: Primary blue or white (on dark backgrounds)

### Writing Tone
- Professional yet approachable
- Clear and concise
- Healthcare-focused terminology
- Patient-friendly explanations

### Photography & Imagery
- Healthcare professionals: Real, diverse, authentic
- Healthcare settings: Modern, clean, trustworthy
- Avoid: Overly staged, unrealistic scenes

### Supported Languages (Future)
- English (primary)
- Spanish (es_ES)
- French (fr_FR)
- German (de_DE)

---

## Tools for Design System

### Utilities
- Tailwind CSS for rapid styling
- Lucide React for consistent icons
- Chart.js for healthcare metrics visualization

### Future Enhancements
- Storybook for component documentation
- Figma for design handoff
- Design tokens generator

---

## References

### Documentation
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Principles](https://material.io/design)
- [Lucide Icons](https://lucide.dev)

### Inspiration
- Healthcare design examples
- Moderna, Affirm, Stripe design systems
