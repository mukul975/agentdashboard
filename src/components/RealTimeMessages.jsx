import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MessageCircle, ArrowRight, Radio } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { parseMessageToNatural, getMessageCategory } from '../utils/messageParser';
dayjs.extend(relativeTime);

export function RealTimeMessages({ teams, allInboxes = {} }) {
  const [filter, setFilter] = useState('all');

  const allMessages = useMemo(() => {
    return Object.entries(allInboxes)
      .flatMap(([teamName, agents]) =>
        Object.entries(agents || {}).flatMap(([agentName, inbox]) =>
          (inbox.messages || []).map(msg => {
            const naturalMsg = parseMessageToNatural(msg.text, msg.summary);
            return {
              id: `${teamName}-${agentName}-${msg.timestamp}-${msg.text?.slice(0, 8) || ''}`,
              from: msg.from || agentName,
              to: agentName,
              team: teamName,
              teamName,
              agentName,
              type: naturalMsg.type,
              message: naturalMsg.text,
              timestamp: new Date(msg.timestamp),
              color: msg.color || 'blue',
              read: msg.read || false
            };
          })
        )
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 100);
  }, [allInboxes]);

  const filteredMessages = filter === 'all'
    ? allMessages
    : allMessages.filter(m => m.type === filter);

  const getMessageColor = (type) => {
    switch (type) {
      case 'status': return 'message-status';
      case 'completion': return 'message-completion';
      case 'coordination': return 'message-coordination';
      case 'question': return 'message-question';
      case 'assignment': return 'message-status';
      case 'system': return 'border-gray-600 bg-gray-700/30';
      default: return 'border-gray-600 bg-gray-700/30';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'status': return '📊';
      case 'completion': return '✅';
      case 'coordination': return '🤝';
      case 'question': return '❓';
      case 'assignment': return '📋';
      case 'system': return '⚙️';
      default: return '💬';
    }
  };

  return (
    <div className="card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-claude-orange" />
          <h3 className="text-lg font-semibold text-white">Agent Inter-Communication</h3>
        </div>
        <span className="live-stats-indicator">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          {allMessages.length} {allMessages.length === 1 ? 'message' : 'messages'}
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['all', 'status', 'completion', 'coordination', 'question', 'assignment', 'system'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-button whitespace-nowrap ${
              filter === f ? 'filter-button-active' : 'filter-button-inactive'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-2" style={{ minHeight: 0 }}>
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageCircle className="h-16 w-16 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No messages yet</p>
            <p className="text-xs mt-1">Agent communication will stream here in real-time</p>
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div
              key={msg.id}
              className={`message-card p-3.5 rounded-xl border transition-all ${getMessageColor(msg.type)}`}
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              <div className="flex items-start gap-3">
                <span className="message-emoji text-2xl">{getTypeIcon(msg.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="agent-badge">{msg.from}</span>
                    <ArrowRight className="message-arrow h-3.5 w-3.5" />
                    <span className="text-sm text-gray-300 font-medium">{msg.to}</span>
                    <span className="message-timestamp ml-auto">
                      {dayjs(msg.timestamp).fromNow()}
                    </span>
                  </div>
                  <p className="message-text">{msg.message}</p>
                  {msg.team && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">Team: {msg.team}</span>
                      {!msg.read && (
                        <span className="unread-badge">New</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      <div className="pt-4 mt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-blue-400">
              {allMessages.filter(m => m.type === 'status').length}
            </div>
            <div className="text-xs text-gray-400">Status Updates</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-400">
              {allMessages.filter(m => m.type === 'completion').length}
            </div>
            <div className="text-xs text-gray-400">Completions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

RealTimeMessages.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      config: PropTypes.object,
      tasks: PropTypes.array
    })
  ),
  allInboxes: PropTypes.object
};
