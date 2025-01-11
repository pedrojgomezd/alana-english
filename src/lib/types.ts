export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  duration: string;
  album: string;
  releaseYear: number;
  genre: string;
  lyrics?: Lyric[];
}

export interface Lyric {
  id: number;
  english: string;
  spanish: string;
  timestamp: string;
}

export type TranslationExample = {
  en: string;
  es: string;
};

export type LyricEntry = {
  time: string;
  en: string;
  es: string;
  keyword: string;
  example: TranslationExample;
};