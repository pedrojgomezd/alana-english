"use client";

import { ArrowLeft, Music } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showBack?: boolean;
  title: string;
  icon?: React.ReactNode;
}

export function Header({ showBack, title, icon }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="px-4 py-4 flex items-center">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        ) : icon ? (
          icon
        ) : (
          <Music className="h-6 w-6 text-primary mr-2" />
        )}
        <h1 className="text-xl font-semibold ml-2">{title}</h1>
      </div>
    </header>
  );
}
