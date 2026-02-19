import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bot, Crown, Cpu, Zap } from 'lucide-react';

export function AgentCard({ agent, isLead, agentStatus }) {
  const [isHovered, setIsHovered] = useState(false);
  const [statusHovered, setStatusHovered] = useState(false);

  return (
    <div
      className="p-5"
      role="article"
      tabIndex={0}
      aria-label={`Agent ${agent.name}${isLead ? ', team lead' : ''}`}
      style={{
        position: 'relative',
        borderRadius: '16px',
        transition: 'all 0.3s',
        background: isLead
          ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(202, 138, 4, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)',
        border: `2px solid ${isLead ? 'rgba(234, 179, 8, 0.3)' : 'rgba(59, 130, 246, 0.25)'}`,
        boxShadow: isHovered
          ? `0 8px 24px ${isLead ? 'rgba(234, 179, 8, 0.25)' : 'rgba(59, 130, 246, 0.2)'}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : 'var(--card-shadow)',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Gradient Border Animation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s',
          background: isLead
            ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), transparent 50%, rgba(234, 179, 8, 0.1))'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent 50%, rgba(59, 130, 246, 0.1))',
          pointerEvents: 'none'
        }}
      />

      <div className="flex items-start justify-between" style={{ position: 'relative', zIndex: 10 }}>
        <div className="flex items-start gap-4 flex-1">
          {/* Icon Container with Glow */}
          <div
            className="p-3"
            style={{
              position: 'relative',
              borderRadius: '12px',
              transition: 'all 0.3s',
              background: isLead
                ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.25) 0%, rgba(202, 138, 4, 0.15) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)',
              boxShadow: isHovered
                ? `0 4px 16px ${isLead ? 'rgba(234, 179, 8, 0.4)' : 'rgba(59, 130, 246, 0.35)'}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                : `0 2px 8px ${isLead ? 'rgba(234, 179, 8, 0.3)' : 'rgba(59, 130, 246, 0.25)'}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
              border: `1px solid ${isLead ? 'rgba(234, 179, 8, 0.4)' : 'rgba(59, 130, 246, 0.35)'}`,
              transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)'
            }}
          >
            {isLead ? (
              <Crown
                className="h-6 w-6"
                aria-hidden="true"
                style={{
                  color: '#facc15',
                  filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.6))'
                }}
              />
            ) : (
              <Bot
                className="h-6 w-6"
                aria-hidden="true"
                style={{
                  color: '#60a5fa',
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
                }}
              />
            )}

            {/* Pulsing Glow Effect */}
            {isHovered && (
              <div
                className="animate-pulse"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '12px',
                  background: isLead
                    ? 'radial-gradient(circle, rgba(234, 179, 8, 0.3), transparent 70%)'
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
                  zIndex: -1
                }}
              />
            )}
          </div>

          {/* Agent Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {agentStatus && (
                <div
                  role="img"
                  aria-label={agentStatus.tooltipText}
                  tabIndex={0}
                  style={{ position: 'relative' }}
                  title={agentStatus.tooltipText}
                  onMouseEnter={() => setStatusHovered(true)}
                  onMouseLeave={() => setStatusHovered(false)}
                  onFocus={() => setStatusHovered(true)}
                  onBlur={() => setStatusHovered(false)}
                >
                  <span
                    className={`inline-block rounded-full ${agentStatus.pulse ? 'animate-pulse' : ''}`}
                    style={{
                      width: '10px',
                      height: '10px',
                      flexShrink: 0,
                      backgroundColor: agentStatus.color,
                      boxShadow: agentStatus.pulse ? `0 0 8px ${agentStatus.color}` : 'none'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '8px',
                      padding: '4px 8px',
                      background: 'var(--bg-primary)',
                      fontSize: '12px',
                      color: 'var(--text-primary)',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      zIndex: 20,
                      border: '1px solid var(--border-color)',
                      opacity: statusHovered ? 1 : 0,
                      transition: 'opacity 0.15s',
                      pointerEvents: 'none',
                    }}
                  >
                    {agentStatus.tooltipText}
                  </div>
                </div>
              )}
              <h5
                className="font-bold text-lg truncate"
                style={{
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.01em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
              >
                {agent.name}
              </h5>

              {isLead && (
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
                  style={{
                    textTransform: 'uppercase',
                    gap: '6px',
                    background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.3) 0%, rgba(202, 138, 4, 0.2) 100%)',
                    color: '#facc15',
                    border: '1px solid rgba(234, 179, 8, 0.5)',
                    boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    textShadow: '0 0 10px rgba(234, 179, 8, 0.4)'
                  }}
                >
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Lead
                </span>
              )}
            </div>

            {agent.agentType && (
              <div
                className="flex items-center gap-2 mb-2 py-1 rounded-lg inline-flex"
                style={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  background: 'var(--tab-inactive-bg)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <Cpu className="h-4 w-4" aria-hidden="true" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-sm truncate font-medium" style={{ color: 'var(--text-muted)' }}>
                  {agent.agentType}
                </span>
              </div>
            )}

            <p
              className="text-xs truncate"
              style={{
                fontFamily: 'monospace',
                color: 'var(--text-secondary)'
              }}
              title={agent.agentId}
            >
              ID: {agent.agentId?.substring(0, 12)}...
            </p>
          </div>
        </div>
      </div>

      {/* Shine Effect on Hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            pointerEvents: 'none',
            background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
            animation: 'shimmer 2s ease-in-out infinite'
          }}
        />
      )}
    </div>
  );
}

AgentCard.propTypes = {
  agent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    agentId: PropTypes.string.isRequired,
    agentType: PropTypes.string,
    model: PropTypes.string
  }).isRequired,
  isLead: PropTypes.bool,
  agentStatus: PropTypes.shape({
    status: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    dot: PropTypes.string,
    pulse: PropTypes.bool,
    tooltipText: PropTypes.string
  })
};
