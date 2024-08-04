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

  const handleStartRobot = async () => {
    if (socket) {
      // // Emit 'connect_browser' event and wait for acknowledgment
      // await new Promise<void>((resolve, reject) => {
      //   socket.emit('connect_browser', { robot_id: 'robot123' }, (response) => {
      //     console.log(response)
      //     if (response) {
      //       resolve();
      //     } else {
      //       reject(new Error('Failed to connect browser'));
      //     }
      //   });
      // });

      socket.emit('connect_browser', { robot_id: 'robot123' });
      socket.on('robot_connected', (data) => {
        console.log(data.message);
      });

      // Emit 'send_command' event
      socket.emit('send_command', { command: 'start_robot' });

      // Listen for 'send_eco_report' event and navigate
      socket.on('send_eco_report', (data) => {
        // Convert data to a JSON string and navigate
        const queryString = `data=${encodeURIComponent(JSON.stringify(data))}`;
        router.push(`/eco-report?${queryString}`);
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
