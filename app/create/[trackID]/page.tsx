"use client";
import useTrack from "@/context/TrackContext";
import { TrackData } from "@/types/TrackData";
import { Download, Loader2, X } from "lucide-react";
import Image from "next/image";
// !TODO: Write types for spotify track data.
import { useEffect, useMemo, useRef, useState } from "react";
// @ts-expect-error unga bunga
import ColorThief from "colorthief";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/navigation";
export default function Track() {
  const { track } = useTrack()!;
  const [trackData, setTrackData] = useState<null | TrackData>(track);
  const colorThief = new ColorThief();
  const [theme, setTheme] = useState("");
  const router = useRouter();
  const thumbnail = useRef<null | HTMLImageElement>(null);
  function rgbaToHex(r: number, g: number, b: number, a: number) {
    let outParts = [
      r.toString(16),
      g.toString(16),
      b.toString(16),
      Math.round(a * 255)
        .toString(16)
        .substring(0, 2),
    ];
    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = "0" + part;
      }
    });
    return "#" + outParts.join("");
  }

  useEffect(() => {
    (async function () {
      if (!track) {
        const track = await (await fetch("/api/fetchTrackData")).json();
        setTrackData(track);
      }
    })();
  }, []);

  const [background, setBackground] = useState("");
  const [foreground, setGround] = useState("");

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
          onLoad={(e) => {
            const color = colorThief.getColor(thumbnail?.current, [2]);
            console.log(color);
            const hex = rgbaToHex(color[0], color[1], color[2], 1);
            setTheme(hex);
          }}
          ref={thumbnail}
          className="object-cover z-[-1] opacity-0 md:opacity-100 "
          src={trackData?.album.images[0].url}
          alt=""
          fill
        ></Image>
        <div className="h-screen  bg-background/80 backdrop-blur-2xl text-white px-6 md:py-8 py-3 flex flex-col gap-6">
          <div className="h-10 w-full flex justify-between items-center">
            <button
              onClick={() => {
                router.push("/create");
              }}
              className=""
            >
              <X size={32}></X>
            </button>
            <div className="text-xl font-semibold">Edit Lyrics</div>
            <button
              onClick={() => {
                if (document.querySelector(".view")) {
                  // @DOCS:https://github.com/bubkoo/html-to-image
                  htmlToImage
                    // @ts-expect-error unga bunga
                    .toJpeg(document.querySelector(".view"), { quality: 1 })
                    .then(function (dataUrl) {
                      let link = document.createElement("a");
                      link.download = trackData.name + ".jpeg";
                      link.href = dataUrl;
                      link.click();
                    });
                }
              }}
              className=""
            >
              <Download size={32}></Download>
            </button>
          </div>
          <div className="  flex justify-center items-center h-full ">
            <div
              style={{
                height: "100%",
                width: "100%",
                aspectRatio: "16 / 9",
                background: `linear-gradient(180deg, ${theme} 0%, black 100%)`,
              }}
              className="view justify-center items-center flex rounded-lg"
            >
              <div
                style={{ background: theme }}
                className="p-3 rounded-lg shadow-xl"
              >
                <div className="flex  items-center justify-between gap-3">
                  <Image
                    src={trackData.album.images[0].url}
                    alt=""
                    className="w-16 rounded-lg"
                    width={800}
                    height={800}
                  ></Image>

                  <div className="">
                    <div className="">{trackData.name}</div>
                    <div className="text-sm font-thin">
                      {trackData.artists.map((a) => (
                        <span key={a.id}>{a.name} </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            style={
              {
                // background: theme,
              }
            }
            className="h-32 w-full bg-zinc-800 rounded-lg"
            onClick={async () => {
              const lyrics = await fetch(
                "https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime"
              );
              console.log(await lyrics.json());
            }}
          >
            {trackData?.name}
          </button>
        </div>
      </div>
    );
}
