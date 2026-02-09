# Claude Team Dashboard - Design System Documentation
## Version 2.0 | February 2026

---

## Executive Summary

This design system establishes a world-class visual identity for the Claude Team Dashboard, inspired by industry leaders like **Vercel**, **Linear**, and **Stripe**. The system prioritizes **accessibility (WCAG 2.1 AA)**, **modern aesthetics**, **performance**, and **developer experience**.

**Key Philosophy:** Predictable patterns, outcome-driven design, subtle motion, and accessibility-first approach.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Component Patterns](#component-patterns)
5. [Animation & Motion](#animation--motion)
6. [Dark Mode Strategy](#dark-mode-strategy)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Technology Stack](#technology-stack)
9. [Implementation Roadmap](#implementation-roadmap)

---

## Color System

### Primary Palette

Our color system is built on **WCAG 2.1 AA compliance** with minimum contrast ratios of **4.5:1** for normal text and **3:1** for large text.

#### Brand Colors

```css
/* Primary - Claude Orange (Enhanced) */
--color-primary-50: oklch(0.97 0.02 35);   /* #FFF7ED */
--color-primary-100: oklch(0.94 0.05 40);  /* #FFEDD5 */
--color-primary-200: oklch(0.88 0.10 45);  /* #FED7AA */
--color-primary-300: oklch(0.80 0.15 45);  /* #FDBA74 */
--color-primary-400: oklch(0.72 0.18 45);  /* #FB923C */
--color-primary-500: oklch(0.68 0.20 40);  /* #F97316 - Main */
--color-primary-600: oklch(0.60 0.21 35);  /* #EA580C */
--color-primary-700: oklch(0.49 0.18 30);  /* #C2410C */
--color-primary-800: oklch(0.40 0.14 28);  /* #9A3412 */
--color-primary-900: oklch(0.32 0.10 25);  /* #7C2D12 */
--color-primary-950: oklch(0.20 0.06 22);  /* #431407 */
```

#### Neutral Palette (Dark Mode Optimized)

Avoiding pure black (#000000) to reduce eye strain and halation effect.

```css
/* Near-Black to Charcoal */
--color-neutral-950: oklch(0.12 0.01 240);  /* #0E0E0E - Deep charcoal */
--color-neutral-900: oklch(0.18 0.01 245);  /* #1A1F35 - Background dark */
--color-neutral-850: oklch(0.20 0.01 245);  /* #1E2538 - Card background */
--color-neutral-800: oklch(0.24 0.01 248);  /* #1E293B - Elevated surface */
--color-neutral-700: oklch(0.32 0.01 250);  /* #374151 - Borders */
--color-neutral-600: oklch(0.42 0.01 252);  /* #4B5563 - Dividers */
--color-neutral-500: oklch(0.52 0.01 255);  /* #6B7280 - Muted text */
--color-neutral-400: oklch(0.62 0.01 258);  /* #9CA3AF - Secondary text */
--color-neutral-300: oklch(0.72 0.01 260);  /* #D1D5DB - Primary text (dark mode) */
--color-neutral-200: oklch(0.82 0.01 262);  /* #E5E7EB - Off-white text */
--color-neutral-100: oklch(0.92 0.01 265);  /* #F3F4F6 - Almost white */
--color-neutral-50: oklch(0.98 0.01 268);   /* #F9FAFB - Pure white alternative */
```

#### Semantic Colors

```css
/* Success - Green */
--color-success-400: oklch(0.70 0.15 145);  /* #4ADE80 */
--color-success-500: oklch(0.62 0.18 142);  /* #22C55E */
--color-success-600: oklch(0.52 0.16 140);  /* #16A34A */

/* Warning - Yellow/Amber */
--color-warning-400: oklch(0.80 0.12 85);   /* #FBBF24 */
--color-warning-500: oklch(0.74 0.14 82);   /* #EAB308 */
--color-warning-600: oklch(0.64 0.15 78);   /* #CA8A04 */

/* Error - Red */
--color-error-400: oklch(0.65 0.20 25);     /* #F87171 */
--color-error-500: oklch(0.58 0.22 23);     /* #EF4444 */
--color-error-600: oklch(0.50 0.20 20);     /* #DC2626 */

/* Info - Blue */
--color-info-400: oklch(0.70 0.13 245);     /* #60A5FA */
--color-info-500: oklch(0.62 0.15 242);     /* #3B82F6 */
--color-info-600: oklch(0.52 0.16 240);     /* #2563EB */

/* Purple - Accent */
--color-purple-400: oklch(0.72 0.14 295);   /* #C084FC */
--color-purple-500: oklch(0.64 0.16 292);   /* #A855F7 */
--color-purple-600: oklch(0.54 0.17 290);   /* #9333EA */

/* Cyan - Accent */
--color-cyan-400: oklch(0.75 0.10 200);     /* #22D3EE */
--color-cyan-500: oklch(0.67 0.12 198);     /* #06B6D4 */
--color-cyan-600: oklch(0.57 0.13 195);     /* #0891B2 */
```

### Surface Colors (Dark Mode)

```css
/* Layered Surfaces with Depth */
--surface-base: var(--color-neutral-900);           /* Main background */
--surface-elevated-1: var(--color-neutral-850);     /* Card default */
--surface-elevated-2: var(--color-neutral-800);     /* Modal, dropdown */
--surface-elevated-3: var(--color-neutral-700);     /* Hover state */

/* Glass Effect */
--surface-glass: rgba(30, 41, 59, 0.6);
--surface-glass-border: rgba(255, 255, 255, 0.1);
```

### Gradient System

```css
/* Background Gradients */
--gradient-primary: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
--gradient-dark-base: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 25%, #0f1729 50%, #1e2538 75%, #0a0e1a 100%);
--gradient-card: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%);
--gradient-card-hover: linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 0.95) 100%);

/* Accent Gradients */
--gradient-orange-glow: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.5), transparent);
--gradient-blue: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
--gradient-green: linear-gradient(90deg, #10b981 0%, #34d399 100%);
--gradient-purple: linear-gradient(90deg, #a855f7 0%, #c084fc 100%);
```

### Opacity Scale

```css
--opacity-0: 0;
--opacity-5: 0.05;
--opacity-10: 0.1;
--opacity-20: 0.2;
--opacity-30: 0.3;
--opacity-40: 0.4;
--opacity-50: 0.5;
--opacity-60: 0.6;
--opacity-70: 0.7;
--opacity-80: 0.8;
--opacity-90: 0.9;
--opacity-95: 0.95;
--opacity-100: 1;
```

---

## Typography

### Font Families

```css
/* Primary Font Stack - System UI (Modern, Fast Loading) */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
             'Droid Sans', 'Helvetica Neue', sans-serif;

/* Monospace - Code & Data */
--font-mono: 'Menlo', 'Monaco', 'Courier New', monospace;

/* Alternative: Inter (Web Font - Optional Enhancement) */
@import url('https://rsms.me/inter/inter.css');
--font-inter: 'Inter', var(--font-sans);
```

**Recommendation:** Use system fonts by default for performance. Consider **Inter** for enhanced typography with variable font features.

### Type Scale (Perfect Fourth - 1.333)

```css
/* Font Sizes with Optimized Line Heights & Letter Spacing */
--text-xs:    0.75rem;    /* 12px - line-height: 1.5, tracking: -0.006em */
--text-sm:    0.875rem;   /* 14px - line-height: 1.6, tracking: -0.009em */
--text-base:  1rem;       /* 16px - line-height: 1.6, tracking: -0.011em */
--text-lg:    1.125rem;   /* 18px - line-height: 1.55, tracking: -0.014em */
--text-xl:    1.25rem;    /* 20px - line-height: 1.4, tracking: -0.017em */
--text-2xl:   1.5rem;     /* 24px - line-height: 1.33, tracking: -0.021em */
--text-3xl:   1.875rem;   /* 30px - line-height: 1.27, tracking: -0.026em */
--text-4xl:   2.25rem;    /* 36px - line-height: 1.2, tracking: -0.031em */
--text-5xl:   3rem;       /* 48px - line-height: 1.1, tracking: -0.035em */
--text-6xl:   3.75rem;    /* 60px - line-height: 1.0, tracking: -0.04em */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Hierarchy

```css
/* Headings */
h1 {
  font-size: var(--text-4xl);     /* 36px */
  font-weight: var(--font-extrabold);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-neutral-50);
}

h2 {
  font-size: var(--text-3xl);     /* 30px */
  font-weight: var(--font-bold);
  line-height: 1.15;
  letter-spacing: -0.028em;
  color: var(--color-neutral-50);
}

h3 {
  font-size: var(--text-2xl);     /* 24px */
  font-weight: var(--font-bold);
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--color-neutral-50);
}

h4 {
  font-size: var(--text-xl);      /* 20px */
  font-weight: var(--font-semibold);
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--color-neutral-100);
}

h5 {
  font-size: var(--text-lg);      /* 18px */
  font-weight: var(--font-semibold);
  line-height: 1.4;
  letter-spacing: -0.012em;
  color: var(--color-neutral-100);
}

h6 {
  font-size: var(--text-base);    /* 16px */
  font-weight: var(--font-semibold);
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: var(--color-neutral-100);
}

/* Body Text */
.body-primary {
  font-size: var(--text-base);    /* 16px */
  line-height: 1.7;
  letter-spacing: -0.011em;
  color: var(--color-neutral-300);
}

.body-secondary {
  font-size: var(--text-sm);      /* 14px */
  line-height: 1.6;
  letter-spacing: -0.009em;
  color: var(--color-neutral-400);
}

.caption {
  font-size: var(--text-xs);      /* 12px */
  line-height: 1.5;
  letter-spacing: -0.006em;
  color: var(--color-neutral-500);
}
```

---

## Spacing & Layout

### Spacing Scale (8px Base Grid)

```css
/* Spacing System - 8px base unit */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-7: 1.75rem;   /* 28px */
--space-8: 2rem;      /* 32px */
--space-9: 2.25rem;   /* 36px */
--space-10: 2.5rem;   /* 40px */
--space-11: 2.75rem;  /* 44px */
--space-12: 3rem;     /* 48px */
--space-14: 3.5rem;   /* 56px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
--space-40: 10rem;    /* 160px */
```

### Container Widths

```css
--container-xs: 20rem;     /* 320px */
--container-sm: 24rem;     /* 384px */
--container-md: 28rem;     /* 448px */
--container-lg: 32rem;     /* 512px */
--container-xl: 36rem;     /* 576px */
--container-2xl: 42rem;    /* 672px */
--container-3xl: 48rem;    /* 768px */
--container-4xl: 56rem;    /* 896px */
--container-5xl: 64rem;    /* 1024px */
--container-6xl: 72rem;    /* 1152px */
--container-7xl: 80rem;    /* 1280px */
--container-full: 87.5rem; /* 1400px - Dashboard max */
```

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
--breakpoint-3xl: 1920px;
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;     /* 4px */
--radius-base: 0.5rem;    /* 8px */
--radius-md: 0.75rem;     /* 12px */
--radius-lg: 1rem;        /* 16px */
--radius-xl: 1.25rem;     /* 20px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-3xl: 2rem;       /* 32px */
--radius-full: 9999px;    /* Pill shape */
```

### Shadows (Depth Layers)

```css
/* Elevation System */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1),
             0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-base: 0 4px 6px rgba(0, 0, 0, 0.07),
               0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 8px 16px rgba(0, 0, 0, 0.1),
             0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.15),
             0 8px 12px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2),
             0 12px 16px rgba(0, 0, 0, 0.15);
--shadow-2xl: 0 32px 64px rgba(0, 0, 0, 0.3),
              0 16px 24px rgba(0, 0, 0, 0.2);

/* Glow Effects */
--shadow-glow-orange: 0 0 30px rgba(249, 115, 22, 0.4),
                      0 8px 24px rgba(249, 115, 22, 0.2);
--shadow-glow-blue: 0 0 30px rgba(59, 130, 246, 0.4),
                    0 8px 24px rgba(59, 130, 246, 0.2);
--shadow-glow-green: 0 0 30px rgba(34, 197, 94, 0.4),
                     0 8px 24px rgba(34, 197, 94, 0.2);
```

---

## Component Patterns

### Card Components

#### Base Card

```css
.card {
  background: var(--gradient-card);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl), 0 0 0 1px rgba(249, 115, 22, 0.2);
  border-color: rgba(249, 115, 22, 0.2);
}
```

#### Stat Card

```css
.stat-card {
  background: var(--gradient-card);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  border: 1px solid var(--color-neutral-700);
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-orange-glow);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl), 0 0 0 1px rgba(249, 115, 22, 0.3);
  border-color: rgba(249, 115, 22, 0.3);
}

.stat-card:hover::before {
  opacity: 1;
}
```

#### Glass Card

```css
.glass-card {
  background: var(--surface-glass);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--surface-glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Badge Components

```css
.badge {
  padding: 0.375rem 0.875rem;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  line-height: 1.4;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  transition: all 0.3s ease;
  font-feature-settings: 'tnum' 1;
  box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.badge-success {
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.25) 0%, rgba(34, 197, 94, 0.2) 100%);
  color: var(--color-success-400);
  border: 1px solid rgba(74, 222, 128, 0.4);
}

.badge-warning {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(234, 179, 8, 0.2) 100%);
  color: var(--color-warning-400);
  border: 1px solid rgba(251, 191, 36, 0.4);
}

.badge-error {
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.25) 0%, rgba(239, 68, 68, 0.2) 100%);
  color: var(--color-error-400);
  border: 1px solid rgba(248, 113, 113, 0.4);
}

.badge-info {
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(59, 130, 246, 0.2) 100%);
  color: var(--color-info-400);
  border: 1px solid rgba(96, 165, 250, 0.4);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(96, 165, 250, 0.2);
  }
  50% {
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(96, 165, 250, 0.3);
  }
}
```

### Button Components

```css
/* Primary Button */
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  border: none;
  box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  filter: brightness(1.1);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Secondary Button */
.btn-secondary {
  background: var(--color-neutral-800);
  color: var(--color-neutral-200);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  border: 1px solid var(--color-neutral-700);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--color-neutral-700);
  border-color: var(--color-neutral-600);
  color: white;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--color-neutral-300);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-ghost:hover {
  background: var(--color-neutral-800);
  color: white;
}
```

### Input Components

```css
.input {
  background: var(--color-neutral-850);
  border: 1px solid var(--color-neutral-700);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--color-neutral-200);
  font-size: var(--text-sm);
  font-family: var(--font-sans);
  transition: all 0.2s ease;
  width: 100%;
}

.input:hover {
  border-color: var(--color-neutral-600);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  background: var(--color-neutral-800);
}

.input::placeholder {
  color: var(--color-neutral-500);
}
```

### Progress Bar

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-neutral-700);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.progress-bar-fill.success {
  background: var(--gradient-green);
}

.progress-bar-fill.info {
  background: var(--gradient-blue);
}

.progress-bar-fill.warning {
  background: linear-gradient(90deg, #eab308 0%, #fbbf24 100%);
}

/* Animated shimmer effect */
.progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## Animation & Motion

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Durations

```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-medium: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

### Core Animations

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn var(--duration-medium) var(--ease-out);
}

/* Slide In Right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight var(--duration-medium) var(--ease-out);
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}

/* Spin */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Gradient Flow */
@keyframes gradient-flow {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient-flow 3s ease infinite;
}
```

### Micro-Interactions

**Best Practices:**
- Duration: 150-300ms for most interactions
- Use `transform` and `opacity` for performance (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (triggers layout)
- Add subtle hover states to all interactive elements
- Include loading states with skeleton screens or spinners

```css
/* Hover Lift Effect */
.hover-lift {
  transition: transform var(--duration-base) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

/* Hover Glow Effect */
.hover-glow {
  transition: box-shadow var(--duration-medium) var(--ease-out);
}

.hover-glow:hover {
  box-shadow: var(--shadow-glow-orange);
}

/* Scale on Press */
.active-scale {
  transition: transform var(--duration-fast) var(--ease-in-out);
}

.active-scale:active {
  transform: scale(0.95);
}
```

---

## Dark Mode Strategy

### Why Dark Mode First?

1. **Reduced eye strain** during extended use
2. **Better for low-light environments** (operations/monitoring)
3. **OLED-friendly** (battery savings on mobile)
4. **Professional aesthetic** for developer tools

### Implementation Approach

**Current Status:** Dashboard is dark-mode only. **Future:** Optional light mode toggle.

```css
/* Dark Mode (Default) */
:root {
  color-scheme: dark;

  /* Surface Colors */
  --bg-base: var(--color-neutral-900);
  --bg-elevated: var(--color-neutral-850);
  --bg-hover: var(--color-neutral-800);

  /* Text Colors */
  --text-primary: var(--color-neutral-50);
  --text-secondary: var(--color-neutral-300);
  --text-muted: var(--color-neutral-500);

  /* Border Colors */
  --border-base: var(--color-neutral-700);
  --border-hover: var(--color-neutral-600);
}

/* Future: Light Mode */
@media (prefers-color-scheme: light) {
  .light-mode {
    color-scheme: light;

    --bg-base: #ffffff;
    --bg-elevated: #f9fafb;
    --bg-hover: #f3f4f6;

    --text-primary: #111827;
    --text-secondary: #4b5563;
    --text-muted: #9ca3af;

    --border-base: #e5e7eb;
    --border-hover: #d1d5db;
  }
}
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast

- **Normal text (< 18px):** Minimum 4.5:1 contrast ratio
- **Large text (≥ 18px or ≥ 14px bold):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Stark Plugin](https://www.getstark.co/)

#### Touch Target Size

- **Minimum:** 24×24 CSS pixels (WCAG 2.5.8)
- **Recommended:** 44×44 CSS pixels

```css
.btn, .link, .interactive {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-3) var(--space-4);
}
```

#### Focus Indicators

```css
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

#### Semantic HTML

- Use `<button>` for actions, `<a>` for navigation
- Include `aria-label` for icon-only buttons
- Provide `alt` text for all images
- Use proper heading hierarchy (`h1` → `h2` → `h3`)

#### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order should follow visual order
- Provide skip links for navigation

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

#### Screen Reader Support

```html
<!-- Example: Loading State -->
<div role="status" aria-live="polite" aria-busy="true">
  Loading data...
</div>

<!-- Example: Modal -->
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Action</h2>
  <!-- Content -->
</div>
```

#### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Technology Stack

### Recommended Stack (2026)

Based on research and current trends, here's the optimal technology stack:

#### Core Framework

**React 19.2.3** (CRITICAL SECURITY UPDATE)
- ⚠️ **CVE-2025-55182 (React2Shell)** - Must upgrade from React 19.0-19.2.0
- React Compiler 1.0 (stable) - automatic memoization
- Server Components & Actions (stable)
- New hooks: `useActionState`, `useOptimistic`, `use`

```bash
npm install react@19.2.3 react-dom@19.2.3
```

#### Build Tool

**Vite 8.0** (Beta - December 2025)
- Rolldown integration (Rust-based bundler)
- 46s → 6s builds (87% faster)
- Full Bundle Mode: 3x faster dev startup, 10x fewer requests

```bash
npm create vite@latest
```

**Alternative:** Next.js 16.1.1 (if SSR needed)
- Turbopack (default bundler, 5-10x faster HMR)
- React Compiler integration (stable)
- `use cache` directive for caching

#### Styling

**Tailwind CSS v4.0** (January 22, 2025)
- **Oxide engine** (Rust-based, 5x faster builds, 100x faster incremental)
- **CSS-first configuration** (no more `tailwind.config.js`)
- Lightning CSS integration
- Container queries, 3D transforms

```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

**Component Library:** **shadcn/ui**
- 50+ accessible components
- Tailwind v4 support
- Copy-paste, not NPM package
- Full customization

```bash
npx shadcn@latest init
npx shadcn@latest add button dialog dropdown-menu
```

**Alternative:** **Radix UI** (Headless components)
- WCAG-compliant patterns
- Focus management, keyboard navigation
- Unstyled, full control

#### State Management

**TanStack Query v5.90.14** (Recommended)
- Server state management
- 60-70% market share
- Suspense stable, framework-agnostic

```bash
npm install @tanstack/react-query
```

**Zustand v5.0.9** (Simple global state)
- ~1KB, zero boilerplate
- Persist middleware

#### Animation

**Framer Motion**
- Physics-based animations
- Gesture support
- Layout animations

```bash
npm install framer-motion
```

#### Icons

**Lucide React**
- Modern, clean icons
- Tree-shakeable
- Already in use

```bash
npm install lucide-react
```

#### Testing

**Vitest 4.0.16**
- 50-80% faster than Jest
- Browser Mode (stable)
- Visual regression: `toMatchScreenshot()`

**Playwright 1.57.0** (E2E)
- Chrome for Testing support
- WebSocket mocking
- ARIA snapshots

#### TypeScript

**TypeScript 5.8** (March 2025)
- Improved conditional return types
- Better inference
- ES2024 target

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

**Goals:**
- Migrate to Tailwind CSS v4
- Implement design tokens
- Create base component library

**Tasks:**
1. Install Tailwind v4: `npm install tailwindcss@next`
2. Create `src/styles/theme.css` with design tokens
3. Migrate existing CSS to Tailwind utilities
4. Set up `shadcn/ui` or Radix UI
5. Create base components:
   - Button (primary, secondary, ghost)
   - Card (base, stat, glass)
   - Badge (success, warning, error, info)
   - Input, Select, Checkbox

**Deliverables:**
- `theme.css` with complete design tokens
- Component library storybook
- Migration guide documentation

### Phase 2: Component Redesign (Week 3-4)

**Goals:**
- Redesign all dashboard components
- Implement new color system
- Add micro-interactions

**Tasks:**
1. **StatsOverview:** Enhanced stat cards with hover effects
2. **TeamCard:** Glass effect, improved hierarchy
3. **TaskList:** Better status indicators, progress visualization
4. **AgentCard:** Profile-style cards with gradients
5. **LiveMetrics:** Real-time animations, gradient fills
6. **ActivityFeed:** Timeline design, smooth transitions

**Deliverables:**
- Redesigned components
- Animation library
- Updated props/API documentation

### Phase 3: Polish & Optimization (Week 5-6)

**Goals:**
- Add advanced animations
- Optimize performance
- Accessibility audit

**Tasks:**
1. Implement Framer Motion animations
2. Add loading states and skeleton screens
3. Optimize bundle size
4. Run accessibility audit (axe-core, Lighthouse)
5. Add keyboard navigation
6. Test with screen readers

**Deliverables:**
- Performance report (Core Web Vitals)
- Accessibility compliance report
- Final design system documentation

### Phase 4: Documentation & Handoff (Week 7)

**Goals:**
- Complete design system documentation
- Create usage guidelines
- Developer handoff

**Tasks:**
1. Finalize DESIGN_SYSTEM.md
2. Create component usage examples
3. Record video tutorials
4. Set up design system playground
5. Knowledge transfer sessions

**Deliverables:**
- Complete design system documentation
- Component playground/Storybook
- Developer guidelines
- Video tutorials

---

## Component Usage Examples

### Example 1: Enhanced Stat Card

```jsx
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

function StatCard({ label, value, trend, icon: Icon }) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="icon-container-blue">
          <Icon className="h-5 w-5 text-white" />
        </div>
        {trend && (
          <span className="text-xs text-green-400 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {trend}%
          </span>
        )}
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-number">{value}</p>
      </div>
    </motion.div>
  );
}
```

### Example 2: Gradient Text

```jsx
function PageTitle({ children }) {
  return (
    <h1 className="gradient-text">
      {children}
    </h1>
  );
}

/* CSS */
.gradient-text {
  background: linear-gradient(135deg, #ff8a3d 0%, #fb923c 50%, #f97316 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 3s ease infinite;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.3));
}
```

### Example 3: Glass Card with Blur

```jsx
function GlassCard({ children, className }) {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
}

/* CSS */
.glass-card {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

## Design Principles Summary

1. **Predictable Patterns:** Use familiar, trusted interfaces (Linear, Vercel-inspired)
2. **Outcome-Driven:** Every design decision supports user goals
3. **Accessibility-First:** WCAG 2.1 AA compliance minimum
4. **Performance Optimized:** GPU-accelerated animations, lazy loading
5. **Motion with Purpose:** Subtle micro-interactions, no gratuitous animation
6. **Dark Mode Excellence:** Avoid pure black, use charcoal tones
7. **Consistent Spacing:** 8px base grid system
8. **Clear Hierarchy:** Typography scale, color contrast, visual weight
9. **Responsive by Default:** Mobile-first, progressive enhancement
10. **Developer-Friendly:** Well-documented, easy to extend

---

## Resources & Tools

### Design Tools
- **Figma:** Design and prototyping
- **Stark:** Accessibility testing plugin
- **Coolors:** Color palette generation

### Development Tools
- **Vite:** Build tool
- **Tailwind CSS v4:** Styling
- **shadcn/ui:** Component library
- **Framer Motion:** Animations
- **Vitest:** Testing

### Accessibility Tools
- **axe DevTools:** Browser extension
- **Lighthouse:** Chrome DevTools
- **WAVE:** Web accessibility evaluator
- **NVDA:** Screen reader (Windows)
- **VoiceOver:** Screen reader (Mac)

### Resources
- [Tailwind CSS v4.0 Documentation](https://tailwindcss.com/blog/tailwindcss-v4)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

## Sources

### Modern Dashboard Design Trends
- [Curated Dashboard Design Examples for UI Inspiration (2026) | Muzli Blog](https://muz.li/blog/best-dashboard-design-examples-inspirations-for-2026/)
- [12 UI/UX Design Trends That Will Dominate 2026 (Data-Backed)](https://www.index.dev/blog/ui-ux-design-trends)
- [UI And UX Design Trends For 2026 - Raw.Studio](https://raw.studio/blog/ui-and-ux-design-trends-for-2026-what-founders-and-designers-need-to-know/)

### Dark Mode & Color Palettes
- [Designing for Dark Mode: UI Tips and Tools](https://www.wildnetedge.com/blogs/dark-mode-ui-essential-tips-for-color-palettes-and-accessibility)
- [Accessible Color Palette Generator | WCAG Compliant](https://venngage.com/tools/accessible-color-palette-generator)
- [InclusiveColors: WCAG accessible color palette creator](https://www.inclusivecolors.com/)

### Tailwind CSS v4 & Design Tokens
- [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS Best Practices 2025-2026 | FrontendTools](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)
- [Tailwind CSS 4 @theme: The Future of Design Tokens](https://medium.com/@sureshdotariya/tailwind-css-4-theme-the-future-of-design-tokens-at-2025-guide-48305a26af06)

### Component Libraries
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Headless UI vs Radix UI](https://www.lodely.com/blog/headless-ui-vs-radix-ui)

### Animation Best Practices
- [Framer Motion: Mastering Animations in React](https://medium.com/@pareekpnt/mastering-framer-motion-a-deep-dive-into-modern-animation-for-react-0e71d86ffdf6)
- [Advanced animation patterns with Framer Motion](https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/)
- [Motion UI Trends 2026](https://lomatechnology.com/blog/motion-ui-trends-2026/2911)

---

## Version History

- **v2.0** (February 2026) - Complete design system overhaul
- **v1.0** (Initial) - Basic styling with custom CSS

---

**Document Owner:** Lead UX/UI Designer
**Last Updated:** February 10, 2026
**Next Review:** April 2026
