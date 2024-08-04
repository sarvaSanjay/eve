'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

const StartCommandPage = () => {
  const [socket, setSocket] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Create and set up the socket connection
    const newSocket = io('http://100.66.219.234:5000/');
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleStartRobot = () => {
    if (socket) {
      socket.emit('send_command', { command: 'start_robot' });

      socket.once('send_echo_report', (data) => {
        // Convert data to a JSON string and navigate
        const queryString = `data=${encodeURIComponent(JSON.stringify(data))}`;
        router.push(`/eco-report?${queryString}`);
      });
    }
  };

  return (
    <div>
      <h1>Start Robot</h1>
      <button onClick={handleStartRobot}>Start Robot</button>
    </div>
  );
};

export default StartCommandPage;
