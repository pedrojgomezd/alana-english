import { HomeIcon } from "lucide-react";
import { Header } from "@/alana/components/ui/Header";
import WordDetailScreen from "@/alana/screens/WordDetailScreen";

export default async function WordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-white">
      <Header
        title="Word"
        showBack
        icon={<HomeIcon className="h-6 w-6 text-primary mr-2" />}
      />
      <WordDetailScreen id={(await params).id} />
    </main>
  );
}
