import { useEffect, useRef } from 'react';

export function useInboxNotifications(allInboxes) {
  const seenRef = useRef({}); // { "teamName/agentName": messageCount }

  useEffect(() => {
    if (!allInboxes || typeof allInboxes !== 'object') return;

    Object.entries(allInboxes).forEach(([teamName, agents]) => {
      Object.entries(agents || {}).forEach(([agentName, inbox]) => {
        const key = `${teamName}/${agentName}`;
        const currentCount = (inbox.messages || []).length;
        const seenCount = seenRef.current[key] ?? currentCount; // initialize to current on first load

        if (currentCount > seenCount) {
          // New messages arrived
          const newMessages = (inbox.messages || []).slice(seenCount);
          newMessages.forEach(msg => {
            if (Notification.permission === 'granted') {
              const body = msg.summary || (msg.text || '').slice(0, 100);
              new Notification(`${msg.from} → ${agentName}`, {
                body,
                tag: key, // deduplicate notifications per agent
                icon: '/favicon.ico',
              });
            }
          });
        }

        seenRef.current[key] = currentCount;
      });
    });
  }, [allInboxes]);

  // Request permission function
  const requestPermission = async () => {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  return {
    permission: typeof Notification !== 'undefined' ? Notification.permission : 'denied',
    requestPermission
  };
}
