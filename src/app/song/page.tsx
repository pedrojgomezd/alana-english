"use client";

import { SongCard } from "@/alana/components/SongCard";
import { Header } from "@/alana/components/ui/Header";
import { createClient } from "@/alana/lib/supabase";
import { Music } from "lucide-react";
import { useEffect, useState } from "react";
const supabase = createClient();

export default function Home() {
  const [songs, setSongs] = useState<[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      const { data, error } = await supabase.from("songs").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setSongs(data);

      console.log(data);
    };

    getSongs();
  }, []);
  return (
    <main className="min-h-screen bg-white">
      <Header
        title="Song for practice"
        icon={<Music className="h-6 w-6 text-primary mr-2" />}
      />

      <div className="divide-y">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </main>
  );
}
