import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Inbox, Users, Search, ChevronDown, ChevronRight, ArrowDown, MessageSquare, User, Download } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-cyan-500',
  'bg-orange-500', 'bg-pink-500', 'bg-yellow-500', 'bg-red-500',
  'bg-indigo-500', 'bg-teal-500', 'bg-rose-500', 'bg-emerald-500'
];

const BORDER_COLOR_MAP = {
  green: 'border-l-green-500',
  blue: 'border-l-blue-500',
  purple: 'border-l-purple-500',
  cyan: 'border-l-cyan-400',
  orange: 'border-l-orange-500',
  pink: 'border-l-pink-500',
  yellow: 'border-l-yellow-500',
  red: 'border-l-red-500',
};

const DEFAULT_BORDER = 'border-l-gray-600';

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getAvatarColor(name) {
  return AVATAR_COLORS[hashCode(name) % AVATAR_COLORS.length];
}

function getInitials(name) {
  if (!name) return '??';
  const parts = name.split(/[-_\s]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getBorderClass(color) {
  if (!color) return DEFAULT_BORDER;
  return BORDER_COLOR_MAP[color.toLowerCase()] || DEFAULT_BORDER;
}

function HighlightText({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: 'rgba(249, 115, 22, 0.4)', color: '#fff', borderRadius: '2px', padding: '0 1px' }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

HighlightText.propTypes = {
  text: PropTypes.string,
  query: PropTypes.string,
};

function downloadBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeCsvField(value) {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function renderBoldMarkdown(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function MessageContent({ text }) {
  const [expanded, setExpanded] = useState(false);

  if (!text || text.trim() === '') {
    return <p className="text-sm text-gray-400 italic">Empty message</p>;
  }

  // Try JSON parse
  let parsed = null;
  const trimmed = text.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      parsed = JSON.parse(trimmed);
    } catch (e) {
      // starts with { but invalid JSON -- show as code block
      return (
        <pre
          className="text-xs text-gray-300 overflow-x-auto p-2 rounded"
          style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(55, 65, 81, 0.5)',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          <code>{trimmed}</code>
        </pre>
      );
    }
  }

  if (parsed && typeof parsed === 'object') {
    const summary = parsed.summary || parsed.content || parsed.message;
    return (
      <div>
        {summary && (
          <p className="text-sm text-gray-200 leading-relaxed mb-1">
            {renderBoldMarkdown(String(summary))}
          </p>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {expanded ? 'Hide raw data' : 'Show raw data'}
        </button>
        {expanded && (
          <pre
            className="text-xs text-gray-400 overflow-x-auto p-2 rounded mt-1"
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(55, 65, 81, 0.5)',
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            <code>{JSON.stringify(parsed, null, 2)}</code>
          </pre>
        )}
      </div>
    );
  }

  // Plain text with markdown bold
  return (
    <p className="text-sm text-gray-200 leading-relaxed">
      {renderBoldMarkdown(text)}
    </p>
  );
}

MessageContent.propTypes = {
  text: PropTypes.string,
};

function getUnreadCount(agentData) {
  if (!agentData || !agentData.messages) return 0;
  return agentData.messages.filter(m => m.read === false).length;
}

function getTeamUnreadCount(teamData) {
  if (!teamData) return 0;
  let count = 0;
  Object.values(teamData).forEach(agent => {
    count += getUnreadCount(agent);
  });
  return count;
}

function getTeamAgentCount(teamData) {
  if (!teamData) return 0;
  return Object.keys(teamData).length;
}

export function InboxViewer({ allInboxes }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [expandedTeams, setExpandedTeams] = useState({});
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [debouncedGlobalSearch, setDebouncedGlobalSearch] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const prevMessageCountRef = useRef(0);
  const globalSearchTimerRef = useRef(null);

  const teamNames = allInboxes ? Object.keys(allInboxes) : [];

  // Debounce global search by 200ms
  useEffect(() => {
    if (globalSearchTimerRef.current) {
      clearTimeout(globalSearchTimerRef.current);
    }
    globalSearchTimerRef.current = setTimeout(() => {
      setDebouncedGlobalSearch(globalSearchQuery);
    }, 200);
    return () => {
      if (globalSearchTimerRef.current) {
        clearTimeout(globalSearchTimerRef.current);
      }
    };
  }, [globalSearchQuery]);

  // Global search: flat list of all matching messages across all teams
  const globalSearchResults = useMemo(() => {
    const q = debouncedGlobalSearch.trim().toLowerCase();
    if (!q || !allInboxes) return [];

    const results = [];
    for (const teamName of Object.keys(allInboxes)) {
      const teamData = allInboxes[teamName];
      for (const agentName of Object.keys(teamData || {})) {
        const agentData = teamData[agentName];
        const messages = agentData?.messages || [];
        for (const msg of messages) {
          const textMatch = msg.text && msg.text.toLowerCase().includes(q);
          const fromMatch = msg.from && msg.from.toLowerCase().includes(q);
          const summaryMatch = msg.summary && msg.summary.toLowerCase().includes(q);
          if (textMatch || fromMatch || summaryMatch) {
            results.push({ ...msg, teamName, agentName });
          }
        }
      }
    }
    // Sort by timestamp descending (newest first)
    results.sort((a, b) => {
      if (!a.timestamp && !b.timestamp) return 0;
      if (!a.timestamp) return 1;
      if (!b.timestamp) return -1;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return results;
  }, [debouncedGlobalSearch, allInboxes]);

  // Auto-select first team/agent if none selected
  useEffect(() => {
    if (teamNames.length > 0 && !selectedTeam) {
      const firstTeam = teamNames[0];
      setSelectedTeam(firstTeam);
      setExpandedTeams(prev => ({ ...prev, [firstTeam]: true }));
      const agents = Object.keys(allInboxes[firstTeam] || {});
      if (agents.length > 0) {
        setSelectedAgent(agents[0]);
      }
    }
  }, [allInboxes, teamNames, selectedTeam]);

  // Get current messages
  const currentMessages = (selectedTeam && selectedAgent && allInboxes?.[selectedTeam]?.[selectedAgent]?.messages) || [];

  // Detect new messages and auto-scroll
  useEffect(() => {
    if (currentMessages.length > prevMessageCountRef.current) {
      if (isAtBottom && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (!isAtBottom) {
        setHasNewMessages(true);
      }
    }
    prevMessageCountRef.current = currentMessages.length;
  }, [currentMessages.length, isAtBottom]);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const threshold = 60;
    const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    setIsAtBottom(atBottom);
    if (atBottom) {
      setHasNewMessages(false);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setHasNewMessages(false);
    }
  };

  const handleExportJson = () => {
    if (!selectedTeam || !selectedAgent || currentMessages.length === 0) return;
    const json = JSON.stringify(currentMessages, null, 2);
    const filename = `${selectedTeam}-${selectedAgent}-${new Date().toISOString().split('T')[0]}.json`;
    downloadBlob(json, filename, 'application/json');
  };

  const handleExportCsv = () => {
    if (!selectedTeam || !selectedAgent || currentMessages.length === 0) return;
    const headers = ['timestamp', 'from', 'agentName', 'teamName', 'summary', 'text'];
    const rows = currentMessages.map(msg => [
      escapeCsvField(msg.timestamp || ''),
      escapeCsvField(msg.from || ''),
      escapeCsvField(selectedAgent),
      escapeCsvField(selectedTeam),
      escapeCsvField(msg.summary || ''),
      escapeCsvField((msg.text || '').substring(0, 200)),
    ].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const filename = `${selectedTeam}-${selectedAgent}-${new Date().toISOString().split('T')[0]}.csv`;
    downloadBlob(csv, filename, 'text/csv');
  };

  const toggleTeam = (teamName) => {
    setExpandedTeams(prev => ({ ...prev, [teamName]: !prev[teamName] }));
  };

  const selectAgent = (teamName, agentName) => {
    setSelectedTeam(teamName);
    setSelectedAgent(agentName);
    setSearchQuery('');
    setHasNewMessages(false);
    prevMessageCountRef.current = allInboxes?.[teamName]?.[agentName]?.messages?.length || 0;
  };

  // Filter messages by search
  const filteredMessages = searchQuery.trim()
    ? currentMessages.filter(msg => {
        const q = searchQuery.toLowerCase();
        return (
          (msg.text && msg.text.toLowerCase().includes(q)) ||
          (msg.from && msg.from.toLowerCase().includes(q)) ||
          (msg.summary && msg.summary.toLowerCase().includes(q))
        );
      })
    : currentMessages;

  // No data at all
  if (!allInboxes || teamNames.length === 0) {
    return (
      <div className="card" style={{ minHeight: '400px' }}>
        <div className="flex flex-col items-center justify-center py-16">
          <div style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.1))',
            padding: '1rem',
            borderRadius: '16px',
            marginBottom: '1rem'
          }}>
            <Inbox style={{ height: '48px', width: '48px', color: '#6b7280' }} />
          </div>
          <h3 className="text-lg font-semibold text-white" style={{ marginBottom: '0.5rem' }}>
            No Active Teams
          </h3>
          <p className="text-sm text-gray-400" style={{ textAlign: 'center', maxWidth: '300px' }}>
            When agent teams start communicating, their inboxes will appear here for monitoring.
          </p>
        </div>
      </div>
    );
  }

  const currentAgentData = selectedTeam && selectedAgent ? allInboxes[selectedTeam]?.[selectedAgent] : null;

  const isGlobalSearchActive = debouncedGlobalSearch.trim().length > 0;

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Global Search Bar */}
      <div style={{
        padding: '0.75rem 1rem',
        borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
        background: 'rgba(15, 23, 42, 0.3)',
      }}>
        <div style={{ position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '16px',
            width: '16px',
            color: '#6b7280',
          }} />
          <input
            type="text"
            placeholder="Search all messages..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-claude-orange"
            style={{ paddingLeft: '2.25rem' }}
            value={globalSearchQuery}
            onChange={e => setGlobalSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Global Search Results */}
      {isGlobalSearchActive ? (
        <div style={{ height: '560px', overflowY: 'auto', padding: '0.75rem 1rem' }}>
          <div className="text-xs text-gray-500 px-3 py-1" style={{ marginBottom: '0.5rem' }}>
            {globalSearchResults.length} match{globalSearchResults.length !== 1 ? 'es' : ''}
          </div>
          {globalSearchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center" style={{ paddingTop: '4rem' }}>
              <Search style={{ height: '40px', width: '40px', color: '#4b5563', marginBottom: '0.75rem' }} />
              <p className="text-sm text-gray-400">No messages match &quot;{debouncedGlobalSearch}&quot;</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {globalSearchResults.map((msg, idx) => {
                const borderClass = getBorderClass(msg.color);
                const timestamp = msg.timestamp ? dayjs(msg.timestamp) : null;
                const relTime = timestamp ? timestamp.fromNow() : '';
                const fullTime = timestamp ? timestamp.format('YYYY-MM-DD HH:mm:ss') : '';
                const displayText = msg.text
                  ? (msg.text.length > 300 ? msg.text.substring(0, 300) + '...' : msg.text)
                  : '';

                return (
                  <div
                    key={`gs-${msg.teamName}-${msg.agentName}-${msg.timestamp}-${idx}`}
                    className={`border-l-4 ${borderClass}`}
                    style={{
                      padding: '0.625rem 0.75rem',
                      borderRadius: '0 8px 8px 0',
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.45))',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onClick={() => {
                      setGlobalSearchQuery('');
                      setSelectedTeam(msg.teamName);
                      setSelectedAgent(msg.agentName);
                      setExpandedTeams(prev => ({ ...prev, [msg.teamName]: true }));
                    }}
                  >
                    {/* Breadcrumb: teamName > agentName */}
                    <div className="flex items-center gap-1" style={{ marginBottom: '0.375rem' }}>
                      <span className="text-xs font-medium" style={{ color: '#f97316' }}>{msg.teamName}</span>
                      <ChevronRight style={{ height: '10px', width: '10px', color: '#6b7280' }} />
                      <span className="text-xs font-medium text-gray-300">{msg.agentName}</span>
                      {timestamp && (
                        <span className="text-xs text-gray-500" style={{ marginLeft: 'auto' }} title={fullTime}>
                          {relTime}
                        </span>
                      )}
                    </div>
                    {/* Sender */}
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
                      <div
                        className={getAvatarColor(msg.from || 'unknown')}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.5rem',
                          fontWeight: 700,
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(msg.from || 'unknown')}
                      </div>
                      <span className="text-xs font-semibold text-white">{msg.from || 'Unknown'}</span>
                    </div>
                    {/* Message content with highlighted matches */}
                    <p className="text-sm text-gray-300 leading-relaxed" style={{ marginTop: '0.25rem' }}>
                      <HighlightText text={displayText} query={debouncedGlobalSearch.trim()} />
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        height: '560px',
        minHeight: 0,
      }}>
        {/* LEFT PANEL: Team + Agent List */}
        <div style={{
          borderRight: '1px solid rgba(55, 65, 81, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'rgba(15, 23, 42, 0.4)',
        }}>
          {/* Panel header */}
          <div style={{
            padding: '1rem 1rem 0.75rem 1rem',
            borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
          }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
              <Inbox style={{ height: '18px', width: '18px', color: '#ff8a3d' }} />
              <span className="text-sm font-semibold text-white">Inboxes</span>
            </div>
            <p className="text-xs text-gray-500">{teamNames.length} team{teamNames.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Scrollable team/agent list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
            {teamNames.map(teamName => {
              const teamData = allInboxes[teamName];
              const agentNames = Object.keys(teamData || {});
              const teamUnread = getTeamUnreadCount(teamData);
              const isExpanded = expandedTeams[teamName];
              const isTeamSelected = selectedTeam === teamName;

              return (
                <div key={teamName} style={{ marginBottom: '0.25rem' }}>
                  {/* Team row */}
                  <button
                    onClick={() => {
                      toggleTeam(teamName);
                      if (!isExpanded) {
                        setSelectedTeam(teamName);
                        if (agentNames.length > 0 && !selectedAgent) {
                          setSelectedAgent(agentNames[0]);
                        }
                      }
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.625rem',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      background: isTeamSelected
                        ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(251, 146, 60, 0.1))'
                        : 'transparent',
                      borderLeft: isTeamSelected ? '3px solid #f97316' : '3px solid transparent',
                    }}
                    className="hover:bg-gray-700"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <ChevronDown style={{ height: '14px', width: '14px', color: '#9ca3af', flexShrink: 0 }} />
                    ) : (
                      <ChevronRight style={{ height: '14px', width: '14px', color: '#9ca3af', flexShrink: 0 }} />
                    )}
                    <Users style={{ height: '14px', width: '14px', color: '#ff8a3d', flexShrink: 0 }} />
                    <span className="text-sm text-white truncate" style={{ flex: 1, textAlign: 'left' }}>
                      {teamName}
                    </span>
                    <span className="text-xs text-gray-500" style={{ flexShrink: 0 }}>
                      {agentNames.length}
                    </span>
                    {teamUnread > 0 && (
                      <span style={{
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        minWidth: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '9px',
                        padding: '0 5px',
                        flexShrink: 0,
                      }}>
                        {teamUnread}
                      </span>
                    )}
                  </button>

                  {/* Agent sub-items */}
                  {isExpanded && agentNames.length > 0 && (
                    <div style={{ paddingLeft: '1.25rem', marginTop: '0.125rem' }}>
                      {agentNames.map(agentName => {
                        const agentData = teamData[agentName];
                        const agentUnread = getUnreadCount(agentData);
                        const msgCount = agentData?.messageCount || agentData?.messages?.length || 0;
                        const isSelected = selectedTeam === teamName && selectedAgent === agentName;

                        return (
                          <button
                            key={agentName}
                            onClick={() => selectAgent(teamName, agentName)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.375rem 0.625rem',
                              borderRadius: '6px',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              marginBottom: '0.125rem',
                              background: isSelected
                                ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.12))'
                                : 'transparent',
                              borderLeft: isSelected ? '2px solid #fb923c' : '2px solid transparent',
                            }}
                            className="hover:bg-gray-700"
                          >
                            {/* Mini avatar */}
                            <div
                              className={getAvatarColor(agentName)}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.5625rem',
                                fontWeight: 700,
                                color: 'white',
                                flexShrink: 0,
                              }}
                            >
                              {getInitials(agentName)}
                            </div>
                            <span
                              className="text-xs truncate"
                              style={{
                                flex: 1,
                                textAlign: 'left',
                                color: isSelected ? '#ffffff' : '#d1d5db',
                              }}
                            >
                              {agentName}
                            </span>
                            <span className="text-xs text-gray-500" style={{ flexShrink: 0 }}>
                              {msgCount}
                            </span>
                            {agentUnread > 0 && (
                              <span style={{
                                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                color: 'white',
                                fontSize: '0.5625rem',
                                fontWeight: 700,
                                minWidth: '16px',
                                height: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                padding: '0 4px',
                                flexShrink: 0,
                              }}>
                                {agentUnread}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Team expanded but no agents */}
                  {isExpanded && agentNames.length === 0 && (
                    <div style={{ paddingLeft: '2rem', padding: '0.5rem 0.5rem 0.5rem 2rem' }}>
                      <p className="text-xs text-gray-500 italic">No inboxes yet</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Message Thread */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}>
          {selectedTeam && selectedAgent && currentAgentData ? (
            <>
              {/* Thread header */}
              <div style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                <div className="flex items-center gap-3">
                  <div
                    className={getAvatarColor(selectedAgent)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {getInitials(selectedAgent)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white" style={{ marginBottom: 0 }}>
                      {selectedAgent} <span className="text-gray-500 font-normal">@</span> <span className="text-gray-400 font-normal">{selectedTeam}</span>
                    </h4>
                    <p className="text-xs text-gray-500" style={{ marginBottom: 0 }}>
                      {currentAgentData.messageCount || currentMessages.length} message{(currentAgentData.messageCount || currentMessages.length) !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {currentMessages.length > 0 && (
                    <>
                      <button
                        onClick={handleExportJson}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: 'none', cursor: 'pointer' }}
                      >
                        <Download style={{ height: '10px', width: '10px' }} />
                        Export JSON
                      </button>
                      <button
                        onClick={handleExportCsv}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: 'none', cursor: 'pointer' }}
                      >
                        <Download style={{ height: '10px', width: '10px' }} />
                        Export CSV
                      </button>
                    </>
                  )}
                  {getUnreadCount(currentAgentData) > 0 && (
                    <span style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      color: '#93c5fd',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.625rem',
                      borderRadius: '6px',
                    }}>
                      {getUnreadCount(currentAgentData)} unread
                    </span>
                  )}
                </div>
              </div>

              {/* Search bar */}
              <div style={{
                padding: '0.5rem 1rem',
                borderBottom: '1px solid rgba(55, 65, 81, 0.3)',
                flexShrink: 0,
              }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '0.625rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '14px',
                    width: '14px',
                    color: '#6b7280',
                  }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    style={{
                      width: '100%',
                      padding: '0.375rem 0.625rem 0.375rem 2rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(55, 65, 81, 0.5)',
                      background: 'rgba(17, 24, 39, 0.6)',
                      color: '#e5e7eb',
                      fontSize: '0.8125rem',
                      outline: 'none',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(55, 65, 81, 0.5)'; }}
                  />
                </div>
              </div>

              {/* Message count bar */}
              <div className="text-xs text-gray-500 px-3 py-1" style={{
                borderBottom: '1px solid rgba(55, 65, 81, 0.3)',
                flexShrink: 0,
              }}>
                {searchQuery.trim()
                  ? `${filteredMessages.length} match${filteredMessages.length !== 1 ? 'es' : ''}`
                  : `${currentMessages.length} message${currentMessages.length !== 1 ? 's' : ''}`
                }
              </div>

              {/* Messages list */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '0.75rem 1rem',
                  position: 'relative',
                  minHeight: 0,
                }}
              >
                {filteredMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center" style={{ paddingTop: '4rem' }}>
                    <MessageSquare style={{ height: '40px', width: '40px', color: '#4b5563', marginBottom: '0.75rem' }} />
                    <p className="text-sm text-gray-400">
                      {searchQuery.trim() ? 'No messages match your search' : 'No messages yet'}
                    </p>
                    {!searchQuery.trim() && (
                      <p className="text-xs text-gray-500" style={{ marginTop: '0.25rem' }}>
                        Messages to this agent will appear here
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredMessages.map((msg, idx) => {
                      const borderClass = getBorderClass(msg.color);
                      const isUnread = msg.read === false;
                      const timestamp = msg.timestamp ? dayjs(msg.timestamp) : null;
                      const relativeTime = timestamp ? timestamp.fromNow() : '';
                      const fullTime = timestamp ? timestamp.format('YYYY-MM-DD HH:mm:ss') : '';

                      return (
                        <div
                          key={`${msg.timestamp}-${msg.from}-${idx}`}
                          className={`border-l-4 ${borderClass}`}
                          style={{
                            padding: '0.625rem 0.75rem',
                            borderRadius: '0 8px 8px 0',
                            background: isUnread
                              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.85))'
                              : 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.45))',
                            transition: 'background 0.15s ease',
                            maxHeight: '200px',
                            overflowY: 'auto',
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {/* Unread dot */}
                            {isUnread && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#3b82f6',
                                boxShadow: '0 0 6px rgba(59, 130, 246, 0.5)',
                                flexShrink: 0,
                                marginTop: '6px',
                              }} />
                            )}

                            {/* Avatar */}
                            <div
                              className={getAvatarColor(msg.from || 'unknown')}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.625rem',
                                fontWeight: 700,
                                color: 'white',
                                flexShrink: 0,
                              }}
                            >
                              {getInitials(msg.from || 'unknown')}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="flex items-center justify-between" style={{ marginBottom: '0.25rem' }}>
                                <span className="text-xs font-semibold text-white">
                                  {msg.from || 'Unknown'}
                                </span>
                                {timestamp && (
                                  <span
                                    className="text-xs text-gray-500"
                                    title={fullTime}
                                    style={{ flexShrink: 0, marginLeft: '0.5rem' }}
                                  >
                                    {relativeTime}
                                  </span>
                                )}
                              </div>
                              <MessageContent text={msg.text} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* New messages button */}
              {hasNewMessages && (
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }}>
                  <button
                    onClick={scrollToBottom}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.375rem 0.875rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(249, 115, 22, 0.4)',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(251, 146, 60, 0.9))',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <ArrowDown style={{ height: '12px', width: '12px' }} />
                    New messages
                  </button>
                </div>
              )}
            </>
          ) : (
            // No agent selected state
            <div className="flex flex-col items-center justify-center" style={{ height: '100%' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.06))',
                padding: '1rem',
                borderRadius: '16px',
                marginBottom: '0.75rem',
              }}>
                <User style={{ height: '36px', width: '36px', color: '#6b7280' }} />
              </div>
              <p className="text-sm text-gray-400">
                {selectedTeam ? 'Select an agent to view messages' : 'Select a team to get started'}
              </p>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Responsive: stack on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .card > div:first-child {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .card > div:first-child > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(55, 65, 81, 0.6);
            max-height: 200px;
          }
          .card > div:first-child > div:last-child {
            min-height: 400px;
          }
        }
      `}</style>
    </div>
  );
}

InboxViewer.propTypes = {
  allInboxes: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        messages: PropTypes.arrayOf(PropTypes.shape({
          from: PropTypes.string,
          text: PropTypes.string,
          timestamp: PropTypes.string,
          read: PropTypes.bool,
          color: PropTypes.string,
          summary: PropTypes.string,
        })),
        messageCount: PropTypes.number,
      })
    )
  ),
};
