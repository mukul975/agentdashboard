import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  X, Bell, BellOff, CheckCheck, Trash2,
  Users, CheckSquare, MessageSquare, Terminal, AlertTriangle, Info,
} from 'lucide-react';

const ICON_MAP = {
  team: Users, task: CheckSquare, message: MessageSquare,
  output: Terminal, system: AlertTriangle, info: Info,
};

const TYPE_STYLES = {
  team:    { border: 'border-l-blue-500',   bg: 'rgba(59,130,246,0.08)',   icon: 'text-blue-400'   },
  task:    { border: 'border-l-green-500',  bg: 'rgba(34,197,94,0.08)',    icon: 'text-green-400'  },
  message: { border: 'border-l-orange-500', bg: 'rgba(249,115,22,0.08)',   icon: 'text-orange-400' },
  output:  { border: 'border-l-purple-500', bg: 'rgba(168,85,247,0.08)',   icon: 'text-purple-400' },
  system:  { border: 'border-l-red-500',    bg: 'rgba(239,68,68,0.08)',    icon: 'text-red-400'    },
  info:    { border: 'border-l-gray-500',   bg: 'rgba(107,114,128,0.08)',  icon: 'text-gray-400'   },
};

function formatRelativeTime(timestamp) {
  const diffSec = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (diffSec < 10) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

function groupNotifications(notifications) {
  const now = Date.now();
  const ONE_MIN = 60_000;
  const ONE_DAY = 86_400_000;
  const groups = { justNow: [], today: [], earlier: [] };
  notifications.forEach(n => {
    const diff = now - new Date(n.timestamp).getTime();
    if (diff < ONE_MIN) groups.justNow.push(n);
    else if (diff < ONE_DAY) groups.today.push(n);
    else groups.earlier.push(n);
  });
  return groups;
}

function NotificationItem({ notification, onMarkRead, onNavigate }) {
  const IconComponent = ICON_MAP[notification.type] || Info;
  const style = TYPE_STYLES[notification.type] || TYPE_STYLES.info;

  const handleClick = () => {
    if (!notification.read) onMarkRead(notification.id);
    if (notification.tab && onNavigate) onNavigate(notification.tab);
  };

  const ariaLabel = [notification.title, notification.message, notification.tab ? `Go to ${notification.tab}` : ''].filter(Boolean).join(' — ');

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`notif-item w-full text-left flex items-start gap-3 px-4 py-3 border-l-[3px] ${style.border} transition-colors duration-150`}
      style={{ background: !notification.read ? style.bg : 'transparent' }}
    >
      <div
        className={`mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${style.icon}`}
        style={{ background: style.bg }}
      >
        <IconComponent className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span
            className="text-sm font-semibold leading-snug"
            style={{ color: 'var(--text-heading)' }}
          >
            {notification.title}
          </span>
          {!notification.read && (
            <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-claude-orange" />
          )}
        </div>
        <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {notification.message}
        </p>
        <span className="text-[11px] mt-1 block" style={{ color: 'var(--text-muted)' }}>
          {formatRelativeTime(notification.timestamp)}
        </span>
      </div>
    </button>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  onMarkRead: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
};

function NotificationGroup({ label, notifications, onMarkRead, onNavigate }) {
  if (notifications.length === 0) return null;
  const groupId = `notif-group-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div role="group" aria-labelledby={groupId}>
      <div
        id={groupId}
        className="sticky top-0 z-10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-l-2 border-l-claude-orange"
        style={{
          background: 'var(--bg-primary)',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        {label}
      </div>
      {notifications.map(n => (
        <NotificationItem
          key={n.id}
          notification={n}
          onMarkRead={onMarkRead}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

NotificationGroup.propTypes = {
  label: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  onMarkRead: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'var(--bg-primary)' }}
      >
        <BellOff className="h-8 w-8" style={{ color: 'var(--text-muted)' }} />
      </div>
      <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
        All caught up!
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        No new notifications. We&apos;ll let you know when something happens.
      </p>
    </div>
  );
}

export function NotificationCenter({
  isOpen, onClose, notifications, unreadCount,
  markAllRead, markAsRead, clearAll, onNavigate,
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // Focus close button when opened
  useEffect(() => {
    if (isOpen && closeRef.current) {
      setTimeout(() => closeRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handleClick), 100);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClick); };
  }, [isOpen, onClose]);

  const groups = groupNotifications(notifications);
  const hasNotifications = notifications.length > 0;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Notification Center"
      aria-modal="true"
      className={`fixed top-[68px] right-4 z-[70] w-[400px] max-h-[560px] flex flex-col rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ${
        isOpen
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Caret arrow pointing to bell */}
      <div className="notif-panel-arrow" />

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{
          borderBottom: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <Bell className="h-4.5 w-4.5 text-claude-orange" style={{ width: 18, height: 18 }} />
          <h2 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="notif-badge-appear bg-claude-orange text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          className="p-1.5 rounded-lg transition-colors hover:bg-white/5 active:scale-95"
          aria-label="Close notifications"
          style={{ color: 'var(--text-muted)' }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Actions bar */}
      {hasNotifications && (
        <div
          className="flex items-center justify-between px-5 py-2 flex-shrink-0 text-xs"
          style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}
        >
          <span style={{ color: 'var(--text-muted)' }}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllRead}
              className="font-medium transition-colors hover:text-orange-400"
              style={{ color: 'var(--claude-orange, #e8750a)' }}
              title="Mark all as read"
            >
              Mark all read
            </button>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <button
              onClick={clearAll}
              className="font-medium transition-colors hover:text-red-400"
              style={{ color: 'var(--text-muted)' }}
              title="Clear all notifications"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {hasNotifications ? (
          <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            <NotificationGroup label="Just Now"  notifications={groups.justNow}  onMarkRead={markAsRead} onNavigate={onNavigate} />
            <NotificationGroup label="Today"     notifications={groups.today}    onMarkRead={markAsRead} onNavigate={onNavigate} />
            <NotificationGroup label="Earlier"   notifications={groups.earlier}  onMarkRead={markAsRead} onNavigate={onNavigate} />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

NotificationCenter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  unreadCount: PropTypes.number.isRequired,
  markAllRead: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
};

NotificationCenter.defaultProps = {
  onNavigate: null,
};
