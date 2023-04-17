import React from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex  flex-col  h-full justify-center w-full gap-4  items-center">
      <h1 className={"text-7xl font-semibold text-center max-w-2xl mt-8 mb-3"}>
        Transform your Drawings{" "}
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-violet-500 to-blue-500">
          with AI
        </span>
      </h1>
      <p className="text-lg max-w-2xl text-center">
        Transform your drawings and images into real-life creations with Draw AI
        - the ultimate online art creator tool
      </p>
      <Link href="/draw">
        <button
          type="button"
          className="py-3 px-5 mt-5 border-2 rounded-lg font-medium bg-slate-900 text-slate-100 transition-colors hover:bg-slate-700 border-slate-700"
        >
          Draw Idea
        </button>
      </Link>
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <Image
            alt="Original Dog"
            src="/drawing.jpeg"
            className="rounded-md border border-slate-300"
            width={256}
            height={256}
          />
          <span className="font-medium text-sm text-center">
            Original Photo
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Image
            alt="Generated Dog"
            src="/output.png"
            className="rounded-md border border-slate-300"
            width={256}
            height={256}
          />
          <span className="font-medium text-sm text-center">
            Generated Photo
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
