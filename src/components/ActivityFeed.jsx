import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Activity, Circle, Users, ListTodo, CheckCircle2 } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function ActivityFeed({ updates }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (updates) {
      const newActivity = {
        id: Date.now(),
        type: updates.type,
        timestamp: new Date().toISOString(),
        message: getActivityMessage(updates)
      };

      setActivities(prev => [newActivity, ...prev].slice(0, 50));
    }
  }, [updates]);

  const getActivityMessage = (update) => {
    switch (update.type) {
      case 'initial_data':
        return `Connected to dashboard - ${update.data?.length || 0} teams loaded`;
      case 'teams_update':
        return 'Team configuration updated';
      case 'task_update':
        return 'Task status changed';
      default:
        return 'System event';
    }
  };

  const getActivityConfig = (type) => {
    switch (type) {
      case 'initial_data':
        return {
          icon: CheckCircle2,
          color: '#4ade80',
          bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(21, 128, 61, 0.15) 100%)',
          glowColor: 'rgba(34, 197, 94, 0.4)',
          borderColor: 'rgba(34, 197, 94, 0.3)'
        };
      case 'teams_update':
        return {
          icon: Users,
          color: '#60a5fa',
          bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)',
          glowColor: 'rgba(59, 130, 246, 0.4)',
          borderColor: 'rgba(59, 130, 246, 0.3)'
        };
      case 'task_update':
        return {
          icon: ListTodo,
          color: '#c084fc',
          bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(147, 51, 234, 0.15) 100%)',
          glowColor: 'rgba(168, 85, 247, 0.4)',
          borderColor: 'rgba(168, 85, 247, 0.3)'
        };
      default:
        return {
          icon: Activity,
          color: '#9ca3af',
          bgGradient: 'rgba(55, 65, 81, 0.3)',
          glowColor: 'rgba(75, 85, 99, 0.3)',
          borderColor: 'rgba(75, 85, 99, 0.3)'
        };
    }
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.25) 0%, rgba(251, 146, 60, 0.15) 100%)',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(249, 115, 22, 0.3)'
            }}
          >
            <Activity
              className="h-5 w-5"
              style={{
                color: '#fb923c',
                filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))'
              }}
            />
          </div>
          <h3
            className="text-lg font-bold"
            style={{
              color: '#ffffff',
              letterSpacing: '-0.01em',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          >
            Activity Feed
          </h3>
        </div>

        {/* Event Counter */}
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#93c5fd',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}
        >
          {activities.length} events
        </span>
      </div>

      {/* Timeline Container */}
      <div
        className="max-h-96 overflow-y-auto pr-2"
        style={{
          scrollbarWidth: 'thin'
        }}
      >
        {activities.length === 0 ? (
          <div
            className="text-center py-12 rounded-xl"
            style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px dashed rgba(156, 163, 175, 0.2)'
            }}
          >
            <Activity className="h-12 w-12 text-gray-600 mx-auto mb-3 opacity-50" />
            <p className="text-gray-400 text-sm">No activity yet</p>
            <p className="text-gray-500 text-xs mt-1">Events will appear here in real-time</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-0.5"
              style={{
                background: 'linear-gradient(180deg, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.1) 100%)'
              }}
            />

            <div className="space-y-4">
              {activities.map((activity, index) => {
                const config = getActivityConfig(activity.type);
                const Icon = config.icon;

                return (
                  <div
                    key={activity.id}
                    className="relative pl-14 group"
                    style={{
                      animation: 'slideInRight 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      animationDelay: `${index * 60}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* Timeline Node */}
                    <div
                      className="absolute left-0 top-1 p-2 rounded-xl transition-all duration-300"
                      style={{
                        background: config.bgGradient,
                        border: `2px solid ${config.borderColor}`,
                        boxShadow: `0 4px 12px ${config.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                        zIndex: 10
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color: config.color,
                          filter: `drop-shadow(0 0 6px ${config.glowColor})`
                        }}
                      />

                      {/* Pulsing Ring */}
                      {index === 0 && (
                        <div
                          className="absolute inset-0 rounded-xl animate-ping"
                          style={{
                            background: config.bgGradient,
                            opacity: 0.4
                          }}
                        />
                      )}
                    </div>

                    {/* Activity Card */}
                    <div
                      className="rounded-xl p-4 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.5) 100%)',
                        border: '1px solid rgba(75, 85, 99, 0.3)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = config.borderColor;
                        e.currentTarget.style.boxShadow = `0 4px 16px ${config.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.3)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <p
                        className="text-sm font-medium mb-1.5"
                        style={{
                          color: 'rgba(255, 255, 255, 0.95)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {activity.message}
                      </p>

                      <div className="flex items-center gap-2">
                        <Circle
                          className="h-1.5 w-1.5"
                          style={{
                            color: config.color,
                            fill: config.color
                          }}
                        />
                        <p
                          className="text-xs"
                          style={{
                            color: 'rgba(156, 163, 175, 0.8)'
                          }}
                        >
                          {dayjs(activity.timestamp).fromNow()}
                        </p>
                      </div>

                      {/* Live indicator for latest activity */}
                      {index === 0 && (
                        <div className="absolute top-4 right-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: 'rgba(34, 197, 94, 0.15)',
                              color: '#4ade80',
                              border: '1px solid rgba(34, 197, 94, 0.3)'
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full animate-pulse"
                              style={{
                                background: '#4ade80',
                                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)'
                              }}
                            />
                            LIVE
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ActivityFeed.propTypes = {
  updates: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.array,
    stats: PropTypes.object
  })
};
