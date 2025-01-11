"use client";

import { LyricsCard } from "@/alana/components/LyricsCard";
import { Header } from "@/alana/components/ui/Header";
import { LyricEntry } from "@/alana/lib/types";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase";

const supabase = createClient();

export default function LyricsPage({ id }: { id: string }) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [lyrics, setLyrics] = useState<LyricEntry[]>([]);

  useEffect(() => {
    const fetchLyrics = async () => {
      const { data, error } = await supabase
        .from("song_phrases")
        .select("*")
        .eq("song_id", id);

      if (error) {
        alert("Error fetching lyrics");
        return;
      }

      setLyrics(data);
    };

    fetchLyrics();
  }, [id]);

  const handleNextLyric = () => {
    setCurrentLyricIndex((prev) => (prev + 1) % lyrics.length);
    setShowTranslation(false);
  };

  const handleLastLyric = () => {
    setCurrentLyricIndex((prev) => (prev - 1) % lyrics.length);
    setShowTranslation(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header title="Titulo de la cancion" showBack />
      {lyrics.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <LyricsCard
          currentLyricIndex={currentLyricIndex}
          lyric={lyrics[currentLyricIndex]}
          showTranslation={showTranslation}
          onToggleTranslation={() => setShowTranslation(!showTranslation)}
          onNextLyric={handleNextLyric}
          onLastLyric={handleLastLyric}
        />
      )}
    </main>
  );
}
