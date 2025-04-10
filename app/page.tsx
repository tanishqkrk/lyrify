"use client";
// Turn your favorite lyrics into shareable art, because music deserves more than just sound.
import { Button } from "@/components/ui/button";
import { Sparkles, Music, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <motion.div
        initial={{
          filter: "blur(10px)",
          y: 40,
          opacity: 0,
        }}
        animate={{
          filter: "blur(0px)",
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 0.3,
        }}
        className="blob"
      ></motion.div>
      <motion.div
        initial={{
          filter: "blur(10px)",
          y: 40,
          opacity: 0,
        }}
        animate={{
          filter: "blur(0px)",
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 0.3,
        }}
        className="blob2"
      ></motion.div>
      <main className=" text-center max-w-6xl mx-auto bg-[#0a0a0b70] backdrop-blur-2xl min-h-screen min-w-screen overflow-hidden w-full  text-white px-6 py-12 font-sans relative flex flex-col justify-between items-center">
        <header className="flex justify-between items-center w-full">
          <motion.a
            href="/"
            initial={{
              filter: "blur(10px)",
              y: 40,
              opacity: 0,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="text-3xl font-bold tracking-tight text-green-500 flex gap-2 items-center"
          >
            <Image
              className="w-10"
              src={"/logo.svg"}
              alt=""
              height={300}
              width={300}
            ></Image>{" "}
            Lyrify
          </motion.a>
          <motion.div
            initial={{
              filter: "blur(10px)",
              y: 40,
              opacity: 0,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
          >
            <Button variant="ghost" className="text-white hover:text-green-400">
              Login
            </Button>
          </motion.div>
        </header>
        <div className="space-y-12 flex flex-col justify-center items-center">
          <motion.h2
            initial={{
              filter: "blur(10px)",
              y: 40,
              opacity: 0,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.5,
            }}
            className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight "
          >
            Turn your favorite lyrics into shareable art, <br />
            <span className="text-green-400">
              because music deserves more than just sound
            </span>
            .
          </motion.h2>
          <motion.p
            initial={{
              filter: "blur(10px)",
              y: 40,
              opacity: 0,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.7,
            }}
            className="max-w-3xl  text-lg text-gray-300"
          >
            Lyrify transforms your emotions, memories, or random rants into high
            quality images, use it as a wallpaper or get a poloroid!
          </motion.p>
          <motion.div
            initial={{
              filter: "blur(10px)",
              y: 40,
              opacity: 0,
            }}
            animate={{
              filter: "blur(0px)",
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.9,
            }}
            className=" flex justify-center gap-4"
          >
            <Link href="/create">
              <Button className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 text-lg rounded-xl shadow-lg cursor-pointer">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:border-green-400 hover:text-green-400 px-6 py-3 text-lg rounded-xl"
            >
              How it works
            </Button>
          </motion.div>
        </div>
        <motion.footer
          initial={{
            filter: "blur(10px)",
            y: 40,
            opacity: 0,
          }}
          animate={{
            filter: "blur(0px)",
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 1,
          }}
          className=" text-center text-white/90 text-sm"
        >
          © 2025 Lyrify. Made with 🎶, 🍵, 🍣 and 💓 by{" "}
          <a href="https://tanishqkrk.vercel.app/">
            <Button
              className="px-1 font-semibold cursor-pointer"
              variant={"link"}
            >
              Tanishq Kaushal
            </Button>
          </a>
          .
        </motion.footer>
      </main>
    </main>
  );
}
