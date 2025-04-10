"use client";

// !TODO: Write types for spotify data.
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import Sample from "@/data/SampleData.json";
import Image from "next/image";
import DEBOUNCE from "@/utils/DEBOUNCE";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useTrack from "@/context/TrackContext";
import { TrackData } from "@/types/TrackData";

export default function Create() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const debouncedSearch = DEBOUNCE(async (e: string) => {
    if (e === "") {
      setSongs([]);
      setLoading(false);
    } else {
      const data = await (
        await fetch("/api/fetchSpotifyData", {
          method: "POST",
          body: JSON.stringify({
            query: e,
          }),
        })
      ).json();
      setSongs(data);
      setLoading(false);
    }
  }, 400);
  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-green-400">
          Search a Song
        </h1>

        <div className="relative mb-12 ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Type a song name..."
            value={query}
            onChange={async (e) => {
              setLoading(true);
              debouncedSearch(e.target.value);
              setQuery(e.target.value);
            }}
            className="pl-12  bg-[#1e1e1e] text-white border-none focus:ring-2 focus:ring-green-500 rounded-3xl py-8"
          />
        </div>
        {loading && (
          <div className="h-36">
            <div className="">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-theme-green" />
                <p className="text-theme-green text-lg">Getting music</p>
              </div>
            </div>
          </div>
        )}
        {!loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(songs as any)?.tracks?.items.map((song: any) => (
              <TrackCard key={song.id} track={song} />
            ))}
          </div>
        )}

        {!query && !loading && (
          <p className="text-gray-500 mt-12 text-center">Search for a song</p>
        )}
      </div>
    </div>
  );
}

function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function TrackCard({ track }: { track: TrackData }) {
  const { setTrack } = useTrack()!;
  const router = useRouter();
  const albumImage = track.album.images[1]?.url || "";
  const artistNames = track.artists.map((a) => a.name).join(", ");

  return (
    <button
      onClick={() => {
        setTrack(track);
        router.push("/create/" + track.id);
      }}
    >
      <div className="bg-[#1e1e1e] rounded-2xl p-4 flex  items-center gap-4 hover:bg-[#2a2a2a] transition shadow-lg cursor-pointer">
        <Image
          width={300}
          height={300}
          src={albumImage}
          alt="Album Art"
          className="w-fit h-24 aspect-square rounded-xl object-cover"
        />
        <div className="flex flex-col justify-start items-start w-full">
          <h3 className="text-white text-lg font-semibold trim text-start">
            {track.name}
          </h3>
          <p className="text-green-400 text-sm text-start">{artistNames}</p>
          <p className="text-gray-400 text-sm mt-1 text-start">
            {track.album.name}
          </p>
        </div>
      </div>
    </button>
  );
}
