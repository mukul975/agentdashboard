import React, { useState } from 'react';
import { History, Users, CheckCircle2, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function TeamHistory({ teamHistory }) {
  const [expandedTeam, setExpandedTeam] = useState(null);

  if (!teamHistory || teamHistory.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-claude-orange" />
          <h3 className="text-lg font-semibold text-white">Team History</h3>
        </div>
        <div className="text-center py-12 text-gray-400">
          <History className="h-16 w-16 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No team history yet</p>
          <p className="text-xs mt-1">Past teams will appear here</p>
        </div>
      </div>
    );
  }

  const toggleTeam = (teamName) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };

  const getTaskStats = (tasks) => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      pending: tasks.filter(t => t.status === 'pending').length
    };
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-claude-orange" />
          <h3 className="text-lg font-semibold text-white">Team History</h3>
        </div>
        <span className="text-sm text-gray-400">
          {teamHistory.length} team{teamHistory.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {teamHistory.map((team, index) => {
          const stats = getTaskStats(team.tasks);
          const isExpanded = expandedTeam === team.name;
          const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

          return (
            <div
              key={team.name}
              className="border border-gray-700 rounded-xl overflow-hidden transition-all hover:border-claude-orange/50"
              style={{
                animation: `fadeInScale 0.3s ease-out ${index * 0.05}s backwards`
              }}
            >
              {/* Team Header */}
              <div
                className="p-4 bg-gray-700/30 cursor-pointer hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleTeam(team.name)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? `Collapse ${team.name} details` : `Expand ${team.name} details`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTeam(team.name);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1" aria-hidden="true">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">{team.name}</h4>
                      {team.isActive && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {team.config.members?.length || 0} members
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {stats.total} tasks
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dayjs(team.lastModified).fromNow()}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {stats.completed}/{stats.total} tasks completed ({Math.round(completionRate)}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-4 bg-gray-800/30 border-t border-gray-700 space-y-4">
                  {/* Members */}
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-2">Team Members</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {team.config.members?.map((member, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-gray-700/30 border border-gray-600/50"
                        >
                          <div className="font-medium text-sm text-white">{member.name}</div>
                          <div className="text-xs text-gray-400">{member.agentType}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Task Stats */}
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-2">Task Summary</h5>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded-lg bg-gray-700/30 text-center">
                        <div className="text-lg font-bold text-white">{stats.total}</div>
                        <div className="text-xs text-gray-400">Total</div>
                      </div>
                      <div className="p-2 rounded-lg bg-green-500/10 text-center">
                        <div className="text-lg font-bold text-green-400">{stats.completed}</div>
                        <div className="text-xs text-gray-400">Done</div>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-500/10 text-center">
                        <div className="text-lg font-bold text-blue-400">{stats.inProgress}</div>
                        <div className="text-xs text-gray-400">Active</div>
                      </div>
                      <div className="p-2 rounded-lg bg-yellow-500/10 text-center">
                        <div className="text-lg font-bold text-yellow-400">{stats.pending}</div>
                        <div className="text-xs text-gray-400">Pending</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Tasks */}
                  {team.tasks.slice(0, 5).length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-white mb-2">Recent Tasks</h5>
                      <div className="space-y-1">
                        {team.tasks.slice(0, 5).map((task, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-gray-700/20 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full flex-shrink-0 ${
                                task.status === 'completed' ? 'bg-green-400' :
                                task.status === 'in_progress' ? 'bg-blue-400' :
                                'bg-yellow-400'
                              }`}></span>
                              <span className="text-white truncate">{task.subject}</span>
                              {task.owner && (
                                <span className="ml-auto text-xs text-gray-400">{task.owner}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
