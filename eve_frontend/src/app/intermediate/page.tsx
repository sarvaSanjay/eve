'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

const IntermediatePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Create and set up the socket connection
    const newSocket = io('http://localhost:5000.234:5000/');
    setSocket(newSocket);

    // Emit 'connect_browser' event
    newSocket.emit('connect_browser', { robot_id: 'robot123' });

    // Listen for images from the server
    newSocket.on('send_browser_image', (data) => {
      const newImage = `data:image/jpeg;base64,${data.image_data}`;
      setImages((prevImages) => [...prevImages, newImage]);
    });

    // Listen for 'send_eco_report' event and navigate to EcoReportPage
    newSocket.on('send_eco_report', (data) => {
      const queryString = `data=${encodeURIComponent(JSON.stringify(data))}`;
      router.push(`/eco-report?${queryString}`);
    });

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Processing...</h1>
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Received ${index}`}
            className="w-64 h-64 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default IntermediatePage;
