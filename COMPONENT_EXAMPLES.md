# Premium Component Examples
## Ready-to-Use Visual Components

This document provides copy-paste examples of premium visual components using the enhanced design system.

---

## Table of Contents
1. [Status Cards](#status-cards)
2. [Enhanced Badges](#enhanced-badges)
3. [Icon Containers](#icon-containers)
4. [Progress Indicators](#progress-indicators)
5. [Live Indicators](#live-indicators)
6. [Premium Buttons](#premium-buttons)
7. [Section Dividers](#section-dividers)
8. [Info Panels](#info-panels)
9. [Stat Displays](#stat-displays)
10. [Loading States](#loading-states)

---

## Status Cards

### Basic Premium Card
```jsx
<div className="card">
  <h3 className="text-xl font-bold text-white mb-4">
    Card Title
  </h3>
  <p className="text-gray-400">
    Premium card with gradient background, layered shadows,
    and animated border on hover.
  </p>
</div>
```

### Stat Card with Icon
```jsx
<div className="stat-card stat-card-animated">
  <div className="flex items-center justify-between mb-4">
    <div className="icon-container icon-container-blue">
      <Activity className="h-5 w-5 text-white" />
    </div>
    <span className="badge badge-in-progress">Live</span>
  </div>

  <div className="stat-number text-4xl font-extrabold mb-2">
    1,234
  </div>

  <div className="stat-label text-sm text-gray-400 uppercase tracking-wide">
    Total Tasks
  </div>

  <div className="progress-bar mt-4">
    <div className="progress-fill" style={{ width: '68%' }} />
  </div>
</div>
```

### Glass Effect Card
```jsx
<div className="glass-effect p-6 rounded-2xl">
  <div className="flex items-center gap-3 mb-4">
    <div className="icon-container icon-container-purple">
      <Users className="h-5 w-5 text-white" />
    </div>
    <h4 className="text-lg font-semibold text-white">
      Team Overview
    </h4>
  </div>

  <p className="text-gray-300 leading-relaxed">
    Glassmorphism panel with blur effect and enhanced depth.
  </p>
</div>
```

---

## Enhanced Badges

### All Status Variants
```jsx
{/* Pending Status */}
<span className="badge badge-pending">
  Pending
</span>

{/* In Progress Status */}
<span className="badge badge-in-progress">
  In Progress
</span>

{/* Completed Status */}
<span className="badge badge-completed">
  Completed
</span>

{/* Blocked Status */}
<span className="badge badge-blocked">
  Blocked
</span>
```

### Badge with Counter
```jsx
<span className="badge badge-in-progress">
  {count} Active
</span>
```

### Badge Group
```jsx
<div className="flex flex-wrap gap-2">
  <span className="badge badge-pending">3 Pending</span>
  <span className="badge badge-in-progress">5 Active</span>
  <span className="badge badge-completed">12 Done</span>
</div>
```

---

## Icon Containers

### Color Variants
```jsx
{/* Orange (Default) */}
<div className="icon-container">
  <Activity className="h-5 w-5 text-white" />
</div>

{/* Blue */}
<div className="icon-container icon-container-blue">
  <Users className="h-5 w-5 text-white" />
</div>

{/* Purple */}
<div className="icon-container icon-container-purple">
  <Zap className="h-5 w-5 text-white" />
</div>

{/* Green */}
<div className="icon-container icon-container-green">
  <CheckCircle className="h-5 w-5 text-white" />
</div>

{/* Cyan */}
<div className="icon-container icon-container-cyan">
  <Database className="h-5 w-5 text-white" />
</div>

{/* Red */}
<div className="icon-container icon-container-red">
  <AlertTriangle className="h-5 w-5 text-white" />
</div>

{/* Yellow */}
<div className="icon-container icon-container-yellow">
  <Clock className="h-5 w-5 text-white" />
</div>
```

### Icon Container with Label
```jsx
<div className="flex items-center gap-3">
  <div className="icon-container icon-container-blue">
    <Activity className="h-5 w-5 text-white" />
  </div>
  <div>
    <div className="text-sm font-semibold text-white">Active Now</div>
    <div className="text-xs text-gray-400">42 agents running</div>
  </div>
</div>
```

---

## Progress Indicators

### Standard Progress Bar
```jsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">Task Progress</span>
    <span className="text-white font-semibold">75%</span>
  </div>
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: '75%' }} />
  </div>
</div>
```

### Multiple Progress Bars
```jsx
<div className="space-y-4">
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-400">Completed Tasks</span>
      <span className="text-green-400 font-semibold">85%</span>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: '85%' }} />
    </div>
  </div>

  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-400">Agent Utilization</span>
      <span className="text-blue-400 font-semibold">62%</span>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: '62%' }} />
    </div>
  </div>
</div>
```

### Progress with Animated Number
```jsx
<div className="card">
  <div className="flex items-center justify-between mb-6">
    <h4 className="text-lg font-semibold text-white">
      Overall Progress
    </h4>
    <div className="stat-number text-3xl">
      {percentage}%
    </div>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${percentage}%` }}
    />
  </div>

  <div className="flex justify-between text-sm mt-3 text-gray-400">
    <span>24 of 32 tasks</span>
    <span>8 remaining</span>
  </div>
</div>
```

---

## Live Indicators

### Basic Live Indicator
```jsx
<div className="flex items-center gap-2">
  <div className="live-indicator" />
  <span className="text-sm text-green-400 font-medium">
    Connected
  </span>
</div>
```

### Live Indicator in Badge
```jsx
<div className="flex items-center gap-2">
  <div className="live-indicator" />
  <span className="badge badge-in-progress">
    5 Agents Active
  </span>
</div>
```

### Multiple Status Indicators
```jsx
<div className="space-y-3">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="live-indicator" />
      <span className="text-sm text-gray-300">WebSocket</span>
    </div>
    <span className="text-xs text-green-400">Connected</span>
  </div>

  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="live-indicator" style={{
        background: '#60a5fa',
        boxShadow: '0 0 12px rgba(96, 165, 250, 0.8)'
      }} />
      <span className="text-sm text-gray-300">API Server</span>
    </div>
    <span className="text-xs text-blue-400">Active</span>
  </div>

  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="live-indicator" style={{
        background: '#facc15',
        boxShadow: '0 0 12px rgba(250, 204, 21, 0.8)'
      }} />
      <span className="text-sm text-gray-300">Processing</span>
    </div>
    <span className="text-xs text-yellow-400">Running</span>
  </div>
</div>
```

---

## Premium Buttons

### Primary Button
```jsx
<button className="bg-claude-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
  View Dashboard
</button>
```

### Secondary Button
```jsx
<button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
  Cancel
</button>
```

### Icon Button
```jsx
<button className="bg-claude-orange hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
  <Activity className="h-5 w-5" />
  <span>Start Agent</span>
</button>
```

### Button Group
```jsx
<div className="flex gap-3">
  <button className="bg-claude-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
    Accept
  </button>
  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
    Decline
  </button>
</div>
```

### Loading Button
```jsx
<button
  disabled={loading}
  className="bg-claude-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
>
  {loading && (
    <div className="loading-spinner h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
  )}
  <span>{loading ? 'Processing...' : 'Submit'}</span>
</button>
```

---

## Section Dividers

### Standard Divider
```jsx
<div className="section-divider" aria-hidden="true" />
```

### Divider with Text
```jsx
<div className="relative my-8">
  <div className="section-divider" />
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4">
    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
      Or Continue With
    </span>
  </div>
</div>
```

### Vertical Divider
```jsx
<div className="flex items-center gap-6">
  <div>Content Left</div>
  <div className="h-16 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
  <div>Content Right</div>
</div>
```

---

## Info Panels

### Success Panel
```jsx
<div className="card border-l-4 border-l-green-500">
  <div className="flex items-start gap-3">
    <div className="icon-container icon-container-green">
      <CheckCircle className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-green-400 mb-1">
        Success
      </h4>
      <p className="text-gray-300">
        Your changes have been saved successfully.
      </p>
    </div>
  </div>
</div>
```

### Warning Panel
```jsx
<div className="card border-l-4 border-l-yellow-500">
  <div className="flex items-start gap-3">
    <div className="icon-container icon-container-yellow">
      <AlertTriangle className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-yellow-400 mb-1">
        Warning
      </h4>
      <p className="text-gray-300">
        This action cannot be undone.
      </p>
    </div>
  </div>
</div>
```

### Error Panel
```jsx
<div className="card border-l-4 border-l-red-500">
  <div className="flex items-start gap-3">
    <div className="icon-container icon-container-red">
      <XCircle className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-red-400 mb-1">
        Error
      </h4>
      <p className="text-gray-300">
        Connection to server failed. Please try again.
      </p>
    </div>
  </div>
</div>
```

### Info Panel
```jsx
<div className="card border-l-4 border-l-blue-500">
  <div className="flex items-start gap-3">
    <div className="icon-container icon-container-blue">
      <Info className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-blue-400 mb-1">
        Information
      </h4>
      <p className="text-gray-300">
        New features are available. Check the changelog for details.
      </p>
    </div>
  </div>
</div>
```

---

## Stat Displays

### Mini Stat Card
```jsx
<div className="stat-card">
  <div className="flex items-center justify-between">
    <div>
      <div className="stat-label mb-1">Active Agents</div>
      <div className="stat-number text-2xl">42</div>
    </div>
    <div className="icon-container icon-container-blue">
      <Users className="h-5 w-5 text-white" />
    </div>
  </div>
</div>
```

### Stat Card with Trend
```jsx
<div className="stat-card">
  <div className="flex items-center justify-between mb-3">
    <div className="stat-label">Total Tasks</div>
    <span className="text-xs text-green-400 flex items-center gap-1">
      <TrendingUp className="h-3 w-3" />
      +12%
    </span>
  </div>

  <div className="stat-number text-3xl mb-1">
    1,847
  </div>

  <div className="text-xs text-gray-400">
    vs. 1,650 last week
  </div>
</div>
```

### Stat Card with Multiple Metrics
```jsx
<div className="stat-card">
  <div className="flex items-center gap-3 mb-4">
    <div className="icon-container icon-container-purple">
      <Activity className="h-5 w-5 text-white" />
    </div>
    <h4 className="text-lg font-semibold text-white">
      Team Performance
    </h4>
  </div>

  <div className="grid grid-cols-3 gap-4">
    <div>
      <div className="stat-number text-2xl mb-1">98%</div>
      <div className="stat-label text-xs">Uptime</div>
    </div>
    <div>
      <div className="stat-number text-2xl mb-1">2.3s</div>
      <div className="stat-label text-xs">Avg Time</div>
    </div>
    <div>
      <div className="stat-number text-2xl mb-1">156</div>
      <div className="stat-label text-xs">Tasks/Day</div>
    </div>
  </div>
</div>
```

### Stat Grid
```jsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {/* Stat 1 */}
  <div className="stat-card stat-card-animated">
    <div className="icon-container icon-container-blue mb-3">
      <Users className="h-4 w-4 text-white" />
    </div>
    <div className="stat-number text-2xl mb-1">42</div>
    <div className="stat-label text-xs">Active</div>
  </div>

  {/* Stat 2 */}
  <div className="stat-card stat-card-animated">
    <div className="icon-container icon-container-green mb-3">
      <CheckCircle className="h-4 w-4 text-white" />
    </div>
    <div className="stat-number text-2xl mb-1">156</div>
    <div className="stat-label text-xs">Completed</div>
  </div>

  {/* Stat 3 */}
  <div className="stat-card stat-card-animated">
    <div className="icon-container icon-container-yellow mb-3">
      <Clock className="h-4 w-4 text-white" />
    </div>
    <div className="stat-number text-2xl mb-1">23</div>
    <div className="stat-label text-xs">Pending</div>
  </div>

  {/* Stat 4 */}
  <div className="stat-card stat-card-animated">
    <div className="icon-container icon-container-red mb-3">
      <AlertTriangle className="h-4 w-4 text-white" />
    </div>
    <div className="stat-number text-2xl mb-1">2</div>
    <div className="stat-label text-xs">Blocked</div>
  </div>
</div>
```

---

## Loading States

### Skeleton Card
```jsx
<div className="card">
  <div className="skeleton-animated h-6 w-32 mb-4"></div>
  <div className="skeleton-animated h-4 w-full mb-2"></div>
  <div className="skeleton-animated h-4 w-3/4"></div>
</div>
```

### Loading Dots
```jsx
<div className="flex items-center gap-2">
  <span className="text-gray-400">Loading</span>
  <div className="loading-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
```

### Loading Spinner
```jsx
<div className="flex items-center justify-center p-8">
  <div className="loading-spinner h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
</div>
```

### Loading Card
```jsx
<div className="card">
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="loading-spinner h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-400">Loading data...</p>
    </div>
  </div>
</div>
```

---

## Advanced Patterns

### Header with Live Indicator
```jsx
<div className="card">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="icon-container icon-container-blue">
        <Activity className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">
          Live Dashboard
        </h3>
        <p className="text-sm text-gray-400">
          Real-time monitoring
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div className="live-indicator" />
      <span className="badge badge-in-progress">Active</span>
    </div>
  </div>

  {/* Card content */}
</div>
```

### Timeline Item
```jsx
<div className="flex gap-4">
  <div className="flex flex-col items-center">
    <div className="icon-container icon-container-green">
      <CheckCircle className="h-4 w-4 text-white" />
    </div>
    <div className="w-px flex-1 bg-gradient-to-b from-green-500/50 to-transparent mt-2"></div>
  </div>

  <div className="flex-1 pb-8">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm font-semibold text-white">
        Task Completed
      </span>
      <span className="badge badge-completed">Done</span>
    </div>
    <p className="text-sm text-gray-400 mb-2">
      Database migration finished successfully
    </p>
    <span className="text-xs text-gray-500">2 minutes ago</span>
  </div>
</div>
```

### Feature Card
```jsx
<div className="card hover-lift">
  <div className="icon-container icon-container-purple mb-4">
    <Zap className="h-6 w-6 text-white" />
  </div>

  <h4 className="text-lg font-semibold text-white mb-2">
    Lightning Fast
  </h4>

  <p className="text-gray-400 text-sm mb-4">
    Optimized performance for real-time monitoring with
    sub-second updates.
  </p>

  <div className="flex items-center gap-2 text-claude-orange text-sm font-semibold">
    <span>Learn more</span>
    <ArrowRight className="h-4 w-4" />
  </div>
</div>
```

---

## Complete Page Example

```jsx
function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-extrabold text-white shimmer-text">
              Agent Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <div className="live-indicator" />
              <span className="text-sm text-green-400 font-medium">
                Connected
              </span>
            </div>
          </div>
          <p className="text-gray-400">
            Real-time monitoring of agent teams
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card stat-card-animated">
            <div className="icon-container icon-container-blue mb-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="stat-number text-3xl mb-1">42</div>
            <div className="stat-label text-sm">Active Agents</div>
          </div>

          <div className="stat-card stat-card-animated">
            <div className="icon-container icon-container-green mb-3">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="stat-number text-3xl mb-1">156</div>
            <div className="stat-label text-sm">Completed</div>
          </div>

          <div className="stat-card stat-card-animated">
            <div className="icon-container icon-container-yellow mb-3">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="stat-number text-3xl mb-1">23</div>
            <div className="stat-label text-sm">Pending</div>
          </div>

          <div className="stat-card stat-card-animated">
            <div className="icon-container icon-container-cyan mb-3">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div className="stat-number text-3xl mb-1">98%</div>
            <div className="stat-label text-sm">Uptime</div>
          </div>
        </div>

        <div className="section-divider" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Team Activity
              </h3>
              <span className="badge badge-in-progress">
                5 Active
              </span>
            </div>

            <div className="space-y-4">
              {/* Activity items */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                <div className="icon-container icon-container-blue">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">
                    Agent started task
                  </div>
                  <div className="text-xs text-gray-400">
                    2 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-effect p-6 rounded-2xl">
              <h4 className="text-lg font-semibold text-white mb-4">
                System Status
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="live-indicator" />
                    <span className="text-sm text-gray-300">
                      WebSocket
                    </span>
                  </div>
                  <span className="text-xs text-green-400">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

**Document Version:** 1.0.0
**Last Updated:** February 10, 2026
**Maintained by:** Visual Design Team
