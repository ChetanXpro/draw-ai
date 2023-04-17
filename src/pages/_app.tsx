import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-500 font-sans  min-h-screen ">
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
