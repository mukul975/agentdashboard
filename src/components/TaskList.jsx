import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Circle, Clock, CheckCircle, AlertCircle, User, ChevronDown, ChevronUp } from 'lucide-react';

export function TaskList({ tasks }) {
  const [expandedTasks, setExpandedTasks] = useState(new Set());

  if (!tasks || tasks.length === 0) {
    return (
      <div
        className="text-center py-12 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
          border: '1px dashed rgba(156, 163, 175, 0.3)'
        }}
      >
        <Circle className="h-12 w-12 text-gray-600 mx-auto mb-3 opacity-50" />
        <p className="text-gray-400 text-sm">No tasks yet</p>
      </div>
    );
  }

  const toggleTaskExpanded = (taskId) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Circle
            className="h-6 w-6"
            style={{
              color: '#facc15',
              filter: 'drop-shadow(0 0 6px rgba(250, 204, 21, 0.5))'
            }}
          />
        );
      case 'in_progress':
        return (
          <Clock
            className="h-6 w-6 animate-spin"
            style={{
              color: '#60a5fa',
              filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))',
              animationDuration: '3s'
            }}
          />
        );
      case 'completed':
        return (
          <CheckCircle
            className="h-6 w-6"
            style={{
              color: '#4ade80',
              filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.5))'
            }}
          />
        );
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusConfig = (status, blockedBy) => {
    if (blockedBy && blockedBy.length > 0) {
      return {
        label: 'Blocked',
        bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.15) 100%)',
        textColor: '#f87171',
        borderColor: 'rgba(239, 68, 68, 0.4)',
        glowColor: 'rgba(239, 68, 68, 0.3)'
      };
    }

    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          bgGradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(202, 138, 4, 0.12) 100%)',
          textColor: '#facc15',
          borderColor: 'rgba(234, 179, 8, 0.4)',
          glowColor: 'rgba(234, 179, 8, 0.3)'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)',
          textColor: '#60a5fa',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          glowColor: 'rgba(59, 130, 246, 0.35)'
        };
      case 'completed':
        return {
          label: 'Completed',
          bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(21, 128, 61, 0.15) 100%)',
          textColor: '#4ade80',
          borderColor: 'rgba(34, 197, 94, 0.5)',
          glowColor: 'rgba(34, 197, 94, 0.3)'
        };
      default:
        return {
          label: 'Unknown',
          bgGradient: 'rgba(55, 65, 81, 0.3)',
          textColor: '#9ca3af',
          borderColor: 'rgba(75, 85, 99, 0.4)',
          glowColor: 'rgba(75, 85, 99, 0.2)'
        };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {tasks.map((task, index) => {
        const statusConfig = getStatusConfig(task.status, task.blockedBy);
        const isExpanded = expandedTasks.has(task.id || index);
        const hasDescription = task.description && task.description.length > 100;

        return (
          <div
            key={task.id || index}
            className="group relative rounded-2xl p-5 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.5) 100%)',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              animationDelay: `${index * 60}ms`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(6px)';
              e.currentTarget.style.borderColor = statusConfig.borderColor;
              e.currentTarget.style.boxShadow = `0 6px 20px ${statusConfig.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.3)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
            }}
          >
            {/* Status Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{
                background: statusConfig.bgGradient,
                boxShadow: `0 0 12px ${statusConfig.glowColor}`
              }}
            />

            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="mt-0.5 flex-shrink-0">
                {getStatusIcon(task.status)}
              </div>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h5
                    className="text-white font-bold text-base leading-tight"
                    style={{
                      letterSpacing: '-0.01em',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {task.subject}
                  </h5>

                  {/* Status Badge */}
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex-shrink-0"
                    style={{
                      background: statusConfig.bgGradient,
                      color: statusConfig.textColor,
                      border: `1px solid ${statusConfig.borderColor}`,
                      boxShadow: `0 2px 8px ${statusConfig.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
                      textShadow: `0 0 10px ${statusConfig.glowColor}`
                    }}
                  >
                    {statusConfig.label}
                  </span>
                </div>

                {/* Description */}
                {task.description && (
                  <div className="mb-3">
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'rgba(209, 213, 219, 0.85)',
                        letterSpacing: '-0.01em',
                        ...(!isExpanded && hasDescription ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {})
                      }}
                    >
                      {task.description}
                    </p>
                    {hasDescription && (
                      <button
                        onClick={() => toggleTaskExpanded(task.id || index)}
                        className="flex items-center gap-1 text-xs font-medium mt-2 transition-colors duration-200"
                        style={{
                          color: statusConfig.textColor
                        }}
                        aria-label={isExpanded ? "Show less description" : "Show full description"}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            Read more
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Tags and Metadata */}
                <div className="flex flex-wrap gap-2">
                  {task.owner && (
                    <div
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        gap: 6,
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#93c5fd',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>{task.owner}</span>
                    </div>
                  )}

                  {task.blockedBy && task.blockedBy.length > 0 && (
                    <div
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        gap: 6,
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#fca5a5',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        boxShadow: '0 0 12px rgba(239, 68, 68, 0.2)'
                      }}
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Blocked by {task.blockedBy.length}</span>
                    </div>
                  )}

                  {task.blocks && task.blocks.length > 0 && (
                    <div
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        gap: 6,
                        background: 'rgba(249, 115, 22, 0.15)',
                        color: '#fdba74',
                        border: '1px solid rgba(249, 115, 22, 0.3)'
                      }}
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Blocks {task.blocks.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hover Shine Effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)'
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      subject: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.oneOf(['pending', 'in_progress', 'completed']).isRequired,
      owner: PropTypes.string,
      blockedBy: PropTypes.array,
      blocks: PropTypes.array,
      createdAt: PropTypes.number,
      updatedAt: PropTypes.number
    })
  )
};
