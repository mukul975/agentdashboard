import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounterAnimation, useCounterAnimationWithHighlight, useStaggeredAnimation } from '../useCounterAnimation';

describe('useCounterAnimation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the initial target value immediately', () => {
    const { result } = renderHook(() => useCounterAnimation(42));
    expect(result.current).toBe(42);
  });

  it('returns 0 when initialized with 0', () => {
    const { result } = renderHook(() => useCounterAnimation(0));
    expect(result.current).toBe(0);
  });

  it('animates toward a new target value using requestAnimationFrame', () => {
    // Mock requestAnimationFrame to capture callbacks
    const rafCallbacks = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { result, rerender } = renderHook(
      ({ value }) => useCounterAnimation(value, 600),
      { initialProps: { value: 0 } }
    );

    expect(result.current).toBe(0);

    // Change target to 100
    rerender({ value: 100 });

    // requestAnimationFrame should have been called
    expect(rafCallbacks.length).toBeGreaterThan(0);

    // Simulate animation frame at midpoint (300ms elapsed of 600ms duration)
    const startTime = performance.now();
    act(() => {
      rafCallbacks[rafCallbacks.length - 1](startTime + 300);
    });

    // Value should be partially animated (not 0, not yet 100)
    expect(result.current).toBeGreaterThan(0);
    expect(result.current).toBeLessThanOrEqual(100);

    // Simulate animation frame at completion (600ms+ elapsed)
    act(() => {
      rafCallbacks[rafCallbacks.length - 1](startTime + 700);
    });

    // Should have reached the target
    expect(result.current).toBe(100);
  });

  it('does not animate when target value stays the same', () => {
    vi.spyOn(window, 'requestAnimationFrame');

    const { rerender } = renderHook(
      ({ value }) => useCounterAnimation(value),
      { initialProps: { value: 50 } }
    );

    const callCount = window.requestAnimationFrame.mock.calls.length;

    // Rerender with same value
    rerender({ value: 50 });

    // No new animation frames should be requested
    expect(window.requestAnimationFrame.mock.calls.length).toBe(callCount);
  });

  it('cancels ongoing animation on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 999);

    const { rerender, unmount } = renderHook(
      ({ value }) => useCounterAnimation(value),
      { initialProps: { value: 0 } }
    );

    rerender({ value: 100 });
    unmount();

    expect(cancelSpy).toHaveBeenCalled();
  });
});

describe('useCounterAnimationWithHighlight', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial values with no change direction', () => {
    const { result } = renderHook(() => useCounterAnimationWithHighlight(10));
    expect(result.current.value).toBe(10);
    expect(result.current.isIncreasing).toBe(false);
    expect(result.current.isDecreasing).toBe(false);
    expect(result.current.hasChanged).toBe(false);
  });

  it('detects increase direction when target increases', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { result, rerender } = renderHook(
      ({ value }) => useCounterAnimationWithHighlight(value),
      { initialProps: { value: 10 } }
    );

    rerender({ value: 20 });

    expect(result.current.isIncreasing).toBe(true);
    expect(result.current.isDecreasing).toBe(false);
    expect(result.current.hasChanged).toBe(true);
  });

  it('detects decrease direction when target decreases', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { result, rerender } = renderHook(
      ({ value }) => useCounterAnimationWithHighlight(value),
      { initialProps: { value: 20 } }
    );

    rerender({ value: 5 });

    expect(result.current.isDecreasing).toBe(true);
    expect(result.current.isIncreasing).toBe(false);
    expect(result.current.hasChanged).toBe(true);
  });
});

describe('useStaggeredAnimation', () => {
  it('returns correct delay for index 0', () => {
    const { result } = renderHook(() => useStaggeredAnimation(0));
    expect(result.current.animationDelay).toBe('0ms');
    expect(result.current.style.animationDelay).toBe('0ms');
  });

  it('returns correct delay for index 3 with default increment', () => {
    const { result } = renderHook(() => useStaggeredAnimation(3));
    expect(result.current.animationDelay).toBe('180ms');
    expect(result.current.style.animationDelay).toBe('180ms');
  });

  it('uses custom delay increment', () => {
    const { result } = renderHook(() => useStaggeredAnimation(2, 100));
    expect(result.current.animationDelay).toBe('200ms');
    expect(result.current.style.animationDelay).toBe('200ms');
  });

  it('returns an object with both animationDelay and style properties', () => {
    const { result } = renderHook(() => useStaggeredAnimation(1));
    expect(result.current).toHaveProperty('animationDelay');
    expect(result.current).toHaveProperty('style');
    expect(result.current.style).toHaveProperty('animationDelay');
  });
});
