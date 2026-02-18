import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { useKeyboardShortcuts } from '../useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  let callbacks;

  beforeEach(() => {
    callbacks = {
      onNavigate: vi.fn(),
      onToggleCommandPalette: vi.fn(),
      onToggleSearch: vi.fn(),
      onToggleShortcutsModal: vi.fn(),
      onToggleAutoScroll: vi.fn(),
    };
  });

  function renderShortcuts(overrides = {}) {
    return renderHook(() => useKeyboardShortcuts({ ...callbacks, ...overrides }));
  }

  describe('Ctrl+K opens command palette', () => {
    it('fires onToggleCommandPalette on Ctrl+K', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
      expect(callbacks.onToggleCommandPalette).toHaveBeenCalledTimes(1);
    });

    it('fires onToggleCommandPalette on Meta+K (Mac)', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: 'k', metaKey: true });
      expect(callbacks.onToggleCommandPalette).toHaveBeenCalledTimes(1);
    });
  });

  describe('/ key opens command palette', () => {
    it('fires onToggleCommandPalette on / key', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: '/' });
      expect(callbacks.onToggleCommandPalette).toHaveBeenCalledTimes(1);
    });

    it('does not fire on Ctrl+/', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: '/', ctrlKey: true });
      expect(callbacks.onToggleCommandPalette).not.toHaveBeenCalled();
    });
  });

  describe('? opens shortcuts modal', () => {
    it('fires onToggleShortcutsModal on ? key', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: '?' });
      expect(callbacks.onToggleShortcutsModal).toHaveBeenCalledTimes(1);
    });

    it('does not fire on Ctrl+?', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: '?', ctrlKey: true });
      expect(callbacks.onToggleShortcutsModal).not.toHaveBeenCalled();
    });
  });

  describe('Ctrl+1 through Ctrl+8 fires tab navigation', () => {
    const expectedTabs = ['overview', 'teams', 'communication', 'monitoring', 'history', 'archive', 'inboxes', 'analytics'];

    expectedTabs.forEach((tab, index) => {
      it(`Ctrl+${index + 1} navigates to ${tab}`, () => {
        renderShortcuts();
        fireEvent.keyDown(window, { key: String(index + 1), ctrlKey: true });
        expect(callbacks.onNavigate).toHaveBeenCalledWith(tab);
      });
    });

    it('does not navigate on Ctrl+9', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: '9', ctrlKey: true });
      expect(callbacks.onNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Ctrl+F opens search', () => {
    it('fires onToggleSearch on Ctrl+F', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: 'f', ctrlKey: true });
      expect(callbacks.onToggleSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ctrl+Shift+S toggles auto-scroll', () => {
    it('fires onToggleAutoScroll on Ctrl+Shift+S', () => {
      renderShortcuts();
      fireEvent.keyDown(window, { key: 'S', ctrlKey: true, shiftKey: true });
      expect(callbacks.onToggleAutoScroll).toHaveBeenCalledTimes(1);
    });
  });

  describe('ignores shortcuts in input fields', () => {
    it('does not fire shortcuts when target is an INPUT', () => {
      renderShortcuts();
      const input = document.createElement('input');
      document.body.appendChild(input);

      fireEvent.keyDown(input, { key: '?' });
      expect(callbacks.onToggleShortcutsModal).not.toHaveBeenCalled();

      fireEvent.keyDown(input, { key: 'k', ctrlKey: true });
      expect(callbacks.onToggleCommandPalette).not.toHaveBeenCalled();

      document.body.removeChild(input);
    });

    it('does not fire shortcuts when target is a TEXTAREA', () => {
      renderShortcuts();
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      fireEvent.keyDown(textarea, { key: '/' });
      expect(callbacks.onToggleCommandPalette).not.toHaveBeenCalled();

      document.body.removeChild(textarea);
    });

    it('does not fire shortcuts when target is contentEditable', () => {
      renderShortcuts();
      const div = document.createElement('div');
      div.setAttribute('contenteditable', 'true');
      // jsdom may not set isContentEditable from the attribute alone,
      // so we define it explicitly to match real browser behavior.
      Object.defineProperty(div, 'isContentEditable', { value: true });
      document.body.appendChild(div);

      fireEvent.keyDown(div, { key: '?' });
      expect(callbacks.onToggleShortcutsModal).not.toHaveBeenCalled();

      document.body.removeChild(div);
    });
  });

  describe('uses latest callback references', () => {
    it('calls updated callback after rerender', () => {
      const newOnNavigate = vi.fn();
      const { rerender } = renderHook(
        (props) => useKeyboardShortcuts(props),
        { initialProps: callbacks }
      );

      rerender({ ...callbacks, onNavigate: newOnNavigate });

      fireEvent.keyDown(window, { key: '1', ctrlKey: true });
      expect(callbacks.onNavigate).not.toHaveBeenCalled();
      expect(newOnNavigate).toHaveBeenCalledWith('overview');
    });
  });

  describe('cleanup', () => {
    it('removes event listener on unmount', () => {
      const { unmount } = renderShortcuts();
      unmount();

      fireEvent.keyDown(window, { key: '?' });
      expect(callbacks.onToggleShortcutsModal).not.toHaveBeenCalled();
    });
  });
});
