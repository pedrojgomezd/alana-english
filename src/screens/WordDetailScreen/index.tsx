"use client";

import FlashCard from "@/alana/components/FlashCard";
import { createClient } from "@/alana/lib/supabase";
import { useEffect, useState } from "react";
import { Database } from "../../../database.types";
const supabase = createClient();

interface WordDetailScreenProps {
  id: string;
}

export default function WordDetailScreen({ id }: WordDetailScreenProps) {
  const [word, setWord] = useState<Database["public"]["Tables"]["words"]["Row"]>();
  const [phrases, setPhrases] = useState<Database["public"]["Tables"]["word_phrases"]["Row"][]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data: dataWord, error: errorWord } = await supabase
        .from("words")
        .select("*")
        .eq("id", id)
        .single();

      const { data: dataPhrase, error } = await supabase
        .from("word_phrases")
        .select("*")
        .eq("word_id", id);

      if (error || errorWord) {
        console.error(error, errorWord);
        return;
      }
      setPhrases(dataPhrase);
      setWord(dataWord);
    };
    getData();
  }, [id]);

  if (phrases.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div>
        <div className="mt-4 mb-4">
          <h2 className="text-3xl font-bold text-slate-700 uppercase">
            {word?.word}
          </h2>
        </div>
       <FlashCard phrases={phrases} />
      </div>
    </div>
  );
}
