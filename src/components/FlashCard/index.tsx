"use client";

import { useEffect, useRef, useState } from "react";
import { Database } from "../../../database.types";
import { Button, Spinner } from "flowbite-react";
import { Pause, Play } from "lucide-react";

interface FlashCardProps {
  phrases: Database["public"]["Tables"]["word_phrases"]["Row"][];
}

const FlashCard = ({ phrases: p }: FlashCardProps) => {
  const refAudio = useRef<HTMLAudioElement>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phrases, setPhrases] =
    useState<Database["public"]["Tables"]["word_phrases"]["Row"][]>(p);

  const [loadAudio, setLoadAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioPlaying, setAudioPlaying] = useState(false);

  const findUrlAudio = async (phrase_id: number) => {
    setLoadAudio(true);
    const response = await fetch(`/api/text-to-speach/`, {
      method: "POST",
      body: JSON.stringify({ phrase_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPhrases((prev) =>
      [...prev].map((phrase) => {
        if (phrase.id === phrase_id) {
          return { ...phrase, audio_url: data.audio_url };
        }
        return phrase;
      })
    );
    setAudioUrl(data.audio_url);
  };

  const handlePlayPhrase = async () => {
    if (audioUrl === "" && !phrases[currentPhraseIndex].audio_url) {
      await findUrlAudio(phrases[currentPhraseIndex].id);
    } else {
      setAudioUrl(phrases[currentPhraseIndex].audio_url ?? "");
    }

    setLoadAudio(false);
    refAudio.current?.play();
    setAudioPlaying(true);
  };

  useEffect(() => {
    refAudio.current?.addEventListener("pause", () => {
      setAudioPlaying(false);
    });
  }, []);

  const handleNextPhrase = () => {
    setAudioUrl("");
    setShowTranslation(false);
    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
  };

  const handlePrevPhrase = () => {
    setAudioUrl("");
    setShowTranslation(false);
    setCurrentPhraseIndex(
      (prevIndex) => (prevIndex - 1 + phrases.length) % phrases.length
    );
  };

  return (
    <div>
      <div className="border border-slate-200  rounded-md">
        <div className="p-4">
          <div className="text-center text-3xl text-slate-800">
            {phrases[currentPhraseIndex].phrase}
          </div>
        </div>
        <div>
          <div
            className={`text-center text-lg ${
              showTranslation ? "text-slate-500" : "text-white"
            } `}
          >
            {phrases[currentPhraseIndex].phrase_es}
          </div>
        </div>
        <div className="flex justify-between space-x-4 p-4">
          <Button
            color="indigo"
            size="xl"
            onClick={() => setShowTranslation((prev) => !prev)}
          >
            {showTranslation ? "Hide" : "Show"} translate
          </Button>
          <Button size="xl" color="success" onClick={handlePlayPhrase}>
            {loadAudio ? <Spinner /> : audioPlaying ? <Pause /> : <Play />}
          </Button>
        </div>
      </div>

      <div className="flex justify-between space-x-4 pt-4">
        <Button
          outline
          color="dark"
          size="xl"
          onClick={handlePrevPhrase}
          disabled={currentPhraseIndex === 0}
        >
          Last phrase
        </Button>
        <Button
          size="xl"
          color="dark"
          onClick={handleNextPhrase}
          disabled={currentPhraseIndex === phrases.length - 1}
        >
          Next phrase
        </Button>
      </div>
      <audio
        hidden
        id="audio"
        autoPlay
        controls
        src={audioUrl}
        ref={refAudio}
      ></audio>
    </div>
  );
};

export default FlashCard;
