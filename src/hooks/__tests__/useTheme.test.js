import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark theme when localStorage is empty', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('dashboard-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('sets data-theme attribute on document.documentElement', () => {
    renderHook(() => useTheme());
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('sets data-theme to light when localStorage has light', () => {
    localStorage.setItem('dashboard-theme', 'light');
    renderHook(() => useTheme());
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggleTheme switches from dark to light', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme(); // lgtm[js/call-to-non-callable]
    });

    expect(result.current.theme).toBe('light');
  });

  it('toggleTheme switches from light to dark', () => {
    localStorage.setItem('dashboard-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme(); // lgtm[js/call-to-non-callable]
    });

    expect(result.current.theme).toBe('dark');
  });

  it('persists theme to localStorage on toggle', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme(); // lgtm[js/call-to-non-callable]
    });

    expect(localStorage.getItem('dashboard-theme')).toBe('light');
  });

  it('updates document data-theme attribute on toggle', () => {
    const { result } = renderHook(() => useTheme());
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    act(() => {
      result.current.toggleTheme(); // lgtm[js/call-to-non-callable]
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles back and forth correctly', () => {
    const { result } = renderHook(() => useTheme());

    act(() => { result.current.toggleTheme(); }); // lgtm[js/call-to-non-callable]
    expect(result.current.theme).toBe('light');

    act(() => { result.current.toggleTheme(); }); // lgtm[js/call-to-non-callable]
    expect(result.current.theme).toBe('dark');

    act(() => { result.current.toggleTheme(); }); // lgtm[js/call-to-non-callable]
    expect(result.current.theme).toBe('light');
  });
});
