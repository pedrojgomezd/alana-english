"use client";

import { useEffect, useRef, useState } from "react";
import { Database } from "../../../database.types";
import { Button, Spinner } from "flowbite-react";
import { Pause, Play } from "lucide-react";

interface FlashCardProps {
  phrases: Database["public"]["Tables"]["word_phrases"]["Row"][];
}

const FlashCard = ({ phrases }: FlashCardProps) => {
  const refAudio = useRef<HTMLAudioElement>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const [loadAudio, setLoadAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
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
    setAudioUrl(data.publicURL);
  };

  const handlePlayPhrase = async () => {
    if (audioUrl === "") {
      await findUrlAudio(phrases[currentPhraseIndex].id);
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

      <div className="flex justify-between space-x-4 p-4">
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
      <audio hidden id="audio" autoPlay controls src={audioUrl} ref={refAudio}></audio>
    </div>
  );
};

export default FlashCard;
