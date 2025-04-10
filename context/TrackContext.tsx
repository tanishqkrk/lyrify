"use client";

import { TrackData } from "@/types/TrackData";
import { useContext, createContext, useState, useEffect } from "react";
const TrackContext = createContext<{
  track: TrackData | null;
  setTrack: React.Dispatch<React.SetStateAction<TrackData | null>>;
} | null>(null);

function TrackProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [track, setTrack] = useState<null | TrackData>(null);

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

export default function useTrack() {
  return useContext(TrackContext);
}
export { TrackProvider };
