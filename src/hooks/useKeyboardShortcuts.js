import { useEffect, useRef } from 'react';

export function useKeyboardShortcuts({ onNavigate, onToggleCommandPalette, onToggleSearch, onToggleShortcutsModal, onToggleAutoScroll }) {
  const onNavigateRef = useRef(onNavigate);
  const onToggleCommandPaletteRef = useRef(onToggleCommandPalette);
  const onToggleSearchRef = useRef(onToggleSearch);
  const onToggleShortcutsModalRef = useRef(onToggleShortcutsModal);
  const onToggleAutoScrollRef = useRef(onToggleAutoScroll);

  // Keep refs up-to-date without re-registering the event listener
  onNavigateRef.current = onNavigate;
  onToggleCommandPaletteRef.current = onToggleCommandPalette;
  onToggleSearchRef.current = onToggleSearch;
  onToggleShortcutsModalRef.current = onToggleShortcutsModal;
  onToggleAutoScrollRef.current = onToggleAutoScroll;

  useEffect(() => {
    const handler = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      const ctrl = e.ctrlKey || e.metaKey;

      // Tab navigation: Ctrl+1 through Ctrl+8
      const tabs = ['overview', 'teams', 'communication', 'monitoring', 'history', 'archive', 'inboxes', 'analytics'];
      if (ctrl && e.key >= '1' && e.key <= '8') {
        e.preventDefault();
        onNavigateRef.current?.(tabs[parseInt(e.key) - 1]);
      }

      // Ctrl+K: command palette
      if (ctrl && e.key === 'k') {
        e.preventDefault();
        onToggleCommandPaletteRef.current?.();
      }

      // / key: also opens command palette (like GitHub, Slack)
      if (e.key === '/' && !ctrl && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        onToggleCommandPaletteRef.current?.();
      }

      // Ctrl+F: focus search
      if (ctrl && e.key === 'f') {
        e.preventDefault();
        onToggleSearchRef.current?.();
      }

      // Ctrl+Shift+S: toggle auto-scroll in communication panels
      if (ctrl && e.shiftKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        onToggleAutoScrollRef.current?.();
      }

      // ?: open keyboard shortcuts modal
      if (e.key === '?' && !ctrl && !e.altKey) {
        e.preventDefault();
        onToggleShortcutsModalRef.current?.();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []); // Register once — refs always hold current values
}
