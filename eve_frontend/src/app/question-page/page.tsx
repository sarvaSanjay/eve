// src/app/question-page/page.tsx
'use client';

import React, { useState, useRef, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

const QuestionPage = () => {
  const [socket, setSocket] = useState<any>(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newSocket = io('http://100.66.219.234:5000/');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && socket) {
            const reader = new FileReader();
            reader.onload = () => {
              const audioBlob = new Blob([event.data], { type: 'audio/wav' });
              socket.emit('question_audio', { audio: reader.result });
            };
            reader.readAsArrayBuffer(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          setRecording(false);
        };

        setRecording(true);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('answer_audio', (data: any) => {
        const blob = new Blob([data.audio], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      });
    }
  }, [socket]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Ask a Question</h1>
        {recording ? (
          <button
            onClick={stopRecording}
            className="bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700"
          >
            Stop Recording
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Start Recording
          </button>
        )}
        {audioUrl && (
          <audio controls src={audioUrl} className="mt-4">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
