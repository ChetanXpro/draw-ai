import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex  flex-col h-full justify-center w-full gap-10  items-center">
      <div className="flex flex-col font-semibold gap-5 items-center mt-11">
        <h1 className="text-6xl  ">Draw Your Ideas</h1>
        <span className="text-6xl bg-gradient-to-r text-transparent bg-clip-text from-violet-500 to-blue-500">
          With AI
        </span>
      </div>
      <p className="text-xl">Just draw and see the magic</p>
      <Link href="/draw">
        <button
          type="button"
          className="py-3 px-5 mt-5 border-2 rounded-lg font-medium bg-slate-900 text-slate-100 transition-colors hover:bg-slate-700 border-slate-700"
        >
          Draw Idea
        </button>
      </Link>
    </div>
  );
};

export default Hero;
