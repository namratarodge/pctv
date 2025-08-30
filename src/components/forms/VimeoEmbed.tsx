"use client";

import Player from "@vimeo/player";
import axios from "axios";
import { FC, useEffect, useRef } from "react";
import { toast } from "react-toastify"; // or your toast lib

interface VimeoEmbedProps {
  htmlString: string;
  startTime?: number;
  videoId?: string; // video object with _id
}

const VimeoEmbed: FC<VimeoEmbedProps> = ({ htmlString, startTime = 0, videoId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const lastWatchedRef = useRef(0);
  const lastPercentRef = useRef(0);

  // Your progress handler (axios request)
  const handleProgress = async (seconds: number, percent: number) => {
    const token = localStorage.getItem("token");
    if (!token || seconds === 0) return;

    const payload = {
      video_id: videoId,
      time_watched: seconds,
      percent,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/video-plays`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Error saving progress");
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = containerRef.current.querySelector("iframe");
    if (!iframe) return;

    const player = new Player(iframe as HTMLIFrameElement, { autoplay: true });
    playerRef.current = player;

    let isUnmounted = false;

    player.ready().then(async () => {
      try {
        const duration = await player.getDuration();
        await player.setVolume(1);
        if (!isUnmounted && startTime > 0 && startTime < duration) {
          await player.setCurrentTime(startTime);
        }
        await player.play();
      } catch (error) {
        console.error("Failed to init player:", error);
      }
    });

    player.on("timeupdate", ({ seconds, duration }: { seconds: number; duration: number }) => {
      lastWatchedRef.current = seconds;
      lastPercentRef.current = (seconds / duration) * 100;
    });

    player.on("ended", () => {
      lastPercentRef.current = 100;
    });

    return () => {
      isUnmounted = true;
      handleProgress(lastWatchedRef.current, lastPercentRef.current); // 🔥 send request on unmount
      player.unload();
    };
  }, [htmlString, startTime]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default VimeoEmbed;