import { HomeIcon } from "lucide-react";
import { Header } from "@/alana/components/ui/Header";

export default async function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header
        title="Home"
        icon={<HomeIcon className="h-6 w-6 text-primary mr-2" />}
      />

    </main>
  );
}
