import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime, getAgentInitials, getAgentColor } from '../formatting';

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-18T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for timestamps less than 60 seconds ago', () => {
    const tenSecondsAgo = new Date('2026-02-18T11:59:50Z').toISOString();
    expect(formatRelativeTime(tenSecondsAgo)).toBe('just now');
  });

  it('returns minutes ago for timestamps within the last hour', () => {
    const twoMinutesAgo = new Date('2026-02-18T11:58:00Z').toISOString();
    expect(formatRelativeTime(twoMinutesAgo)).toBe('2m ago');
  });

  it('returns hours ago for timestamps within the last day', () => {
    const oneHourAgo = new Date('2026-02-18T11:00:00Z').toISOString();
    expect(formatRelativeTime(oneHourAgo)).toBe('1h ago');
  });

  it('returns days ago for timestamps older than 24 hours', () => {
    const threeDaysAgo = new Date('2026-02-15T12:00:00Z').toISOString();
    expect(formatRelativeTime(threeDaysAgo)).toBe('3d ago');
  });

  it('returns empty string for null input', () => {
    expect(formatRelativeTime(null)).toBe('');
  });

  it('returns empty string for undefined input', () => {
    expect(formatRelativeTime(undefined)).toBe('');
  });

  it('returns empty string for empty string input', () => {
    expect(formatRelativeTime('')).toBe('');
  });

  it('returns empty string for invalid date string', () => {
    expect(formatRelativeTime('not-a-date')).toBe('');
  });

  it('returns empty string for non-string non-number input', () => {
    expect(formatRelativeTime({})).toBe('');
  });

  it('handles numeric timestamps (ms since epoch)', () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5m ago');
  });

  it('returns "just now" for future timestamps', () => {
    const future = new Date('2026-02-18T13:00:00Z').toISOString();
    expect(formatRelativeTime(future)).toBe('just now');
  });
});

describe('getAgentInitials', () => {
  it('returns initials from hyphenated name', () => {
    expect(getAgentInitials('team-lead')).toBe('TL');
  });

  it('returns first two part initials for multi-part names', () => {
    expect(getAgentInitials('neo4j-graph-builder')).toBe('NG');
  });

  it('returns single uppercase letter for single-word name', () => {
    expect(getAgentInitials('a')).toBe('A');
  });

  it('returns initials from underscore-separated name', () => {
    expect(getAgentInitials('compliance_expert')).toBe('CE');
  });

  it('returns initials for compliance-expert', () => {
    expect(getAgentInitials('compliance-expert')).toBe('CE');
  });

  it('returns empty string for null input', () => {
    expect(getAgentInitials(null)).toBe('');
  });

  it('returns empty string for empty string input', () => {
    expect(getAgentInitials('')).toBe('');
  });

  it('returns empty string for non-string input', () => {
    expect(getAgentInitials(123)).toBe('');
  });
});

describe('getAgentColor', () => {
  it('returns the same color for the same agent name', () => {
    const color1 = getAgentColor('team-lead');
    const color2 = getAgentColor('team-lead');
    expect(color1).toBe(color2);
  });

  it('returns a valid Tailwind bg color class', () => {
    const color = getAgentColor('team-lead');
    expect(color).toMatch(/^bg-\w+-\d+$/);
  });

  it('can return different colors for different names', () => {
    const colors = new Set([
      getAgentColor('agent-alpha'),
      getAgentColor('agent-beta'),
      getAgentColor('agent-gamma'),
      getAgentColor('agent-delta'),
      getAgentColor('agent-epsilon'),
      getAgentColor('agent-zeta'),
      getAgentColor('agent-eta'),
      getAgentColor('agent-theta'),
    ]);
    // With 8 distinct names and 8 colors, we should get at least 2 distinct colors
    expect(colors.size).toBeGreaterThanOrEqual(2);
  });

  it('returns default color for null input', () => {
    const color = getAgentColor(null);
    expect(color).toBe('bg-blue-600');
  });

  it('returns default color for empty string', () => {
    const color = getAgentColor('');
    expect(color).toBe('bg-blue-600');
  });

  it('returns default color for non-string input', () => {
    const color = getAgentColor(42);
    expect(color).toBe('bg-blue-600');
  });
});
