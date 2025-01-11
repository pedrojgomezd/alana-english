'use client';

import { Lyric } from '@/alana/lib/types';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LyricsViewProps {
  lyrics: Lyric[];
}

export function LyricsView({ lyrics }: LyricsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < lyrics.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentLyric = lyrics[currentIndex];

  return (
    <div className="p-6 space-y-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / lyrics.length) * 100}%` }}
        />
      </div>

      {/* Current lyric */}
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">English</p>
          <p className="text-xl font-medium">{currentLyric.english}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Español</p>
          <p className="text-xl font-medium">{currentLyric.spanish}</p>
        </div>

        <p className="text-sm text-gray-400 text-center">
          {currentLyric.timestamp}
        </p>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === lyrics.length - 1}
        className="w-full bg-primary text-white py-3 px-4 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}