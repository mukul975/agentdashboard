import { describe, it, expect } from 'vitest';
import { parseMessageToNatural, getMessageCategory } from '../messageParser';

describe('parseMessageToNatural', () => {
  it('parses JSON task_assignment and includes "Assigned"', () => {
    const json = JSON.stringify({
      type: 'task_assignment',
      subject: 'Build login page'
    });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Assigned');
    expect(result.type).toBe('assignment');
  });

  it('parses JSON task_assigned and includes relevant text', () => {
    const json = JSON.stringify({
      type: 'task_assigned',
      taskSubject: 'Fix header bug'
    });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Fix header bug');
    expect(result.type).toBe('assignment');
  });

  it('returns plain text as-is for non-JSON input', () => {
    const result = parseMessageToNatural('Hello, team!');
    expect(result.text).toBe('Hello, team!');
  });

  it('parses JSON shutdown_request and includes "Shutdown"', () => {
    const json = JSON.stringify({ type: 'shutdown_request' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Shutdown');
    expect(result.type).toBe('system');
  });

  it('parses shutdown_response with approve=true', () => {
    const json = JSON.stringify({ type: 'shutdown_response', approve: true });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Shutdown approved');
    expect(result.type).toBe('system');
  });

  it('parses shutdown_response with approve=false', () => {
    const json = JSON.stringify({ type: 'shutdown_response', approve: false, content: 'Still working' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Shutdown rejected');
    expect(result.text).toContain('Still working');
    expect(result.type).toBe('system');
  });

  it('parses task_completed', () => {
    const json = JSON.stringify({ type: 'task_completed', taskSubject: 'Deploy app' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Completed');
    expect(result.text).toContain('Deploy app');
    expect(result.type).toBe('completion');
  });

  it('parses idle_notification with lastTaskSubject', () => {
    const json = JSON.stringify({ type: 'idle_notification', lastTaskSubject: 'Fix tests' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Fix tests');
    expect(result.type).toBe('status');
  });

  it('parses idle_notification without lastTaskSubject', () => {
    const json = JSON.stringify({ type: 'idle_notification' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('waiting');
    expect(result.type).toBe('status');
  });

  it('returns greeting for empty text', () => {
    const result = parseMessageToNatural('');
    expect(result.text).toContain('hello');
    expect(result.type).toBe('status');
  });

  it('uses summary when provided and not JSON-like', () => {
    const result = parseMessageToNatural('some raw text', 'Task completed successfully');
    expect(result.text).toBe('Task completed successfully');
    expect(result.type).toBe('completion');
  });

  it('truncates long plain text messages', () => {
    const longText = 'A'.repeat(200);
    const result = parseMessageToNatural(longText);
    expect(result.text.length).toBeLessThanOrEqual(154); // 150 + "..."
    expect(result.text).toContain('...');
  });

  it('strips leading markdown bold markers', () => {
    const result = parseMessageToNatural('**Important** update from the team');
    expect(result.text).toBe('Important update from the team');
  });

  it('parses question type', () => {
    const json = JSON.stringify({ type: 'question', message: 'How to proceed?' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('How to proceed?');
    expect(result.type).toBe('question');
  });

  it('parses coordination type', () => {
    const json = JSON.stringify({ type: 'coordination', content: 'Syncing with backend' });
    const result = parseMessageToNatural(json);
    expect(result.text).toContain('Syncing with backend');
    expect(result.type).toBe('coordination');
  });
});

describe('getMessageCategory', () => {
  it('returns "assignment" for task_assignment JSON', () => {
    const json = JSON.stringify({ type: 'task_assignment', subject: 'New task' });
    expect(getMessageCategory(json)).toBe('assignment');
  });

  it('returns "assignment" for task_assigned JSON', () => {
    const json = JSON.stringify({ type: 'task_assigned' });
    expect(getMessageCategory(json)).toBe('assignment');
  });

  it('returns "system" for shutdown_request JSON', () => {
    const json = JSON.stringify({ type: 'shutdown_request' });
    expect(getMessageCategory(json)).toBe('system');
  });

  it('returns "system" for shutdown_response JSON', () => {
    const json = JSON.stringify({ type: 'shutdown_response', approve: true });
    expect(getMessageCategory(json)).toBe('system');
  });

  it('returns "system" for plan_approval_request JSON', () => {
    const json = JSON.stringify({ type: 'plan_approval_request' });
    expect(getMessageCategory(json)).toBe('system');
  });

  it('returns "completion" for task_completed JSON', () => {
    const json = JSON.stringify({ type: 'task_completed', taskSubject: 'Done' });
    expect(getMessageCategory(json)).toBe('completion');
  });

  it('returns "question" for question JSON type', () => {
    const json = JSON.stringify({ type: 'question', message: 'Why?' });
    expect(getMessageCategory(json)).toBe('question');
  });

  it('returns "coordination" for coordination JSON type', () => {
    const json = JSON.stringify({ type: 'coordination' });
    expect(getMessageCategory(json)).toBe('coordination');
  });

  it('returns "status" for idle_notification JSON', () => {
    const json = JSON.stringify({ type: 'idle_notification' });
    expect(getMessageCategory(json)).toBe('status');
  });

  it('returns "status" for unknown JSON type', () => {
    const json = JSON.stringify({ type: 'unknown_type' });
    expect(getMessageCategory(json)).toBe('status');
  });

  it('returns "completion" for plain text with "completed"', () => {
    expect(getMessageCategory('Task completed successfully')).toBe('completion');
  });

  it('returns "question" for plain text with question mark', () => {
    expect(getMessageCategory('What should I do next?')).toBe('question');
  });

  it('returns "coordination" for plain text with "help"', () => {
    expect(getMessageCategory('I need help with this')).toBe('coordination');
  });

  it('returns "assignment" for plain text with "assigned"', () => {
    expect(getMessageCategory('Task assigned to you')).toBe('assignment');
  });

  it('returns "system" for plain text with "shutdown"', () => {
    expect(getMessageCategory('shutdown requested')).toBe('system');
  });

  it('returns "status" for empty text', () => {
    expect(getMessageCategory('')).toBe('status');
  });

  it('returns "status" for null input', () => {
    expect(getMessageCategory(null)).toBe('status');
  });

  it('returns "status" for generic plain text', () => {
    expect(getMessageCategory('Working on the feature')).toBe('status');
  });
});
