import React from 'react';
import PropTypes from 'prop-types';
import { Activity, ExternalLink, Menu, X, Bell } from 'lucide-react';
import { ConnectionStatus } from './ConnectionStatus';

export function Header({ isConnected, error, onMenuToggle, isMenuOpen, notificationPermission, onRequestNotification }) {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(31, 41, 55, 0.9) 100%)',
        borderColor: 'rgba(249, 115, 22, 0.15)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 -1px 0 rgba(249, 115, 22, 0.1)'
      }}
      role="banner"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </button>

            {/* Logo with Gradient Animation */}
            <div
              className="relative p-3 rounded-xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(251, 146, 60, 0.15) 100%)',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}
            >
              {/* Animated Background Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.25))',
                }}
              />

              <Activity
                className="h-7 w-7 text-claude-orange relative z-10 group-hover:scale-110 transition-transform duration-300"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))'
                }}
              />

              {/* Rotating Glow */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.4), transparent 70%)',
                  animation: 'spin 20s linear infinite'
                }}
              />
            </div>

            {/* Title and Subtitle */}
            <div>
              <h1
                className="text-2xl font-bold gradient-text"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em'
                }}
              >
                Claude Agent Dashboard
              </h1>
              <p
                className="text-sm mt-0.5"
                style={{
                  color: 'rgba(209, 213, 219, 0.8)',
                  letterSpacing: '0.01em'
                }}
              >
                Real-time agent team monitoring
              </p>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            {notificationPermission === 'default' && (
              <button
                onClick={onRequestNotification}
                className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50 group"
                title="Enable notifications"
                aria-label="Enable desktop notifications"
              >
                <Bell className="h-5 w-5 text-gray-400 group-hover:text-claude-orange transition-colors duration-200" />
              </button>
            )}
            {notificationPermission === 'granted' && (
              <div
                className="relative p-2 rounded-lg"
                title="Notifications enabled"
                aria-label="Desktop notifications are enabled"
              >
                <Bell className="h-5 w-5 text-green-400" />
              </div>
            )}

            {/* Connection Status */}
            <ConnectionStatus isConnected={isConnected} error={error} />

            {/* Documentation Link */}
            <a
              href="https://code.claude.com/docs/en/agent-teams"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.6) 0%, rgba(31, 41, 55, 0.6) 100%)',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                color: '#e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(251, 146, 60, 0.15) 100%)';
                e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(55, 65, 81, 0.6) 0%, rgba(31, 41, 55, 0.6) 100%)';
                e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
              }}
            >
              <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm">Documentation</span>
            </a>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.5) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradient-flow 3s ease infinite'
        }}
      />
    </header>
  );
}

Header.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onMenuToggle: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  notificationPermission: PropTypes.oneOf(['default', 'granted', 'denied']),
  onRequestNotification: PropTypes.func
};

Header.defaultProps = {
  onMenuToggle: () => {},
  isMenuOpen: false,
  notificationPermission: 'denied',
  onRequestNotification: () => {}
};
