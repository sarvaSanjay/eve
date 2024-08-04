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
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  const handleStartRobot = async () => {
    if (socket) {
      // Emit 'connect_browser' event
      socket.emit('connect_browser', { robot_id: 'robot123' });

      // Listen for 'robot_connected' event and navigate
      socket.once('browser_connected', (data) => {
        console.log(data.message); // Log the connection confirmation
        // Emit 'send_command' event after the robot is connected
        socket.emit('send_command', { command: 'start_robot' });
         // Listen for 'robot_connected' event and navigate
        socket.once('acknowledge_command', () => {
          router.push('/intermediate');
      });
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg border border-green-200">
        <h1 className="text-2xl font-bold mb-6 text-green-800">Start Robot</h1>
        <button
          onClick={handleStartRobot}
          className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Start Robot
        </button>
      </div>
    </div>
  );
};

export default StartCommandPage;
