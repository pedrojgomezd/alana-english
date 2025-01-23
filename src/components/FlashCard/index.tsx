"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Database } from "../../../database.types";
import { Button, Spinner } from "flowbite-react";
import { Pause, Play, ArrowUpDown, Languages } from "lucide-react";

interface FlashCardProps {
  phrases: Database["public"]["Tables"]["word_phrases"]["Row"][];
}

const FlashCard = ({ phrases: p }: FlashCardProps) => {
  const refAudio = useRef<HTMLAudioElement>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);
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

  const handlePlayPhrase = useCallback(async () => {
    if (audioUrl === "" && !phrases[currentPhraseIndex].audio_url) {
      await findUrlAudio(phrases[currentPhraseIndex].id);
    } else {
      setAudioUrl(phrases[currentPhraseIndex].audio_url ?? "");
    }

    setLoadAudio(false);
    refAudio.current?.play();
    setAudioPlaying(true);
  }, [audioUrl, phrases, currentPhraseIndex]);

  useEffect(() => {
    handlePlayPhrase();
  }, [currentPhraseIndex, handlePlayPhrase, phrases]);

  useEffect(() => {
    refAudio.current?.addEventListener("pause", () => {
      setAudioPlaying(false);
    });

    refAudio.current?.addEventListener("play", () => {
      setAudioPlaying(true);
    });
  }, []);

  const handleNextPhrase = () => {
    setAudioUrl("");
    setShowTranslation(false);
    setShowPhrase(false);
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
    <>
      <div className="bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden">
        <div className="bg-blue-500 p-4 flex justify-between items-center">
          <Button color="blue">English</Button>
          <Button color="blue">
            <ArrowUpDown className="h-5 w-5" />
          </Button>
          <Button color="blue">Spanish</Button>
        </div>

        <div>
          <div className="flex flex-col gap-4 h-60 justify-center">
            <div
              className={`text-center text-2xl flex-1 justify-center flex items-center border-b text-slate-700`}
            >
              {showPhrase
                ? phrases[currentPhraseIndex].phrase
                : "Listen to the audio"}
            </div>
            <div
              className={`text-center text-lg flex-1 justify-center flex items-center ${
                showTranslation ? "text-slate-500" : "text-white"
              } `}
            >
              {phrases[currentPhraseIndex].phrase_es}
            </div>
          </div>
          <div className="p-2">
            <Button
              fullSized
              color="dark"
              onClick={() => setShowTranslation((prev) => !prev)}
            >
              <Languages className="h-5 w-5 mr-2" />{" "}
              {showTranslation ? "Hide" : "Show"} translation
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 p-2">
        <Button
          size="xl"
          fullSized
          className="rounded-xl"
          color="warning"
          onClick={handlePlayPhrase}
        >
          {loadAudio ? <Spinner /> : audioPlaying ? <Pause /> : <Play />}
        </Button>
        <Button
          size="xl"
          fullSized
          className="rounded-xl"
          onClick={() => setShowPhrase((p) => !p)}
        >
          {showPhrase ? "Hide" : "Show"} Phrase
        </Button>
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
    </>
  );
};

export default FlashCard;
