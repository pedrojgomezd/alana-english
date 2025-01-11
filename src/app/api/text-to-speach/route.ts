import OpenAI from "openai";

import { createClientServer } from "@/alana/lib/supabase-serve";

export async function POST(request: Request) {
  const supabase = await createClientServer();
  const { phrase_id } = await request.json();


  const { data: phrase } = await supabase
    .from("word_phrases")
    .select("id, phrase, audio_url")
    .eq("id", phrase_id)
    .single();

  if (phrase === null) return new Response("Phrase not found", { status: 404 });

  const audioBlod = await textToSpechOpenAI(phrase.phrase);
  const upload = await uploadAudioToSupabase(audioBlod, phrase_id);
  // const { error, data } = await supabase
  //   .from("word_phrases")
  //   .update({ audio_url: upload.publicURL })
  //   .eq("id", phrase_id)
  //   .select();

  return new Response(JSON.stringify(upload));
}

const uploadAudioToSupabase = async (audioBlob: Response, phrase_id: number) => {
  const supabase = await createClientServer();

  // Convertir el audio generado en un Buffer para la carga
  const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());

  // Subir el audio a Supabase Storage
  const { error } = await supabase.storage
    .from("audios") // Nombre de tu bucket
    .upload(`audio-${phrase_id}.mp3`, audioBuffer, {
      contentType: "audio/mpeg", // Tipo de contenido para MP3
      upsert: true, // Sobreescribir si el archivo ya existe
    });

  if (error) {
    console.error("Error uploading audio to Supabase:", error);
    return { error: true };
  }

  const publicURL = supabase.storage
    .from("audios")
    .getPublicUrl(`audio-${phrase_id}.mp3`);

  return {
    publicURL: publicURL.data.publicUrl,
    error: false,
  };
};

const textToSpechOpenAI = async (text: string) => {
  const openai = new OpenAI({ apiKey: process.env.API_OPENIA });

  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: text,
  });

  return response;
};
