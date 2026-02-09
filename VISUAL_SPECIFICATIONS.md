# Visual Specifications Document
## Claude Agent Dashboard - Premium Visual System

*Last Updated: February 10, 2026*

---

## Table of Contents
1. [Color System](#color-system)
2. [Gradient Recipes](#gradient-recipes)
3. [Shadow System](#shadow-system)
4. [Border Styles](#border-styles)
5. [Typography](#typography)
6. [Icon Guidelines](#icon-guidelines)
7. [Animation Timing](#animation-timing)
8. [Component Patterns](#component-patterns)
9. [Implementation Examples](#implementation-examples)

---

## Color System

### Primary Palette
```css
/* Claude Orange - Brand Primary */
--claude-orange-base: #f97316;      /* Main brand color */
--claude-orange-light: #fb923c;     /* Lighter variant */
--claude-orange-lighter: #fdba74;   /* Lightest variant */
--claude-orange-dark: #ea580c;      /* Darker variant */

/* Opacity Variants */
--claude-orange-10: rgba(249, 115, 22, 0.1);
--claude-orange-20: rgba(249, 115, 22, 0.2);
--claude-orange-30: rgba(249, 115, 22, 0.3);
--claude-orange-50: rgba(249, 115, 22, 0.5);
--claude-orange-70: rgba(249, 115, 22, 0.7);
```

### Status Colors
```css
/* Success - Green */
--success-base: #4ade80;
--success-glow: rgba(74, 222, 128, 0.5);

/* Warning - Yellow */
--warning-base: #facc15;
--warning-glow: rgba(250, 204, 21, 0.5);

/* Info - Blue */
--info-base: #60a5fa;
--info-glow: rgba(96, 165, 250, 0.5);

/* Error - Red */
--error-base: #f87171;
--error-glow: rgba(248, 113, 113, 0.5);
```

### Neutral Palette
```css
/* Backgrounds */
--bg-primary: rgba(30, 41, 59, 0.98);     /* Card backgrounds */
--bg-secondary: rgba(15, 23, 42, 0.95);   /* Darker cards */
--bg-tertiary: rgba(55, 65, 81, 0.6);     /* Elements */

/* Text */
--text-primary: #ffffff;
--text-secondary: #e2e8f0;
--text-tertiary: #d1d5db;
--text-muted: #9ca3af;
--text-subtle: #6b7280;
```

---

## Gradient Recipes

### 1. Card Background Gradient
```css
background: linear-gradient(
  135deg,
  rgba(30, 41, 59, 0.98) 0%,
  rgba(15, 23, 42, 0.95) 100%
);
```
**Use for:** Primary card backgrounds

### 2. Animated Border Gradient
```css
background: linear-gradient(
  135deg,
  rgba(249, 115, 22, 0.4),   /* Claude Orange */
  rgba(59, 130, 246, 0.3),   /* Blue */
  rgba(168, 85, 247, 0.3),   /* Purple */
  rgba(249, 115, 22, 0.4)    /* Back to Orange */
);
background-size: 400% 400%;
animation: gradientRotate 8s ease infinite;
```
**Use for:** Card hover borders (::before pseudo-element)

### 3. Icon Container Gradient
```css
background: linear-gradient(
  135deg,
  rgba(249, 115, 22, 0.2) 0%,
  rgba(249, 115, 22, 0.08) 100%
);
```
**Use for:** Icon wrapper backgrounds

### 4. Badge Gradient (Status-based)
```css
/* Pending */
background: linear-gradient(
  135deg,
  rgba(234, 179, 8, 0.35) 0%,
  rgba(234, 179, 8, 0.2) 100%
);

/* In Progress */
background: linear-gradient(
  135deg,
  rgba(59, 130, 246, 0.35) 0%,
  rgba(59, 130, 246, 0.2) 100%
);

/* Completed */
background: linear-gradient(
  135deg,
  rgba(34, 197, 94, 0.35) 0%,
  rgba(34, 197, 94, 0.2) 100%
);

/* Blocked */
background: linear-gradient(
  135deg,
  rgba(239, 68, 68, 0.35) 0%,
  rgba(239, 68, 68, 0.2) 100%
);
```

### 5. Progress Bar Gradient
```css
background: linear-gradient(
  90deg,
  #f97316,
  #fb923c,
  #fdba74,
  #fb923c,
  #f97316
);
background-size: 200% 100%;
animation: progressShimmer 3s ease-in-out infinite;
```

### 6. Shimmer Text Gradient
```css
background: linear-gradient(
  120deg,
  #f97316 0%,
  #fb923c 20%,
  #fdba74 40%,
  #ffffff 50%,
  #fdba74 60%,
  #fb923c 80%,
  #f97316 100%
);
background-size: 300% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: shimmerFlow 4s linear infinite;
```

### 7. Body Gradient Mesh
```css
background:
  radial-gradient(
    ellipse at 10% 20%,
    rgba(249, 115, 22, 0.08) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at 90% 80%,
    rgba(59, 130, 246, 0.06) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at 50% 50%,
    rgba(168, 85, 247, 0.04) 0%,
    transparent 50%
  ),
  linear-gradient(
    135deg,
    #0a0e1a 0%,
    #1a1f35 25%,
    #0f1729 50%,
    #1e2538 75%,
    #0a0e1a 100%
  );
background-size: 400% 400%, 400% 400%, 400% 400%, 400% 400%;
```

---

## Shadow System

### Elevation Levels

#### Level 1 - Subtle (Buttons, Small Cards)
```css
box-shadow:
  0 2px 6px rgba(0, 0, 0, 0.25),
  0 1px 2px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

#### Level 2 - Default (Cards)
```css
box-shadow:
  0 20px 60px rgba(0, 0, 0, 0.5),
  0 8px 24px rgba(0, 0, 0, 0.3),
  0 2px 8px rgba(0, 0, 0, 0.2),
  inset 0 1px 0 rgba(255, 255, 255, 0.08),
  inset 0 -1px 0 rgba(0, 0, 0, 0.2);
```

#### Level 3 - Elevated (Hover States)
```css
box-shadow:
  0 30px 90px rgba(0, 0, 0, 0.6),
  0 12px 36px rgba(0, 0, 0, 0.4),
  0 4px 12px rgba(0, 0, 0, 0.3),
  0 0 60px rgba(249, 115, 22, 0.15),
  inset 0 1px 0 rgba(255, 255, 255, 0.12);
```

### Glow Effects

#### Orange Glow (Brand)
```css
box-shadow:
  0 0 20px rgba(249, 115, 22, 0.6),
  0 0 40px rgba(249, 115, 22, 0.4),
  0 2px 4px rgba(0, 0, 0, 0.4);
```

#### Status Glows
```css
/* Success */
box-shadow: 0 0 12px rgba(74, 222, 128, 0.8), 0 0 24px rgba(74, 222, 128, 0.5);

/* Warning */
box-shadow: 0 0 12px rgba(250, 204, 21, 0.8), 0 0 24px rgba(250, 204, 21, 0.5);

/* Info */
box-shadow: 0 0 12px rgba(96, 165, 250, 0.8), 0 0 24px rgba(96, 165, 250, 0.5);

/* Error */
box-shadow: 0 0 12px rgba(248, 113, 113, 0.8), 0 0 24px rgba(248, 113, 113, 0.5);
```

---

## Border Styles

### Standard Border
```css
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Accent Border (Status-based)
```css
/* Orange */
border: 1px solid rgba(249, 115, 22, 0.3);

/* Blue */
border: 1px solid rgba(59, 130, 246, 0.3);

/* Green */
border: 1px solid rgba(34, 197, 94, 0.3);
```

### Left Accent Border
```css
border-left: 4px solid #f97316;
```

### Animated Gradient Border (Hover)
Implemented using `::before` pseudo-element with mask:
```css
.element::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 20px;
  background: linear-gradient(/* gradient recipe */);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.element:hover::before {
  opacity: 1;
}
```

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;
```

### Heading Scale
| Element | Size | Line Height | Letter Spacing | Weight |
|---------|------|-------------|----------------|---------|
| h1 | 36px (2.25rem) | 1.1 | -0.03em | 800 |
| h2 | 30px (1.875rem) | 1.15 | -0.028em | 700 |
| h3 | 24px (1.5rem) | 1.25 | -0.02em | 700 |
| h4 | 20px (1.25rem) | 1.3 | -0.015em | 600 |
| h5 | 18px (1.125rem) | 1.4 | -0.012em | 600 |
| h6 | 16px (1rem) | 1.5 | -0.01em | 600 |

### Body Text Scale
| Class | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| .text-xs | 12px | 1.5 | -0.006em |
| .text-sm | 14px | 1.6 | -0.009em |
| .text-base | 16px | 1.6 | -0.011em |
| .text-lg | 18px | 1.55 | -0.014em |
| .text-xl | 20px | 1.4 | -0.017em |
| .text-2xl | 24px | 1.33 | -0.021em |

### Text Shadows
```css
/* Headings */
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.6);

/* White text */
text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

/* Colored text with glow */
text-shadow:
  0 0 20px rgba(249, 115, 22, 0.6),
  0 0 40px rgba(249, 115, 22, 0.4),
  0 2px 4px rgba(0, 0, 0, 0.4);
```

---

## Icon Guidelines

### Icon Sizes
- **Extra Small:** 12px (h-3 w-3)
- **Small:** 16px (h-4 w-4)
- **Medium:** 20px (h-5 w-5)
- **Large:** 24px (h-6 w-6)
- **Extra Large:** 32px (h-8 w-8)

### Icon Container Pattern
```jsx
<div className="icon-container icon-container-orange">
  <IconComponent className="h-5 w-5 text-white" />
</div>
```

### Icon Container Styles
- **Padding:** 14px
- **Border Radius:** 16px
- **Border:** 1px solid (status color, 30% opacity)
- **Background:** Linear gradient (status color)
- **Hover:** Scale 1.12, rotate -3deg, enhanced glow

### Color Variants
- `icon-container` (Orange - default)
- `icon-container-blue`
- `icon-container-purple`
- `icon-container-green`
- `icon-container-cyan`
- `icon-container-red`
- `icon-container-yellow`

---

## Animation Timing

### Easing Functions
```css
/* Standard */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

/* Deceleration (elements entering) */
--ease-decelerate: cubic-bezier(0.0, 0, 0.2, 1);

/* Acceleration (elements exiting) */
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1);

/* Sharp (quick changes) */
--ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);

/* Bounce */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration Guidelines
| Element | Duration | Use Case |
|---------|----------|----------|
| Micro-interactions | 100-150ms | Button clicks, toggles |
| Transitions | 200-300ms | Hover states, focus |
| Reveals | 300-500ms | Cards appearing, modals |
| Complex animations | 500-800ms | Multi-step transitions |
| Ambient animations | 2-4s | Background effects, pulses |

### Key Animations

#### Fade In Scale
```css
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.92);
  }
  60% {
    opacity: 1;
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
/* Duration: 0.4s, Easing: cubic-bezier(0.4, 0, 0.2, 1) */
```

#### Gradient Rotate
```css
@keyframes gradientRotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
/* Duration: 8s, Easing: ease, Infinite */
```

#### Status Pulse
```css
@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.9);
  }
}
/* Duration: 2.5s, Easing: ease-in-out, Infinite */
```

---

## Component Patterns

### 1. Premium Card
```jsx
<div className="card">
  {/* Card content */}
</div>
```

**CSS Requirements:**
- Border radius: 20px
- Multi-layer shadow system
- Gradient background
- Animated border on hover (::before)
- Inner light reflection (::after)
- Hover: translateY(-6px) scale(1.01)

### 2. Status Badge
```jsx
<span className="badge badge-in-progress">
  In Progress
</span>
```

**Features:**
- Pulsing dot indicator (::before)
- Gradient background
- Border with status color
- Text shadow with glow
- Hover: lift + scale + enhanced glow

### 3. Icon Container
```jsx
<div className="icon-container icon-container-blue">
  <ActivityIcon className="h-5 w-5 text-white" />
</div>
```

**Features:**
- Gradient background
- Rotating highlight (::before)
- Hover: scale + rotate + glow
- Border with color variant

### 4. Progress Bar
```jsx
<div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${percentage}%` }}
  />
</div>
```

**Features:**
- Animated gradient fill
- Shimmer effect
- Light streak animation (::after)
- Glow shadow

### 5. Live Indicator
```jsx
<div className="live-indicator" />
```

**Features:**
- Pulsing glow
- Two ripple rings (::before, ::after)
- Continuous animation

---

## Implementation Examples

### Complete Stat Card
```jsx
<div className="stat-card stat-card-animated">
  <div className="flex items-center justify-between mb-3">
    <div className="icon-container icon-container-blue">
      <UsersIcon className="h-5 w-5 text-white" />
    </div>
    <span className="badge badge-in-progress">Live</span>
  </div>

  <div className="stat-number text-4xl font-extrabold mb-1">
    42
  </div>

  <div className="stat-label text-sm text-gray-400">
    Active Agents
  </div>

  <div className="progress-bar mt-4">
    <div className="progress-fill" style={{ width: '75%' }} />
  </div>
</div>
```

### Section Divider
```jsx
<div className="section-divider" aria-hidden="true" />
```

### Premium Button
```jsx
<button className="bg-claude-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
  View Details
</button>
```

### Glassmorphism Panel
```jsx
<div className="glass-effect p-6 rounded-2xl">
  {/* Content */}
</div>
```

---

## Accessibility Considerations

### Focus States
```css
*:focus-visible {
  outline: 3px solid rgba(249, 115, 22, 0.8);
  outline-offset: 3px;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
}
```

### Reduced Motion
All animations respect `prefers-reduced-motion: reduce`:
```css
@media (prefers-reduced-motion: reduce) {
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast
- Text on dark backgrounds: Minimum 7:1 ratio (WCAG AAA)
- Status colors chosen for visibility
- Text shadows enhance readability

### Touch Targets
- Minimum size: 44x44px (iOS guidelines)
- Interactive elements have adequate spacing
- Hover states also available on focus

---

## Performance Optimization

### CSS-Only Animations
- All animations use CSS transforms and opacity
- Hardware-accelerated properties only
- No JavaScript-based animations for visual effects

### Lazy Loading
- Heavy visual effects on hover only
- Animated borders use `opacity: 0` by default
- Ripple effects triggered by interaction

### Bundle Size
- Total CSS size: ~45KB (uncompressed)
- Gzipped: ~8KB
- No external dependencies for visual effects

---

## Browser Support

### Minimum Requirements
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

### Progressive Enhancement
- Fallbacks for older browsers
- `backdrop-filter` with background fallback
- Gradient borders with solid fallback

---

## Maintenance Guidelines

### Adding New Colors
1. Define in Color System section
2. Create gradient recipe
3. Add glow effect variant
4. Update icon container variants
5. Test accessibility contrast

### Creating New Components
1. Follow existing shadow hierarchy
2. Use standard border radius (12px, 16px, 20px)
3. Include hover states
4. Add focus-visible styles
5. Test with reduced motion

### Updating Animations
1. Use defined easing functions
2. Follow duration guidelines
3. Add to reduced motion query
4. Document in Animation Timing section

---

## Quick Reference

### Most Used Classes
```css
.card                    /* Premium card container */
.stat-card              /* Stat display card */
.badge                  /* Status badge */
.badge-in-progress      /* Blue status */
.badge-completed        /* Green status */
.badge-pending          /* Yellow status */
.badge-blocked          /* Red status */
.icon-container         /* Orange icon wrapper */
.icon-container-blue    /* Blue icon wrapper */
.progress-bar           /* Progress container */
.progress-fill          /* Animated fill */
.live-indicator         /* Pulsing dot */
.section-divider        /* Visual separator */
.glass-effect           /* Glassmorphism */
.shimmer-text           /* Animated gradient text */
.texture-bg             /* Noise overlay */
```

### Color Variables (Custom Properties)
```css
--claude-orange: #f97316
--success: #4ade80
--warning: #facc15
--info: #60a5fa
--error: #f87171
```

---

## Change Log

### v1.0.0 (2026-02-10)
- Initial visual system
- Premium card designs
- Badge system with status indicators
- Progress bars with animations
- Icon container variants
- Comprehensive gradient library
- Shadow system (3 elevation levels)
- Live indicators
- Glassmorphism panels
- Enhanced scrollbar
- Shimmer effects
- Noise texture overlays
- Accessibility features
- Responsive design tokens

---

## Credits

**Design Inspiration:**
- Vercel Dashboard
- Linear App
- Stripe Dashboard
- Apple Design Language

**Accessibility Standards:**
- WCAG 2.2 Level AA/AAA
- iOS Human Interface Guidelines
- Material Design 3

**Animation Principles:**
- Disney's 12 Principles of Animation
- Material Motion System
- Apple Motion Design

---

**Document Version:** 1.0.0
**Last Updated:** February 10, 2026
**Maintained by:** Visual Design Team
