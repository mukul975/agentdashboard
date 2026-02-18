/**
 * Message parsing utilities for converting raw agent messages
 * into human-readable natural language with categorization.
 */

/**
 * Determines the category of a message based on its content.
 * @param {string} text - Raw message text (may be JSON)
 * @returns {'status'|'completion'|'coordination'|'question'|'assignment'|'system'}
 */
export function getMessageCategory(text) {
  if (!text || text.trim() === '') return 'status';

  try {
    const parsed = JSON.parse(text);
    switch (parsed.type) {
      case 'task_completed':
        return 'completion';
      case 'task_assigned':
      case 'task_assignment':
        return 'assignment';
      case 'question':
        return 'question';
      case 'coordination':
        return 'coordination';
      case 'shutdown_request':
      case 'shutdown_response':
      case 'plan_approval_request':
      case 'plan_approval_response':
        return 'system';
      case 'idle_notification':
        return 'status';
      default:
        return 'status';
    }
  } catch (e) {
    // Not JSON - infer from plain text
    const lower = text.toLowerCase();
    if (lower.includes('completed') || lower.includes('finished') || text.includes('✓') || text.includes('✅')) {
      return 'completion';
    }
    if (lower.includes('question') || text.includes('?')) {
      return 'question';
    }
    if (lower.includes('coordin') || lower.includes('discuss') || lower.includes('help')) {
      return 'coordination';
    }
    if (lower.includes('assigned') || lower.includes('assignment')) {
      return 'assignment';
    }
    if (lower.includes('shutdown') || lower.includes('plan approval')) {
      return 'system';
    }
    return 'status';
  }
}

/**
 * Converts technical/JSON agent messages into human-readable natural language.
 * @param {string} text - Raw message text (may be JSON)
 * @param {string} [summary] - Optional summary provided alongside the message
 * @returns {{ text: string, type: string }}
 */
export function parseMessageToNatural(text, summary) {
  // If there's a clear summary, use it
  if (summary && !summary.includes('{') && !summary.includes('idle_notification')) {
    let type = 'status';
    if (summary.toLowerCase().includes('completed') || summary.includes('✓') || summary.includes('✅')) {
      type = 'completion';
    } else if (summary.toLowerCase().includes('question') || summary.includes('?')) {
      type = 'question';
    } else if (summary.toLowerCase().includes('coordin') || summary.toLowerCase().includes('discuss') || summary.toLowerCase().includes('help')) {
      type = 'coordination';
    } else if (summary.toLowerCase().includes('assigned') || summary.toLowerCase().includes('assignment')) {
      type = 'assignment';
    } else if (summary.toLowerCase().includes('shutdown') || summary.toLowerCase().includes('plan approval')) {
      type = 'system';
    }
    return { text: summary, type };
  }

  // Try to parse as JSON
  try {
    const parsed = JSON.parse(text);

    switch (parsed.type) {
      case 'idle_notification':
        return {
          text: parsed.lastTaskSubject
            ? `💤 Finished "${parsed.lastTaskSubject}" - ready for next task`
            : '💤 Available and waiting for assignment',
          type: 'status'
        };

      case 'task_completed':
        return {
          text: `✅ Completed: ${parsed.taskSubject || 'Task'}`,
          type: 'completion'
        };

      case 'task_assigned':
        return {
          text: `📋 Started working on: ${parsed.taskSubject || 'New task'}`,
          type: 'assignment'
        };

      case 'task_assignment':
        return {
          text: `📋 Assigned: ${parsed.subject || parsed.taskSubject || 'New task'}`,
          type: 'assignment'
        };

      case 'shutdown_request':
        return {
          text: '🔴 Shutdown requested',
          type: 'system'
        };

      case 'shutdown_response':
        if (parsed.approve) {
          return {
            text: '✅ Shutdown approved',
            type: 'system'
          };
        }
        return {
          text: `❌ Shutdown rejected${parsed.content ? ': ' + parsed.content : ''}`,
          type: 'system'
        };

      case 'plan_approval_request':
        return {
          text: '📝 Plan approval needed',
          type: 'system'
        };

      case 'plan_approval_response':
        if (parsed.approve) {
          return {
            text: '✅ Plan approved',
            type: 'system'
          };
        }
        return {
          text: `❌ Plan rejected${parsed.content ? ': ' + parsed.content : ''}`,
          type: 'system'
        };

      case 'question':
        return {
          text: `❓ ${parsed.message || parsed.content || 'Question raised'}`,
          type: 'question'
        };

      case 'coordination':
        return {
          text: `🤝 ${parsed.message || parsed.content || 'Coordinating with team'}`,
          type: 'coordination'
        };

      default:
        return {
          text: parsed.message || parsed.content || 'Message received',
          type: 'status'
        };
    }
  } catch (e) {
    // Not JSON, use as-is
    if (!text || text.trim() === '') {
      return { text: '👋 Said hello', type: 'status' };
    }

    let cleanText = text;

    // Strip leading/trailing markdown bold markers
    if (cleanText.startsWith('**')) {
      cleanText = cleanText.replace(/^\*\*(.+?)\*\*/, '$1');
    }

    // Truncate if too long
    if (cleanText.length > 150) {
      return {
        text: cleanText.substring(0, 150) + '...',
        type: getMessageCategory(text)
      };
    }

    return { text: cleanText, type: getMessageCategory(text) };
  }
}
