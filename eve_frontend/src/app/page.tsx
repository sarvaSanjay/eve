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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Start Robot</h1>
      <button
        onClick={handleStartRobot}
        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Start Robot
      </button>
    </div>
  </div>
  );
};

export default StartCommandPage;
