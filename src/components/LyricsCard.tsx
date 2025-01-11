import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LyricEntry } from "../lib/types";

interface LyricsCardProps {
  lyric: LyricEntry;
  showTranslation: boolean;
  onToggleTranslation: () => void;
  onNextLyric: () => void;
  onLastLyric: () => void;
  currentLyricIndex: number;
}

export function LyricsCard({
  lyric,
  showTranslation,
  onToggleTranslation,
  onNextLyric,
  onLastLyric,
  currentLyricIndex,
}: LyricsCardProps) {
  return (
    <div className="bg-white border-b p-6  w-full">
      <p className="text-4xl font-medium text-gray-800 mb-4">{lyric.en}</p>

      {showTranslation && (
        <p className="text-2xl font-medium text-indigo-800 mb-4">
          {showTranslation && lyric.es}
        </p>
      )}

      <div className="flex justify-between gap-4">
        <button
          onClick={onToggleTranslation}
          className="px-6 py-4 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
        >
          {showTranslation ? "Ocultar traducción" : "Ver traducción"}
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => currentLyricIndex === 0 ? null : onLastLyric()}
            className="px-6 py-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            Anterior <ChevronLeft size={18} />
          </button>

          <button
            onClick={onNextLyric}
            className="px-6 py-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            Siguiente <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
