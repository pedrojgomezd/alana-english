import LyricsPage from "@/alana/screens/LyricsPage";

export default async function SongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <LyricsPage id={(await params).id} />;
}
