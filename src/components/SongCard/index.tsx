/* eslint-disable @next/next/no-img-element */
'use client';

import { Song } from '@/alana/lib/types';
import { Music2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const router = useRouter();

  return (
    <div
      className="flex items-center space-x-4 p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
      onClick={() => router.push(`/song/${song.id}`)}
    >
      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
        <img
          src={song.imageUrl || "/disk.jpg"}
          alt={song.title}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{song.title}</h3>
        <p className="text-sm text-gray-500 truncate">{song.artist}</p>
      </div>
      <div className="flex-shrink-0">
        <Music2 className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}