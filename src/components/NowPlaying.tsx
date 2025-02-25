/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Urbanist } from "next/font/google";
import { motion } from "framer-motion";

const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface NowPlayingData {
  isPlaying: boolean;
  isPaused: boolean;
  progressMs: number | null;
  durationMs: number | null;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumImageUrl: string | null;
  songUrl: string | null;
  activeDevice: string;
  deviceType: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NowPlaying() {
  const { data, error } = useSWR<NowPlayingData>("/api/nowPlaying", fetcher, { refreshInterval: 10000 });
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Hide the component if no song has been played for a while
  const shouldHide =
    !data || !data.isPlaying || data.progressMs === null || !data.title || !data.artist || !data.albumImageUrl;

  useEffect(() => {
    if (data && data.progressMs !== null) {
      setElapsedMs(data.progressMs);
    }
  }, [data]);

  useEffect(() => {
    if (!data || !data.isPlaying || data.isPaused) return;

    const interval = setInterval(() => {
      setElapsedMs((prev) => Math.min(prev + 1000, data.durationMs || 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 640);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (error || shouldHide) return null; // Hides the component when no song has been played for a long time

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 p-4 w-full backdrop-blur-lg bg-gray-900/50 text-white shadow-lg flex items-center space-x-4 ${urbanist.className} 
      sm:bottom-4 sm:right-4 sm:w-96 sm:rounded-2xl sm:p-4 sm:left-auto sm:flex-row`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        background: `linear-gradient(45deg, rgba(29, 185, 84, 0.2), rgba(255, 88, 91, 0.2))`,
      }}
    >
      <div className="relative">
        <motion.img
          key={data.albumImageUrl}
          src={data.albumImageUrl!}
          alt={data.album!}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        />
        <img
          src="/spotify_icon.svg"
          alt="Spotify"
          className="absolute bottom-0 right-0 w-6 h-6 bg-gray-900/70 rounded-full p-0.5"
        />
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className={`flex ${isMobile ? "justify-center" : "justify-start"} w-full`}>
          <p className="text-xs text-green-400">🎵 Now listening to Spotify</p>
        </div>

        <motion.a
          href={data.songUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold hover:underline block truncate"
          title={data.title!}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {data.title}
        </motion.a>
        <motion.p
          className="text-sm text-gray-400 truncate"
          title={data.artist!}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {data.artist}
        </motion.p>

        <div className="w-full bg-gray-700 h-1.5 rounded-full mt-2 relative">
          <motion.div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${(elapsedMs / (data.durationMs || 1)) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${(elapsedMs / (data.durationMs || 1)) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>
        </div>

        {!isMobile && (
          <p className="text-xs text-gray-400 mt-1">
            ⏳ Elapsed: {formatTime(elapsedMs)} / {formatTime(data.durationMs || 0)}
          </p>
        )}
      </div>
    </motion.div>
  );
}
