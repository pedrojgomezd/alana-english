import { HomeIcon } from "lucide-react";
import WordScreen from "@/alana/screens/WordsScreen";
import { Header } from "@/alana/components/ui/Header";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-white">
      <Header
        title="Words"
        showBack
        icon={<HomeIcon className="h-6 w-6 text-primary mr-2" />}
      />

      <WordScreen id={(await params).id} />
    </main>
  );
}
