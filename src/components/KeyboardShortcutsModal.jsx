import React, { useEffect, useRef } from 'react';
import { X, Keyboard } from 'lucide-react';

const ShortcutKey = ({ keys }) => (
  <div className="flex items-center gap-1">
    {keys.map((key, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span style={{ color: '#6b7280', fontSize: 12 }}>+</span>}
        <kbd
          className="inline-flex items-center justify-center text-xs font-semibold"
          style={{
            minWidth: 28,
            height: 28,
            padding: '0 8px',
            color: '#e5e7eb',
            background: '#374151',
            border: '1px solid #4b5563',
            borderRadius: 6,
            boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            fontFamily: 'inherit',
          }}
        >
          {key}
        </kbd>
      </React.Fragment>
    ))}
  </div>
);

const ShortcutRow = ({ keys, description }) => (
  <div
    className="flex items-center justify-between rounded-lg transition-colors"
    style={{ padding: '8px 12px' }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(55,65,81,0.5)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <span className="text-sm" style={{ color: '#d1d5db' }}>{description}</span>
    <ShortcutKey keys={keys} />
  </div>
);

const ShortcutSection = ({ title, shortcuts }) => (
  <div style={{ marginBottom: 20 }}>
    <h3
      className="text-xs font-semibold uppercase"
      style={{ color: '#9ca3af', letterSpacing: '0.05em', marginBottom: 8, padding: '0 12px' }}
    >
      {title}
    </h3>
    <div>
      {shortcuts.map((shortcut, i) => (
        <ShortcutRow key={i} keys={shortcut.keys} description={shortcut.description} />
      ))}
    </div>
  </div>
);

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const navigationShortcuts = [
    { keys: ['Ctrl', '1'], description: 'Go to Live Metrics' },
    { keys: ['Ctrl', '2'], description: 'Go to Teams & Tasks' },
    { keys: ['Ctrl', '3'], description: 'Go to Communication' },
    { keys: ['Ctrl', '4'], description: 'Go to Monitoring' },
    { keys: ['Ctrl', '5'], description: 'Go to History & Outputs' },
    { keys: ['Ctrl', '6'], description: 'Go to Archive' },
    { keys: ['Ctrl', '7'], description: 'Go to Inboxes' },
    { keys: ['Ctrl', '8'], description: 'Go to Analytics' },
    { keys: ['←'], description: 'Previous tab (when tab focused)' },
    { keys: ['→'], description: 'Next tab (when tab focused)' },
  ];

  const searchCommandShortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Open command palette' },
    { keys: ['/'], description: 'Open command palette' },
    { keys: ['Ctrl', 'F'], description: 'Focus search' },
    { keys: ['Ctrl', 'Shift', 'S'], description: 'Toggle auto-scroll (communication)' },
    { keys: ['?'], description: 'Show keyboard shortcuts' },
    { keys: ['Esc'], description: 'Close modal / dialog' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      {/* Backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }} />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#111827',
          border: '1px solid #374151',
          borderRadius: 16,
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: 512,
          margin: '0 16px',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(55,65,81,0.6)',
            flexShrink: 0,
          }}
        >
          <div className="flex items-center gap-3">
            <div style={{
              padding: 8,
              background: 'rgba(232,117,10,0.12)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Keyboard style={{ width: 20, height: 20, color: '#e8750a' }} />
            </div>
            <h2 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="transition-colors"
            aria-label="Close shortcuts modal"
            style={{
              padding: '6px',
              color: '#9ca3af',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = '#374151'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 24px', overflowY: 'auto', flex: 1 }}>
          <ShortcutSection title="Navigation" shortcuts={navigationShortcuts} />
          <ShortcutSection title="Search & Commands" shortcuts={searchCommandShortcuts} />
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid rgba(55,65,81,0.6)',
          background: 'rgba(31,41,55,0.4)',
          flexShrink: 0,
          textAlign: 'center',
        }}>
          <p className="text-xs" style={{ color: '#6b7280' }}>
            Press{' '}
            <kbd style={{
              padding: '2px 6px',
              fontSize: 11,
              background: '#374151',
              border: '1px solid #4b5563',
              borderRadius: 4,
              color: '#e5e7eb',
            }}>?</kbd>
            {' '}anytime to show this dialog
          </p>
        </div>
      </div>
    </div>
  );
}
