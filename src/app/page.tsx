"use client";

import { HomeIcon } from "lucide-react";
import { Header } from "../components/ui/Header";
import WordTypesScreen from "../screens/WordTypesScreen";

export default function Home() {


  return (
    <main className="min-h-screen bg-white">
      <Header
        title="Home"
        icon={<HomeIcon className="h-6 w-6 text-primary mr-2" />}
      />

      <WordTypesScreen />
    </main>
  );
}
