import React from 'react';
import { Server, Database, Wifi, Clock, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function SystemStatus({ isConnected, lastUpdate, connectionStatus, reconnectAttempts }) {
  const { t } = useTranslation();
  const STATUS_CONFIG = {
    connected:    { label: t('connection.connected'),           color: 'text-green-400' },
    connecting:   { label: t('connection.connecting'),          color: 'text-yellow-400' },
    reconnecting: { label: t('system_status.reconnecting'),     color: 'text-yellow-400' },
    offline:      { label: t('system_status.offline'),          color: 'text-gray-400' },
    error:        { label: t('system_status.error'),            color: 'text-red-400' },
  }
  const statusInfo = STATUS_CONFIG[connectionStatus] || STATUS_CONFIG.connecting;

  return (
    <div className="card" role="status" aria-live="polite" aria-label="System status">
      <div className="flex items-center gap-2 mb-4">
        <Server aria-hidden="true" className="h-5 w-5 text-claude-orange" />
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>{t("system_status.title")}</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-2">
            <Wifi aria-hidden="true" className={`h-4 w-4 ${statusInfo.color}`} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t("system_status.websocket")}</span>
          </div>
          <div className="flex items-center gap-2">
            {connectionStatus === 'reconnecting' && (
              <RefreshCw aria-hidden="true" className="h-3 w-3 text-yellow-400 animate-spin" />
            )}
            <span className={`text-xs font-semibold ${statusInfo.color}`}>
              {t(`system_status.${statusInfo.label.toLowerCase()}`, statusInfo.label)}
            </span>
          </div>
        </div>

        {reconnectAttempts > 0 && connectionStatus !== 'connected' && (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2">
              <RefreshCw aria-hidden="true" className="h-4 w-4 text-yellow-400" />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t("system_status.reconnect_attempts")}</span>
            </div>
            <span className="text-xs font-semibold text-yellow-400">
              {reconnectAttempts}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-2">
            <Server aria-hidden="true" className="h-4 w-4 text-blue-400" />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t("system_status.backend_api")}</span>
          </div>
          <span className="text-xs font-semibold text-green-400">{t("status.running")}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-2">
            <Database aria-hidden="true" className="h-4 w-4 text-purple-400" />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t("system_status.file_watchers")}</span>
          </div>
          <span className="text-xs font-semibold text-green-400">{t("system_status.active")}</span>
        </div>

        {lastUpdate && (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2">
              <Clock aria-hidden="true" className="h-4 w-4 text-cyan-400" />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t("system_status.last_update")}</span>
            </div>
            <span className="text-xs font-semibold text-cyan-400">
              {dayjs(new Date(lastUpdate.timestamp || Date.now())).fromNow()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
