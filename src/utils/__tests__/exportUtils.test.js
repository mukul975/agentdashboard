import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportToCSV, exportToJSON } from '../exportUtils';

// Mock DOM APIs used by downloadFile
let lastBlobContent;
let lastBlobType;
let lastDownloadFilename;

beforeEach(() => {
  lastBlobContent = null;
  lastBlobType = null;
  lastDownloadFilename = null;

  // Mock Blob
  global.Blob = class MockBlob {
    constructor(parts, options) {
      lastBlobContent = parts.join('');
      lastBlobType = options?.type;
    }
  };

  // Mock URL.createObjectURL / revokeObjectURL
  global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
  global.URL.revokeObjectURL = vi.fn();

  // Mock document.createElement to track download
  const mockAnchor = { href: '', download: '', click: vi.fn() };
  vi.spyOn(document, 'createElement').mockImplementation((tag) => {
    if (tag === 'a') {
      return new Proxy(mockAnchor, {
        set(target, prop, value) {
          target[prop] = value;
          if (prop === 'download') lastDownloadFilename = value;
          return true;
        }
      });
    }
    return document.createElement(tag);
  });
});

describe('exportToJSON', () => {
  it('produces valid JSON blob from data', () => {
    const data = [{ name: 'Alice', role: 'lead' }, { name: 'Bob', role: 'agent' }];
    exportToJSON(data, 'test-export');

    const parsed = JSON.parse(lastBlobContent);
    expect(parsed).toEqual(data);
    expect(lastBlobType).toBe('application/json');
    expect(lastDownloadFilename).toBe('test-export.json');
  });

  it('handles empty array', () => {
    exportToJSON([], 'empty');

    const parsed = JSON.parse(lastBlobContent);
    expect(parsed).toEqual([]);
    expect(lastDownloadFilename).toBe('empty.json');
  });

  it('handles nested objects', () => {
    const data = { team: 'alpha', agents: [{ name: 'a1' }] };
    exportToJSON(data, 'nested');

    const parsed = JSON.parse(lastBlobContent);
    expect(parsed.team).toBe('alpha');
    expect(parsed.agents[0].name).toBe('a1');
  });
});

describe('exportToCSV', () => {
  it('produces correct CSV headers and rows', () => {
    const data = [
      { name: 'Alice', role: 'lead', tasks: 5 },
      { name: 'Bob', role: 'agent', tasks: 3 }
    ];
    exportToCSV(data, 'teams');

    const lines = lastBlobContent.split('\n');
    expect(lines[0]).toBe('name,role,tasks');
    expect(lines[1]).toBe('"Alice","lead",5');
    expect(lines[2]).toBe('"Bob","agent",3');
    expect(lastBlobType).toBe('text/csv');
    expect(lastDownloadFilename).toBe('teams.csv');
  });

  it('escapes double quotes in string values', () => {
    const data = [{ note: 'He said "hello"' }];
    exportToCSV(data, 'quotes');

    const lines = lastBlobContent.split('\n');
    expect(lines[1]).toBe('"He said ""hello"""');
  });

  it('does nothing with empty data array', () => {
    exportToCSV([], 'empty');
    // downloadFile is never called, so blob content stays null
    expect(lastBlobContent).toBeNull();
  });

  it('handles typical task data', () => {
    const data = [
      { id: '1', subject: 'Fix bug', status: 'completed', owner: 'agent-1' },
      { id: '2', subject: 'Add tests', status: 'in_progress', owner: 'agent-2' }
    ];
    exportToCSV(data, 'tasks');

    const lines = lastBlobContent.split('\n');
    expect(lines.length).toBe(3); // header + 2 rows
    expect(lines[0]).toBe('id,subject,status,owner');
  });
});
