# Component Library Guide
## Claude Team Dashboard - Modern UI Components

---

## Table of Contents

1. [Button Components](#button-components)
2. [Card Components](#card-components)
3. [Badge Components](#badge-components)
4. [Input Components](#input-components)
5. [Progress Components](#progress-components)
6. [Icon Containers](#icon-containers)
7. [Animation Components](#animation-components)
8. [Layout Components](#layout-components)

---

## Button Components

### Primary Button

**Usage:** Main call-to-action buttons

```jsx
<button className="
  bg-gradient-to-r from-primary-500 to-primary-400
  text-white font-semibold text-sm
  px-6 py-3 rounded-md
  shadow-sm hover:shadow-md
  transition-all duration-200
  hover:-translate-y-0.5
  active:translate-y-0
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
">
  Primary Action
</button>
```

### Secondary Button

**Usage:** Secondary actions, cancel buttons

```jsx
<button className="
  bg-neutral-800 border border-neutral-700
  text-neutral-200 font-semibold text-sm
  px-6 py-3 rounded-md
  hover:bg-neutral-700 hover:border-neutral-600 hover:text-white
  transition-colors duration-200
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
">
  Secondary Action
</button>
```

### Ghost Button

**Usage:** Tertiary actions, subtle interactions

```jsx
<button className="
  bg-transparent text-neutral-300
  font-medium text-sm px-6 py-3 rounded-md
  border border-transparent
  hover:bg-neutral-800 hover:text-white
  transition-all duration-200
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2
">
  Ghost Action
</button>
```

### Icon Button

**Usage:** Icon-only actions (must meet 44×44px touch target)

```jsx
import { Settings } from 'lucide-react';

<button
  className="
    p-3 rounded-md
    bg-neutral-800 border border-neutral-700
    text-neutral-300 hover:text-white
    hover:bg-neutral-700 hover:border-neutral-600
    transition-all duration-200
    min-w-[44px] min-h-[44px]
    flex items-center justify-center
  "
  aria-label="Settings"
>
  <Settings className="h-5 w-5" />
</button>
```

---

## Card Components

### Base Card

**Usage:** Default container for content sections

```jsx
<div className="
  bg-gradient-to-br from-neutral-850/95 to-neutral-900/90
  rounded-lg p-6
  border border-white/5
  shadow-lg backdrop-blur-md
  hover:-translate-y-0.5 hover:shadow-xl
  hover:border-primary-500/20
  transition-all duration-300
">
  <h3 className="text-xl font-bold text-white mb-4">Card Title</h3>
  <p className="text-neutral-300">Card content goes here...</p>
</div>
```

### Stat Card

**Usage:** Displaying metrics and statistics

```jsx
<div className="
  bg-gradient-to-br from-neutral-850/95 to-neutral-900/90
  rounded-lg p-5
  border border-neutral-700
  backdrop-blur-md
  relative overflow-hidden
  hover:-translate-y-1 hover:shadow-xl
  hover:border-primary-500/30
  transition-all duration-300
  group
">
  {/* Top accent line (appears on hover) */}
  <div className="
    absolute top-0 left-0 right-0 h-0.5
    bg-gradient-to-r from-transparent via-primary-500 to-transparent
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
  " />

  {/* Icon */}
  <div className="inline-flex p-2 rounded-lg bg-info-500/20 mb-3">
    <TrendingUp className="h-5 w-5 text-info-400" />
  </div>

  {/* Stat */}
  <div>
    <p className="
      text-xs font-semibold text-neutral-400
      uppercase tracking-wide
    ">
      Active Agents
    </p>
    <p className="
      text-4xl font-extrabold text-white mt-1
      tabular-nums
    ">
      24
    </p>
  </div>
</div>
```

### Glass Card

**Usage:** Overlay content, modals, popovers

```jsx
<div className="
  bg-neutral-850/60
  backdrop-blur-xl saturate-150
  border border-white/10
  rounded-lg p-6
  shadow-lg shadow-black/30
">
  <div className="relative">
    {/* Subtle inner glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />

    <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
    <p className="text-neutral-300 text-sm">
      Glassmorphism effect with blur and transparency
    </p>
  </div>
</div>
```

### Interactive Card (with animation)

**Usage:** Clickable cards, navigation cards

```jsx
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="
    bg-gradient-to-br from-neutral-850/95 to-neutral-900/90
    rounded-lg p-6 border border-neutral-700
    cursor-pointer
    hover:border-primary-500/30 hover:shadow-glow-orange
    transition-colors duration-300
  "
>
  {/* Card content */}
</motion.div>
```

---

## Badge Components

### Status Badges

**Usage:** Task status, agent status, system status

```jsx
// Success Badge
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5 rounded-full
  text-xs font-semibold uppercase tracking-wide
  bg-gradient-to-r from-success-400/25 to-success-500/20
  text-success-400 border border-success-400/40
  shadow-sm
">
  <CheckCircle className="h-3 w-3" />
  Completed
</span>

// Warning Badge
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5 rounded-full
  text-xs font-semibold uppercase tracking-wide
  bg-gradient-to-r from-warning-400/25 to-warning-500/20
  text-warning-400 border border-warning-400/40
  shadow-sm
">
  <Clock className="h-3 w-3" />
  Pending
</span>

// Info Badge (with pulse animation)
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5 rounded-full
  text-xs font-semibold uppercase tracking-wide
  bg-gradient-to-r from-info-400/25 to-info-500/20
  text-info-400 border border-info-400/40
  shadow-sm
  animate-pulse-glow
">
  <Activity className="h-3 w-3" />
  In Progress
</span>

// Error Badge
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5 rounded-full
  text-xs font-semibold uppercase tracking-wide
  bg-gradient-to-r from-error-400/25 to-error-500/20
  text-error-400 border border-error-400/40
  shadow-sm
">
  <AlertCircle className="h-3 w-3" />
  Blocked
</span>
```

### Notification Badge

**Usage:** Unread count, notifications

```jsx
<div className="relative">
  <BellIcon className="h-6 w-6" />
  <span className="
    absolute -top-1 -right-1
    flex items-center justify-center
    min-w-[18px] h-[18px] px-1
    rounded-full
    bg-error-500 text-white
    text-xs font-bold
    ring-2 ring-neutral-900
  ">
    3
  </span>
</div>
```

---

## Input Components

### Text Input

**Usage:** Form fields, search bars

```jsx
<div className="w-full">
  <label className="
    block text-sm font-medium text-neutral-300 mb-2
  ">
    Email Address
  </label>
  <input
    type="email"
    placeholder="you@example.com"
    className="
      w-full px-4 py-3 rounded-md
      bg-neutral-850 border border-neutral-700
      text-neutral-200 placeholder:text-neutral-500
      font-sans text-sm
      hover:border-neutral-600
      focus:outline-none focus:border-primary-500
      focus:ring-2 focus:ring-primary-500/20
      focus:bg-neutral-800
      transition-all duration-200
    "
  />
</div>
```

### Search Input

**Usage:** Search functionality with icon

```jsx
<div className="relative w-full">
  <Search className="
    absolute left-3 top-1/2 -translate-y-1/2
    h-5 w-5 text-neutral-500
  " />
  <input
    type="search"
    placeholder="Search agents, tasks..."
    className="
      w-full pl-10 pr-4 py-3 rounded-md
      bg-neutral-850 border border-neutral-700
      text-neutral-200 placeholder:text-neutral-500
      hover:border-neutral-600
      focus:outline-none focus:border-primary-500
      focus:ring-2 focus:ring-primary-500/20
      transition-all duration-200
    "
  />
</div>
```

### Select Dropdown

**Usage:** Dropdown selection

```jsx
<select className="
  w-full px-4 py-3 pr-10 rounded-md
  bg-neutral-850 border border-neutral-700
  text-neutral-200
  appearance-none
  cursor-pointer
  hover:border-neutral-600
  focus:outline-none focus:border-primary-500
  focus:ring-2 focus:ring-primary-500/20
  transition-all duration-200
  bg-[url('data:image/svg+xml,...')] bg-no-repeat bg-right
">
  <option>All Agents</option>
  <option>Active Only</option>
  <option>Idle Only</option>
</select>
```

---

## Progress Components

### Linear Progress Bar

**Usage:** Task completion, loading states

```jsx
<div className="w-full">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium text-neutral-300">Progress</span>
    <span className="text-sm font-semibold text-white">75%</span>
  </div>

  <div className="
    w-full h-2 bg-neutral-700 rounded-full overflow-hidden
  ">
    <div
      className="
        h-full rounded-full
        bg-gradient-to-r from-success-500 to-success-400
        transition-all duration-500 ease-out
        relative overflow-hidden
      "
      style={{ width: '75%' }}
    >
      {/* Shimmer effect */}
      <div className="
        absolute inset-0
        bg-gradient-to-r from-transparent via-white/30 to-transparent
        animate-shimmer
      " />
    </div>
  </div>
</div>
```

### Circular Progress

**Usage:** Percentage indicators, dashboards

```jsx
<div className="relative inline-flex items-center justify-center">
  <svg className="w-20 h-20 -rotate-90">
    {/* Background circle */}
    <circle
      cx="40"
      cy="40"
      r="32"
      stroke="currentColor"
      strokeWidth="6"
      fill="none"
      className="text-neutral-700"
    />
    {/* Progress circle */}
    <circle
      cx="40"
      cy="40"
      r="32"
      stroke="currentColor"
      strokeWidth="6"
      fill="none"
      strokeDasharray={`${2 * Math.PI * 32}`}
      strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.75)}`}
      className="text-primary-500 transition-all duration-500"
      strokeLinecap="round"
    />
  </svg>
  {/* Percentage text */}
  <span className="
    absolute text-lg font-bold text-white
  ">
    75%
  </span>
</div>
```

### Skeleton Loader

**Usage:** Loading placeholders

```jsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-neutral-700 rounded w-3/4" />
  <div className="h-4 bg-neutral-700 rounded w-1/2" />
  <div className="h-4 bg-neutral-700 rounded w-5/6" />
</div>
```

---

## Icon Containers

### Gradient Icon Containers

**Usage:** Visual hierarchy, feature highlights

```jsx
// Orange (Primary)
<div className="
  inline-flex p-3 rounded-lg
  bg-gradient-to-br from-primary-500 to-primary-400
  shadow-md shadow-primary-500/30
  hover:scale-105
  transition-transform duration-200
">
  <Activity className="h-5 w-5 text-white" />
</div>

// Blue (Info)
<div className="
  inline-flex p-3 rounded-lg
  bg-gradient-to-br from-info-500 to-info-400
  shadow-md shadow-info-500/30
  hover:scale-105
  transition-transform duration-200
">
  <Users className="h-5 w-5 text-white" />
</div>

// Green (Success)
<div className="
  inline-flex p-3 rounded-lg
  bg-gradient-to-br from-success-500 to-success-400
  shadow-md shadow-success-500/30
  hover:scale-105
  transition-transform duration-200
">
  <CheckCircle className="h-5 w-5 text-white" />
</div>

// Purple (Accent)
<div className="
  inline-flex p-3 rounded-lg
  bg-gradient-to-br from-purple-500 to-purple-400
  shadow-md shadow-purple-500/30
  hover:scale-105
  transition-transform duration-200
">
  <Sparkles className="h-5 w-5 text-white" />
</div>
```

### Subtle Icon Containers

**Usage:** Secondary icons, less emphasis

```jsx
<div className="
  inline-flex p-2 rounded-lg
  bg-info-500/20 border border-info-500/30
">
  <TrendingUp className="h-4 w-4 text-info-400" />
</div>
```

---

## Animation Components

### Fade In Animation

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {/* Content */}
</motion.div>
```

### Stagger Children Animation

```jsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Scale Effect

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

---

## Layout Components

### Grid Layout

```jsx
<div className="
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
">
  {/* Grid items */}
</div>
```

### Flex Layout

```jsx
<div className="flex items-center justify-between gap-4">
  {/* Flex items */}
</div>
```

### Container

```jsx
<div className="container mx-auto px-6 max-w-7xl">
  {/* Content */}
</div>
```

---

## Custom CSS Classes Reference

Add these to your global CSS file:

```css
/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #ff8a3d 0%, #fb923c 50%, #f97316 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 3s ease infinite;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.3));
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Shimmer Animation */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Pulse Glow Animation */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }
  50% {
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Shadow Glow */
.shadow-glow-orange {
  box-shadow: 0 0 30px rgba(249, 115, 22, 0.4), 0 8px 24px rgba(249, 115, 22, 0.2);
}

.shadow-glow-blue {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 8px 24px rgba(59, 130, 246, 0.2);
}

.shadow-glow-green {
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.4), 0 8px 24px rgba(34, 197, 94, 0.2);
}
```

---

## Accessibility Checklist

- [ ] All interactive elements have min 44×44px touch targets
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] Focus indicators are visible on all interactive elements
- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have associated `<label>` elements
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader testing completed

---

## Usage Tips

1. **Combine Utilities:** Tailwind's utility-first approach allows flexible composition
2. **Use Custom Classes Sparingly:** Prefer utilities over custom CSS
3. **Animation Performance:** Stick to `transform` and `opacity` for best performance
4. **Responsive Design:** Use `sm:`, `md:`, `lg:` prefixes for breakpoints
5. **Dark Mode:** All components are dark-mode optimized by default

---

## Related Documentation

- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete design system
- [theme.css](./src/styles/theme.css) - Design tokens
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
