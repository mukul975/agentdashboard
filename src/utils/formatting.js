/**
 * Formatting utilities for the Agent Dashboard.
 */

const COLORS = [
  'bg-blue-600',
  'bg-purple-600',
  'bg-green-600',
  'bg-red-600',
  'bg-yellow-600',
  'bg-pink-600',
  'bg-indigo-600',
  'bg-orange-500',
];

export function formatRelativeTime(timestamp) {
  if (timestamp == null || timestamp === '') return '';

  let date;
  if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  } else if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    return '';
  }

  if (isNaN(date.getTime())) return '';

  const now = Date.now();
  const diffMs = now - date.getTime();
  if (diffMs < 0) return 'just now';

  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'just now';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

export function getAgentColor(agentName) {
  if (!agentName || typeof agentName !== 'string') return COLORS[0];

  let hash = 0;
  for (let i = 0; i < agentName.length; i++) {
    hash += agentName.charCodeAt(i);
  }
  return COLORS[hash % COLORS.length];
}

export function getAgentInitials(agentName) {
  if (!agentName || typeof agentName !== 'string') return '';

  const parts = agentName.split(/[-_]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return agentName[0].toUpperCase();
}

export function formatMessageText(text) {
  if (text == null || typeof text !== 'string') {
    return { type: 'text', content: '' };
  }

  const stripped = text.replace(/\*\*(.*?)\*\*/g, '$1');

  if (stripped.trimStart().startsWith('{')) {
    try {
      const parsed = JSON.parse(stripped);
      return {
        type: parsed.type || 'json',
        summary: parsed.summary || undefined,
        subject: parsed.subject || undefined,
        content: parsed,
      };
    } catch {
      return { type: 'raw', content: stripped };
    }
  }

  return { type: 'text', content: stripped };
}
