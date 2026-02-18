import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * WebSocket hook with structured per-type state
 * @param {string} url - WebSocket URL to connect to
 * @returns {Object} Typed WebSocket state
 */
export function useWebSocket(url) {
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState(null);
  const [teamHistory, setTeamHistory] = useState([]);
  const [agentOutputs, setAgentOutputs] = useState([]);
  const [allInboxes, setAllInboxes] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [lastRawMessage, setLastRawMessage] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastRawMessage(message);

          // Dispatch by message type
          if (message.data) setTeams(message.data);
          if (message.stats) setStats(message.stats);
          if (message.teamHistory) setTeamHistory(message.teamHistory);
          if (message.agentOutputs || message.outputs) setAgentOutputs(message.agentOutputs || message.outputs);
          if (message.allInboxes) setAllInboxes(message.allInboxes);
          if (message.type === 'inbox_update') {
            setAllInboxes(prev => ({ ...prev, [message.teamName]: message.inboxes }));
          }
          if (message.type === 'task_update' && message.data) setTeams(message.data);
          if (message.type === 'teams_update' && message.data) setTeams(message.data);
          if (message.type === 'agent_outputs_update') setAgentOutputs(message.outputs);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('Connection error');
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        wsRef.current = null;

        // Attempt to reconnect with exponential backoff
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectAttempts.current++;

        reconnectTimeoutRef.current = setTimeout(() => {
          console.log(`Attempting to reconnect (attempt ${reconnectAttempts.current})...`);
          connect();
        }, delay);
      };
    } catch (err) {
      console.error('Error creating WebSocket:', err);
      setError('Failed to connect');
    }
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { teams, stats, teamHistory, agentOutputs, allInboxes, isConnected, error, lastRawMessage };
}
