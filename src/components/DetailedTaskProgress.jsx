import React from 'react';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export function DetailedTaskProgress({ tasks }) {
  if (!tasks || tasks.length === 0) return null;

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const blockedTasks = tasks.filter(t => t.blockedBy && t.blockedBy.length > 0);

  const completionPercentage = tasks.length > 0
    ? Math.round((completedTasks.length / tasks.length) * 100)
    : 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-claude-orange" />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>Task Progress Details</h3>
        </div>
        <span className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>{completionPercentage}%</span>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Overall Completion</span>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
            {completedTasks.length} / {tasks.length} tasks
          </span>
        </div>
        <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
              background: 'linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }}
          ></div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-3">
        {/* Pending */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(234,179,8,0.2)' }}>
              <Clock className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Pending Tasks</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Waiting to start</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-yellow-400">{pendingTasks.length}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {tasks.length > 0 ? Math.round((pendingTasks.length / tasks.length) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(59,130,246,0.2)' }}>
              <div className="h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>In Progress</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Currently working</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-400">{inProgressTasks.length}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {tasks.length > 0 ? Math.round((inProgressTasks.length / tasks.length) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Completed</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Successfully finished</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-400">{completedTasks.length}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{completionPercentage}%</div>
          </div>
        </div>

        {/* Blocked */}
        {blockedTasks.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.2)' }}>
                <AlertCircle className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>Blocked</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Waiting on dependencies</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-red-400">{blockedTasks.length}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {tasks.length > 0 ? Math.round((blockedTasks.length / tasks.length) * 100) : 0}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
