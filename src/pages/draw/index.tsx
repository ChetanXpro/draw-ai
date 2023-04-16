"use client";

import React, { useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import { UploadDropzone } from "react-uploader";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Uploader } from "uploader";
import Image from "next/image";
function draw() {
  const [drawOrUpload, setDrawOrUpload] = useState(false);
  const [vibe, setVibe] = useState<string>("ultra-realistic");
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string>("");

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );

  const uploader = Uploader({
    apiKey: process.env.NEXT_PUBLIC_UPLOAD_PUBLIC_KEY as string,
  });
  const uploaderOpts = {
    multi: false,
    showFinishButton: false,
  };

  async function handleVisualize(e: any) {
    e.preventDefault();

    setLoading(true);

    let imageUrl = photoUrl;
    if (!drawOrUpload && canvasRef.current) {
      const dataUri = await canvasRef.current.exportImage("jpeg");
      const blob = await fetch(dataUri).then((r) => r.blob());
      const { fileUrl } = await uploader.uploadFile(blob);
      imageUrl = fileUrl;
    }

    const res = await fetch("/api/draw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        vibe: vibe,
        description: description,
      }),
    });

    const json = await res.json();

    setGeneratedImageUrl(json.generated);
    setLoading(false);
  }

  return (
    <div className="w-full  flex items-center justify-center">
      <div className="flex  flex-col h-full justify-center max-w-2xl gap-10  items-center">
        <div className="flex flex-col font-semibold gap-5 items-center justify-center mt-11">
          <h1 className="text-6xl  ">Build Your Ideas</h1>
          <span className="text-4xl bg-gradient-to-r text-transparent bg-clip-text from-violet-500 to-blue-500">
            With AI
          </span>
        </div>
        <form
          className="  mt-6 px-10  flex flex-col justify-center items-center gap-8"
          action=""
          onSubmit={handleVisualize}
        >
          <div className="flex   flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="rounded-3xl px-2 bg-slate-900 text-slate-100">
                1
              </span>
              <span className="font-medium text-lg">Choose a vibe</span>
            </div>

            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="rounded-lg p-2 w-full text-lg transition-all border text-black  border-slate-300"
            >
              <option value="ultra-realistic">Ultra Realistic</option>
              <option value="low-poly">Low Poly</option>
              <option value="anime">Anime</option>
              <option value="cartoon">Cartoon</option>
              <option value="painting">Painting</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="rounded-3xl px-2 bg-slate-900 text-slate-100">
                2
              </span>
              <span className="font-medium text-lg">
                Short description of idea
              </span>
            </div>

            <input
              type="text"
              className="rounded-lg p-2 w-full transition-all border text-slate-900 border-slate-300 text-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2 w-full">
              <span className="rounded-3xl px-2 bg-slate-900 text-slate-100">
                3
              </span>
              <span className="font-medium text-lg">
                Draw or upload your idea
              </span>

              <div className="ml-auto flex items-center gap-2">
                {drawOrUpload ? "Upload" : "Draw"}
                <Switch
                  id="drawOrUpload"
                  onChange={() => setDrawOrUpload(!drawOrUpload)}
                />
              </div>
            </div>
            {photoUrl ? (
              <Image
                alt="Photo"
                src={photoUrl}
                width={500}
                height={500}
                className="w-full"
              />
            ) : drawOrUpload ? (
              <UploadDropzone
                uploader={uploader}
                options={uploaderOpts}
                className="mx-auto"
                onUpdate={(files) => setPhotoUrl(files[0].fileUrl)}
              />
            ) : (
              <div className="relative">
                <ReactSketchCanvas
                  ref={canvasRef}
                  className="mx-auto"
                  height="512px"
                  width="512px"
                  strokeWidth={4}
                  strokeColor="black"
                  exportWithBackgroundImage={false}
                />

                <div
                  className="absolute right-4 top-4 cursor-pointer transition-all hover:scale-105"
                  onClick={() => canvasRef.current?.clearCanvas()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="py-3 px-5 border-2 w-full rounded-lg flex justify-center font-medium bg-slate-900 text-slate-100 transition-colors hover:bg-slate-700 border-slate-700"
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Transform"
            )}
          </button>
        </form>

        {generatedImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Generated Image"
            src={generatedImageUrl}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
}

export default draw;
