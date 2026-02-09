# Interaction Implementation Guide
## Practical Code Examples & Components

**Version:** 1.0
**Date:** February 2026
**For:** Frontend Developers

---

## Table of Contents

1. [Keyboard Navigation Hook](#keyboard-navigation-hook)
2. [Ripple Effect Component](#ripple-effect-component)
3. [Toast Notification System](#toast-notification-system)
4. [Tooltip Component](#tooltip-component)
5. [Focus Management Utilities](#focus-management-utilities)
6. [Animation Utilities](#animation-utilities)
7. [Keyboard Shortcuts Modal](#keyboard-shortcuts-modal)
8. [Screen Reader Announcer](#screen-reader-announcer)

---

## Keyboard Navigation Hook

### Custom Hook: `useKeyboardShortcuts.js`

```javascript
import { useEffect, useCallback } from 'react';

/**
 * Hook for managing keyboard shortcuts
 * @param {Object} shortcuts - Map of key combinations to callbacks
 * @param {Array} dependencies - Dependency array for callbacks
 *
 * Example:
 * useKeyboardShortcuts({
 *   'Ctrl+K': () => openCommandPalette(),
 *   'Alt+1': () => switchToTab(0),
 *   'Shift+?': () => openHelpModal(),
 * }, [openCommandPalette, switchToTab, openHelpModal]);
 */
export function useKeyboardShortcuts(shortcuts, dependencies = []) {
  const handleKeyDown = useCallback((event) => {
    // Build key combination string
    const keys = [];
    if (event.ctrlKey || event.metaKey) keys.push('Ctrl');
    if (event.altKey) keys.push('Alt');
    if (event.shiftKey) keys.push('Shift');

    // Normalize key name
    const key = event.key === ' ' ? 'Space' : event.key;
    keys.push(key);

    const combination = keys.join('+');

    // Check if shortcut exists
    if (shortcuts[combination]) {
      // Prevent default browser behavior
      event.preventDefault();
      event.stopPropagation();

      // Execute callback
      shortcuts[combination](event);
    }
  }, [shortcuts, ...dependencies]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Example usage in App.jsx:
export function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  useKeyboardShortcuts({
    'Alt+1': () => setActiveTab(0),
    'Alt+2': () => setActiveTab(1),
    'Alt+3': () => setActiveTab(2),
    'Alt+4': () => setActiveTab(3),
    'Shift+?': () => setShowHelp(true),
    'Escape': () => setShowHelp(false),
    'r': () => refreshData(),
    'R': () => refreshData(), // Both cases
  }, [activeTab, showHelp]);

  // Component JSX...
}
```

---

## Ripple Effect Component

### Component: `Ripple.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Ripple effect overlay for buttons and clickable elements
 * Renders expanding circle from click position
 */
export function Ripple({ duration = 600, color = 'rgba(255, 255, 255, 0.3)' }) {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Clean up expired ripples
    const timeout = setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, duration);

    return () => clearTimeout(timeout);
  }, [ripples, duration]);

  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: color,
            transform: 'translate(-50%, -50%)',
            animation: `ripple-animation ${duration}ms ease-out`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

Ripple.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string,
};

/**
 * HOC to add ripple effect to any component
 */
export function withRipple(Component) {
  return function RippleWrapper({ onClick, ...props }) {
    const [ripples, setRipples] = useState([]);

    const handleClick = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const newRipple = {
        id: Date.now(),
        x,
        y,
        size,
      };

      setRipples(prev => [...prev, newRipple]);

      // Clean up after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);

      // Call original onClick
      if (onClick) onClick(event);
    };

    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Component {...props} onClick={handleClick} />
        <Ripple ripples={ripples} />
      </div>
    );
  };
}

// CSS for ripple animation (add to animations.css):
/*
@keyframes ripple-animation {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
*/

// Usage example:
const RippleButton = withRipple(({ children, onClick }) => (
  <button onClick={onClick} className="button-animated">
    {children}
  </button>
));

export default RippleButton;
```

---

## Toast Notification System

### Component: `Toast.jsx`

```javascript
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

const ToastContext = createContext(null);

/**
 * Toast notification system
 * Supports success, info, warning, error types
 * Auto-dismiss with configurable duration
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };

    setToasts(prev => [newToast, ...prev].slice(0, 3)); // Max 3 toasts

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    return addToast(message, 'success', duration || 3000);
  }, [addToast]);

  const info = useCallback((message, duration) => {
    return addToast(message, 'info', duration || 4000);
  }, [addToast]);

  const warning = useCallback((message, duration) => {
    return addToast(message, 'warning', duration || 5000);
  }, [addToast]);

  const error = useCallback((message, duration) => {
    return addToast(message, 'error', duration || 0); // Errors require manual dismiss
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ success, info, warning, error, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

ToastContainer.propTypes = {
  toasts: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

function Toast({ toast, onRemove }) {
  const { id, message, type } = toast;

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50',
      textColor: 'text-green-400',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50',
      textColor: 'text-blue-400',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/50',
      textColor: 'text-yellow-400',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/50',
      textColor: 'text-red-400',
    },
  };

  const Icon = config[type].icon;

  return (
    <div
      className={`
        ${config[type].bgColor} ${config[type].borderColor} ${config[type].textColor}
        backdrop-blur-md border rounded-lg shadow-lg
        px-4 py-3 flex items-center gap-3 min-w-[300px] max-w-[400px]
        animate-slide-in-right pointer-events-auto
      `}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

/**
 * Hook to access toast functions
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Usage example:
export function ExampleComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Connection established successfully!');
  };

  const handleError = () => {
    toast.error('Failed to connect to server. Please try again.');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Test Success</button>
      <button onClick={handleError}>Test Error</button>
    </div>
  );
}
```

---

## Tooltip Component

### Component: `Tooltip.jsx`

```javascript
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Tooltip component with smart positioning
 * Appears on hover with 200ms delay
 * Automatically positions to avoid viewport edges
 */
export function Tooltip({ children, content, delay = 200, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      // Calculate optimal position
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let newPosition = position;

      // Check if tooltip would overflow viewport
      if (position === 'top' && triggerRect.top - tooltipRect.height < 0) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewport.height) {
        newPosition = 'top';
      } else if (position === 'left' && triggerRect.left - tooltipRect.width < 0) {
        newPosition = 'right';
      } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewport.width) {
        newPosition = 'left';
      }

      setTooltipPosition(newPosition);
    }
  }, [isVisible, position]);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={triggerRef}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm font-medium text-white
            bg-gray-900 rounded-lg shadow-lg border border-gray-700
            whitespace-nowrap pointer-events-none
            ${positionClasses[tooltipPosition]}
            animate-fade-in-up
          `}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div
            className={`
              absolute w-2 h-2 bg-gray-900 border-gray-700 rotate-45
              ${tooltipPosition === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b' : ''}
              ${tooltipPosition === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2 border-l border-t' : ''}
              ${tooltipPosition === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r' : ''}
              ${tooltipPosition === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  delay: PropTypes.number,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

// Usage example:
export function TaskItem({ task }) {
  return (
    <div className="task-item">
      <Tooltip content={task.description} position="top">
        <span className="truncate">{task.subject}</span>
      </Tooltip>

      <Tooltip content="Copy task ID">
        <button aria-label="Copy task ID">
          <Copy className="h-4 w-4" />
        </button>
      </Tooltip>
    </div>
  );
}
```

---

## Focus Management Utilities

### Utility: `focusManagement.js`

```javascript
/**
 * Focus management utilities for accessibility
 */

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Trap focus within a container (for modals, dropdowns)
 */
export function useFocusTrap(containerRef, isActive) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element on mount
    firstElement?.focus();

    const handleTabKey = (event) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [containerRef, isActive]);
}

/**
 * Hook to manage focus restoration
 * Saves focus on mount, restores on unmount
 */
export function useFocusRestore() {
  const previousFocusRef = useRef(null);

  useEffect(() => {
    // Save currently focused element
    previousFocusRef.current = document.activeElement;

    // Restore focus on unmount
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);
}

/**
 * Hook for managing roving tabindex (for lists, grids)
 */
export function useRovingTabIndex(containerRef, items) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeyDown = (event) => {
      let newIndex = activeIndex;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          newIndex = Math.min(activeIndex + 1, items.length - 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = Math.max(activeIndex - 1, 0);
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = items.length - 1;
          break;
        default:
          return;
      }

      setActiveIndex(newIndex);

      // Focus the new active item
      const focusableElements = getFocusableElements(containerRef.current);
      focusableElements[newIndex]?.focus();
    };

    containerRef.current.addEventListener('keydown', handleKeyDown);

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, items, activeIndex]);

  return activeIndex;
}

// Example usage in TaskList:
export function TaskList({ tasks }) {
  const listRef = useRef(null);
  const activeIndex = useRovingTabIndex(listRef, tasks);

  return (
    <div ref={listRef} role="list">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          role="listitem"
          tabIndex={index === activeIndex ? 0 : -1}
          className="task-item"
        >
          {task.subject}
        </div>
      ))}
    </div>
  );
}
```

---

## Animation Utilities

### Utility: `animations.js`

```javascript
/**
 * Animation utility functions and hooks
 */

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for staggered animation delays
 */
export function useStaggeredAnimation(itemCount, baseDelay = 50) {
  return Array.from({ length: itemCount }, (_, index) => ({
    animationDelay: `${index * baseDelay}ms`,
  }));
}

/**
 * Hook for animating number changes (count-up effect)
 */
export function useAnimatedNumber(targetValue, duration = 500) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startValue = currentValue;
    const diff = targetValue - startValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const value = Math.round(startValue + diff * easeOut);
      setCurrentValue(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [targetValue, duration]);

  return currentValue;
}

/**
 * Hook for entrance animations with intersection observer
 */
export function useEntranceAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.once) {
            observer.disconnect();
          }
        } else if (!options.once) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.once, options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

// Usage examples:

// 1. Reduced motion
export function AnimatedCard({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={prefersReducedMotion ? '' : 'animate-fade-in-scale'}>
      {children}
    </div>
  );
}

// 2. Staggered animation
export function CardGrid({ cards }) {
  const staggerStyles = useStaggeredAnimation(cards.length);

  return (
    <div className="grid">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="card animate-fade-in-scale"
          style={staggerStyles[index]}
        >
          {card.content}
        </div>
      ))}
    </div>
  );
}

// 3. Animated counter
export function StatCard({ label, value }) {
  const animatedValue = useAnimatedNumber(value);

  return (
    <div className="stat-card">
      <div className="stat-number">{animatedValue}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// 4. Entrance animation
export function FadeInSection({ children }) {
  const [ref, isVisible] = useEntranceAnimation({ once: true });

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}
```

---

## Keyboard Shortcuts Modal

### Component: `KeyboardShortcutsModal.jsx`

```javascript
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Keyboard } from 'lucide-react';
import { useFocusTrap, useFocusRestore } from '../utils/focusManagement';

const shortcuts = [
  {
    category: 'Global',
    items: [
      { keys: ['Ctrl', 'K'], description: 'Open command palette (coming soon)' },
      { keys: ['Shift', '?'], description: 'Show keyboard shortcuts' },
      { keys: ['Esc'], description: 'Close modal or dismiss notification' },
      { keys: ['R'], description: 'Refresh data manually' },
      { keys: ['/'], description: 'Focus search (coming soon)' },
    ],
  },
  {
    category: 'Navigation',
    items: [
      { keys: ['Alt', '1'], description: 'Switch to Overview tab' },
      { keys: ['Alt', '2'], description: 'Switch to Teams tab' },
      { keys: ['Alt', '3'], description: 'Switch to Communication tab' },
      { keys: ['Alt', '4'], description: 'Switch to Monitoring tab' },
      { keys: ['Tab'], description: 'Next focusable element' },
      { keys: ['Shift', 'Tab'], description: 'Previous focusable element' },
      { keys: ['Home'], description: 'Scroll to top' },
      { keys: ['End'], description: 'Scroll to bottom' },
    ],
  },
  {
    category: 'Component Actions',
    items: [
      { keys: ['E'], description: 'Expand/collapse card (when focused)' },
      { keys: ['C'], description: 'Copy task ID (when focused)' },
      { keys: ['N'], description: 'Jump to newest message (Communication tab)' },
      { keys: ['P'], description: 'Pause auto-scroll (Communication tab)' },
    ],
  },
];

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useFocusTrap(modalRef, isOpen);
  useFocusRestore();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="
          relative z-10 bg-gray-800 rounded-2xl shadow-2xl
          border border-gray-700 w-full max-w-2xl max-h-[80vh]
          overflow-y-auto animate-zoom-in
        "
        role="dialog"
        aria-labelledby="shortcuts-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-claude-orange/20 p-2 rounded-lg">
              <Keyboard className="h-6 w-6 text-claude-orange" />
            </div>
            <h2 id="shortcuts-title" className="text-xl font-bold text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close shortcuts modal"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-lg font-semibold text-white mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <span className="text-gray-300">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-semibold text-white bg-gray-700 border border-gray-600 rounded shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-gray-500 text-sm">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 px-6 py-4">
          <p className="text-sm text-gray-400 text-center">
            Press <kbd className="px-2 py-1 text-xs font-semibold text-white bg-gray-700 border border-gray-600 rounded">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}

KeyboardShortcutsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
```

---

## Screen Reader Announcer

### Component: `LiveRegion.jsx`

```javascript
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const LiveRegionContext = createContext(null);

/**
 * Screen reader announcement system
 * Uses ARIA live regions for dynamic updates
 */
export function LiveRegionProvider({ children }) {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');

  /**
   * Announce message with 'polite' priority
   * Screen reader will wait for current announcement to finish
   */
  const announcePolite = useCallback((message) => {
    setPoliteMessage(''); // Reset to trigger announcement
    setTimeout(() => setPoliteMessage(message), 100);
  }, []);

  /**
   * Announce message with 'assertive' priority
   * Screen reader will interrupt current announcement
   */
  const announceAssertive = useCallback((message) => {
    setAssertiveMessage('');
    setTimeout(() => setAssertiveMessage(message), 100);
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announcePolite, announceAssertive }}>
      {children}

      {/* Polite live region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>

      {/* Assertive live region */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </LiveRegionContext.Provider>
  );
}

LiveRegionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLiveRegion() {
  const context = useContext(LiveRegionContext);
  if (!context) {
    throw new Error('useLiveRegion must be used within LiveRegionProvider');
  }
  return context;
}

// Usage examples:

// In ConnectionStatus component:
export function ConnectionStatus({ isConnected, error }) {
  const { announcePolite, announceAssertive } = useLiveRegion();

  useEffect(() => {
    if (isConnected) {
      announcePolite('Connection established successfully');
    } else if (error) {
      announceAssertive(`Connection error: ${error}`);
    } else {
      announcePolite('Connecting to server');
    }
  }, [isConnected, error, announcePolite, announceAssertive]);

  // Component JSX...
}

// In TaskList component:
export function TaskList({ tasks }) {
  const { announcePolite } = useLiveRegion();

  useEffect(() => {
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    announcePolite(`Task list updated. ${completedCount} of ${tasks.length} tasks completed.`);
  }, [tasks, announcePolite]);

  // Component JSX...
}

// In App.jsx for tab navigation:
export function App() {
  const [activeTab, setActiveTab] = useState(0);
  const { announcePolite } = useLiveRegion();

  const handleTabChange = (index, tabName) => {
    setActiveTab(index);
    announcePolite(`Switched to ${tabName} tab`);
  };

  // Component JSX...
}
```

---

## Complete Integration Example

### Updated `App.jsx` with all interactions:

```javascript
import React, { useState } from 'react';
import { ToastProvider } from './components/Toast';
import { LiveRegionProvider } from './components/LiveRegion';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    'Alt+1': () => setActiveTab(0),
    'Alt+2': () => setActiveTab(1),
    'Alt+3': () => setActiveTab(2),
    'Alt+4': () => setActiveTab(3),
    'Shift+?': () => setShowShortcuts(true),
    'Escape': () => setShowShortcuts(false),
    'r': handleRefresh,
    'R': handleRefresh,
  }, [activeTab]);

  return (
    <ToastProvider>
      <LiveRegionProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Your app content */}

          {/* Keyboard shortcuts modal */}
          <KeyboardShortcutsModal
            isOpen={showShortcuts}
            onClose={() => setShowShortcuts(false)}
          />
        </div>
      </LiveRegionProvider>
    </ToastProvider>
  );
}

export default App;
```

---

## Testing Checklist

### Component Testing

- [ ] Keyboard navigation works in all components
- [ ] Focus indicators visible and properly styled
- [ ] Screen reader announces updates correctly
- [ ] Toast notifications auto-dismiss at correct times
- [ ] Tooltips position correctly near viewport edges
- [ ] Ripple effects trigger on click
- [ ] Animations respect prefers-reduced-motion

### Accessibility Testing

- [ ] Run axe-core scan (target: 0 violations)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Test keyboard-only navigation
- [ ] Test at 200% zoom level
- [ ] Test with Windows High Contrast mode
- [ ] Test color contrast (WCAG AA minimum)

---

## Performance Optimization

### Animation Performance Tips

1. **Use CSS transforms over position changes:**
   ```css
   /* Good - GPU accelerated */
   transform: translateY(-2px);

   /* Bad - triggers layout */
   top: -2px;
   ```

2. **Add will-change for frequent animations:**
   ```css
   .button-animated:hover {
     will-change: transform;
     transform: translateY(-2px);
   }
   ```

3. **Debounce expensive handlers:**
   ```javascript
   const debouncedResize = debounce(handleResize, 200);
   useEffect(() => {
     window.addEventListener('resize', debouncedResize);
     return () => window.removeEventListener('resize', debouncedResize);
   }, []);
   ```

4. **Use requestAnimationFrame for smooth animations:**
   ```javascript
   const animate = () => {
     // Update animation state
     requestAnimationFrame(animate);
   };
   requestAnimationFrame(animate);
   ```

---

**Document Status:** ✅ Complete
**Next Steps:** Integrate components into existing dashboard
