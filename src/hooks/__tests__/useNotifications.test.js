import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '../useNotifications';

describe('useNotifications', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('starts with empty notifications when localStorage is empty', () => {
    const { result } = renderHook(() => useNotifications());
    expect(result.current.notifications).toEqual([]);
    expect(result.current.unreadCount).toBe(0);
  });

  it('loads notifications from localStorage', () => {
    const stored = [
      { id: '1', type: 'info', title: 'Test', message: 'Hello', read: false, timestamp: '2024-01-01T00:00:00Z', tab: null },
    ];
    localStorage.setItem('dashboard-notifications', JSON.stringify(stored));

    const { result } = renderHook(() => useNotifications());
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].title).toBe('Test');
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('dashboard-notifications', 'not-json');
    const { result } = renderHook(() => useNotifications());
    expect(result.current.notifications).toEqual([]);
  });

  it('handles non-array stored value gracefully', () => {
    localStorage.setItem('dashboard-notifications', JSON.stringify({ foo: 'bar' }));
    const { result } = renderHook(() => useNotifications());
    expect(result.current.notifications).toEqual([]);
  });

  describe('addNotification', () => {
    it('adds a notification to the list', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({
          type: 'info',
          title: 'New Alert',
          message: 'Something happened',
        });
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].title).toBe('New Alert');
      expect(result.current.notifications[0].message).toBe('Something happened');
      expect(result.current.notifications[0].read).toBe(false);
      expect(result.current.notifications[0].type).toBe('info');
    });

    it('prepends new notifications (newest first)', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({ title: 'First' });
      });
      act(() => {
        result.current.addNotification({ title: 'Second' });
      });

      expect(result.current.notifications[0].title).toBe('Second');
      expect(result.current.notifications[1].title).toBe('First');
    });

    it('generates unique IDs for each notification', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({ title: 'A' });
      });
      act(() => {
        result.current.addNotification({ title: 'B' });
      });

      const ids = result.current.notifications.map(n => n.id);
      expect(ids[0]).not.toBe(ids[1]);
    });

    it('defaults type to info when not provided', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({ title: 'No type' });
      });

      expect(result.current.notifications[0].type).toBe('info');
    });

    it('persists to localStorage after adding', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({ title: 'Persisted' });
      });

      const stored = JSON.parse(localStorage.getItem('dashboard-notifications'));
      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe('Persisted');
    });
  });

  describe('markAsRead', () => {
    it('marks a specific notification as read', () => {
      const { result } = renderHook(() => useNotifications());

      let addedId;
      act(() => {
        const entry = result.current.addNotification({ title: 'Unread' });
        addedId = entry.id;
      });

      expect(result.current.notifications[0].read).toBe(false);

      act(() => {
        result.current.markAsRead(addedId);
      });

      expect(result.current.notifications[0].read).toBe(true);
    });
  });

  describe('markAllRead', () => {
    it('marks all notifications as read', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({ title: 'A' });
      });
      act(() => {
        result.current.addNotification({ title: 'B' });
      });

      expect(result.current.unreadCount).toBe(2);

      act(() => {
        result.current.markAllRead();
      });

      expect(result.current.unreadCount).toBe(0);
      expect(result.current.notifications.every(n => n.read)).toBe(true);
    });
  });

  describe('clearAll', () => {
    it('removes all notifications', () => {
      const { result } = renderHook(() => useNotifications());

      act(() => {
        result.current.addNotification({ title: 'A' });
      });
      act(() => {
        result.current.addNotification({ title: 'B' });
      });

      expect(result.current.notifications).toHaveLength(2);

      act(() => {
        result.current.clearAll();
      });

      expect(result.current.notifications).toEqual([]);
      expect(result.current.unreadCount).toBe(0);
    });
  });

  describe('unreadCount', () => {
    it('counts only unread notifications', () => {
      const { result } = renderHook(() => useNotifications());

      let firstId;
      act(() => {
        const entry = result.current.addNotification({ title: 'A' });
        firstId = entry.id;
      });
      act(() => {
        result.current.addNotification({ title: 'B' });
      });

      expect(result.current.unreadCount).toBe(2);

      act(() => {
        result.current.markAsRead(firstId);
      });

      expect(result.current.unreadCount).toBe(1);
    });
  });

  describe('WebSocket message deduplication', () => {
    it('skips first lastRawMessage on mount (initialization guard)', () => {
      const initialMessage = { type: 'teams_update', data: [{ name: 'Alpha' }], timestamp: '1' };
      const { result } = renderHook(() => useNotifications({ lastRawMessage: initialMessage }));

      // The first message is skipped due to initializedRef guard
      expect(result.current.notifications).toEqual([]);
    });

    it('generates notification on second lastRawMessage change', () => {
      const { result, rerender } = renderHook(
        ({ msg }) => useNotifications({ lastRawMessage: msg }),
        { initialProps: { msg: { type: 'teams_update', data: [{ name: 'Alpha' }], timestamp: '1' } } }
      );

      // First message skipped
      expect(result.current.notifications).toHaveLength(0);

      // Second message should generate a notification
      rerender({ msg: { type: 'teams_update', data: [{ name: 'Beta' }], timestamp: '2' } });
      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].type).toBe('team');
    });

    it('deduplicates messages with the same fingerprint', () => {
      const msg1 = { type: 'teams_update', data: [{ name: 'Alpha' }], timestamp: '1' };
      const msg2 = { type: 'teams_update', data: [{ name: 'Beta' }], timestamp: '2' };
      const msg2dup = { type: 'teams_update', data: [{ name: 'Beta' }], timestamp: '2' };

      const { result, rerender } = renderHook(
        ({ msg }) => useNotifications({ lastRawMessage: msg }),
        { initialProps: { msg: msg1 } }
      );

      // First is skipped (initialization)
      rerender({ msg: msg2 });
      expect(result.current.notifications).toHaveLength(1);

      // Same fingerprint (same type + timestamp) should be deduplicated
      rerender({ msg: msg2dup });
      expect(result.current.notifications).toHaveLength(1);
    });
  });
});
