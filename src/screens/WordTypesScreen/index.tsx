"use client";

import { createClient } from "@/alana/lib/supabase";
import { TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "../../../database.types";
const supabase = createClient();

export default function WordTypesScreen() {
  const [types, setTypes] = useState<
    Database["public"]["Tables"]["word_types"]["Row"][]
  >([]);

  useEffect(() => {
    const gettypes = async () => {
      const { data, error } = await supabase
        .from("word_types")
        .select("type, emoji, id");
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setTypes(data);
    };
    gettypes();
  }, []);

  if (types.length === 0) {
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
        <ul className="flex flex-wrap gap-2 mt-4 flex-col">
          {types.length > 0
            ? types.map((type) => (
                <Link href={`/word-types/${type.id}`} key={type.id}>
                  <li className="p-3 border border-slate-300 shadow-sm rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div>{type.emoji}</div>
                      <div className="text-lg font-bold text-slate-800 ">
                        {type.type}
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
