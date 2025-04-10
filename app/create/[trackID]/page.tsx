"use client";
import useTrack from "@/context/TrackContext";
import { TrackData } from "@/types/TrackData";
import { Loader2 } from "lucide-react";
import Image from "next/image";
// !TODO: Write types for spotify track data.
import { useEffect, useState } from "react";
export default function Track() {
  const { track } = useTrack()!;
  const [trackData, setTrackData] = useState<null | TrackData>(track);
  useEffect(() => {
    (async function () {
      if (!track) {
        const track = await (await fetch("/api/fetchTrackData")).json();
        setTrackData(track);
      }
    })();
  }, []);

  if (!trackData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
          <p className="text-white text-lg">Generating magic...</p>
        </div>
      </div>
    );
  }
  if (trackData)
    return (
      <div>
        <Image
          className="object-cover z-[-1] hidden md:block"
          src={trackData?.album.images[0].url}
          alt=""
          fill
        ></Image>
        <div className="min-h-screen bg-background/60 backdrop-blur-2xl text-white px-6 py-16">
          <div className="view"></div>
          {trackData?.name}
        </div>
      </div>
    );
}
