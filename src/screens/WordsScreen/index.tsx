"use client";

import { createClient } from "@/alana/lib/supabase";
import { TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "../../../database.types";
const supabase = createClient();

interface WordsScreenProps {
  id: string;
}

export default function WordsScreen({ id }: WordsScreenProps) {
  const [words, setWords] = useState<Database["public"]["Tables"]["words"]["Row"][]>([]);
  const [wordType, setWordType] = useState<Database["public"]["Tables"]["word_types"]["Row"]>();

  useEffect(() => {
    const getWords = async () => {
      const { data: dataWordType, error: errorWordType } = await supabase
        .from("word_types")
        .select("*")
        .eq("id", id)
        .single();

      const { data, error } = await supabase
        .from("words")
        .select("*")
        .eq("word_type_id", id);

      if (error || errorWordType) {
        console.error(error, errorWordType);
        return;
      }
      console.log(data);
      setWordType(dataWordType);
      setWords(data);
    };
    getWords();
  }, [id]);

  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <TextInput
        id="word-serach"
        type="search"
        placeholder="Search or create word"
        required
      />
      <div>
        <div className="flex flex-col gap-2 mt-4 border border-slate-300 shadow-sm rounded-md p-4">
          <h2 className="text-4xl font-bold text-slate-700">
            {wordType?.emoji} {wordType?.type}
          </h2>
          <p className="text-slate-600">{wordType?.description}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-xl text-slate-800">Select word!</h3>
        </div>
        <ul className="grid grid-cols-2 gap-2 mt-4">
          {words.length > 0
            ? words.map((word, index) => (
                <Link href={`/word/${word.id}`} key={index}>
                  <li
                    key={word.word}
                    className="pt-6 pb-6 text-center border border-slate-300 shadow-sm rounded-md font-bold text-xl text-slate-800 capitalize"
                  >
                    {word.word}
                  </li>
                </Link>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
