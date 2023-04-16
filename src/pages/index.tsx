import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <Hero />
    </main>
  );
}
