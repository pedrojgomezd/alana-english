"use client"
import React, { useState, useRef } from 'react';

interface RecordComponentProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
}

const RecordComponent: React.FC<RecordComponentProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const refAudio = useRef<HTMLAudioElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playRecording = () => {
    if (audioURL) {
        refAudio.current?.play();
      //const audio = new Audio(audioURL);
      //audio.play();
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-md ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      
      <button
        onClick={playRecording}
        disabled={!audioURL}
        className={`px-4 py-2 rounded-md ${
          audioURL
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-300 cursor-not-allowed'
        } text-white transition-colors`}
      >
        Play Recording
      </button>
      {audioURL && (
        <audio
          hidden
          id="audio"
          autoPlay
          controls
          src={audioURL}
          ref={refAudio}
        ></audio>
      )}
    </div>
  );
};

export default RecordComponent;
