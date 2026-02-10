import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Maximize2, Minimize2, Download, RefreshCw } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function AgentOutputViewer({ agentOutputs }) {
  const [selectedOutput, setSelectedOutput] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const outputRef = useRef(null);

  useEffect(() => {
    // Auto-select most recent output
    if (agentOutputs && agentOutputs.length > 0 && !selectedOutput) {
      setSelectedOutput(agentOutputs[0]);
    }
  }, [agentOutputs, selectedOutput]);

  useEffect(() => {
    // Auto-scroll to bottom when content updates
    if (autoScroll && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [selectedOutput, autoScroll]);

  const downloadOutput = () => {
    if (!selectedOutput) return;

    const blob = new Blob([selectedOutput.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-${selectedOutput.taskId}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!agentOutputs || agentOutputs.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-5 w-5 text-claude-orange" />
          <h3 className="text-lg font-semibold text-white">Agent Output Stream</h3>
        </div>
        <div className="text-center py-12 text-gray-400">
          <Terminal className="h-16 w-16 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No agent outputs available</p>
          <p className="text-xs mt-1">Real-time teammate outputs will stream here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${isExpanded ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-claude-orange animate-pulse" />
          <h3 className="text-lg font-semibold text-white">Agent Output Stream</h3>
          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              autoScroll
                ? 'bg-claude-orange text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            aria-label={autoScroll ? "Auto-scroll enabled" : "Enable auto-scroll"}
            title={autoScroll ? "Auto-scroll enabled" : "Enable auto-scroll"}
          >
            <RefreshCw className={`h-4 w-4 ${autoScroll ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={downloadOutput}
            disabled={!selectedOutput}
            className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download agent output"
            title="Download agent output"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            aria-label={isExpanded ? 'Minimize output viewer' : 'Maximize output viewer'}
            aria-expanded={isExpanded}
            title={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Output Selector */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Select Agent Output:</label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {agentOutputs.map((output, index) => (
            <button
              key={output.taskId}
              onClick={() => setSelectedOutput(output)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedOutput?.taskId === output.taskId
                  ? 'bg-claude-orange text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              style={{
                animation: `fadeInScale 0.3s ease-out ${index * 0.05}s backwards`
              }}
            >
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>Task {output.taskId}</span>
              </div>
              <div className="text-xs opacity-75 mt-0.5">
                {dayjs(output.lastModified).fromNow()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Output Display */}
      {selectedOutput && (
        <>
          {/* Output Info */}
          <div className="mb-3 p-3 rounded-lg bg-gray-700/30 border border-gray-600/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  Task ID: <span className="text-white font-mono">{selectedOutput.taskId}</span>
                </span>
                <span className="text-gray-400">
                  Size: <span className="text-white">{formatSize(selectedOutput.size)}</span>
                </span>
              </div>
              <span className="text-gray-400">
                Updated: <span className="text-white">{dayjs(selectedOutput.lastModified).fromNow()}</span>
              </span>
            </div>
          </div>

          {/* Terminal Output */}
          <div
            ref={outputRef}
            className={`font-mono text-sm bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-700 ${
              isExpanded ? 'h-[calc(100vh-300px)]' : 'h-[500px]'
            }`}
            onScroll={(e) => {
              const { scrollTop, scrollHeight, clientHeight } = e.target;
              const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
              if (!isAtBottom && autoScroll) {
                setAutoScroll(false);
              }
            }}
          >
            {selectedOutput.content ? (
              <pre className="text-green-400 whitespace-pre-wrap break-words">
                {selectedOutput.content}
              </pre>
            ) : (
              <div className="text-gray-500 text-center py-12">
                <Terminal className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No output content available</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-3 text-xs text-gray-400 text-center">
            <span>Real-time output from Claude Code agent • Updates automatically every 2 seconds</span>
          </div>
        </>
      )}
    </div>
  );
}
