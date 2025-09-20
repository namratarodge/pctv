"use client";

import Player from "@vimeo/player";
import axios from "axios";
import { FC, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface VimeoEmbedProps {
  htmlString: string;
  startTime?: number;
  videoId?: string; // video object _id
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/video-plays`;

const VimeoEmbed: FC<VimeoEmbedProps> = ({ htmlString, startTime = 0, videoId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const lastWatchedRef = useRef(0);
  const lastPercentRef = useRef(0);

  // Regular progress save (used inside the app while the page is alive)
  const handleProgress = async (seconds: number, percent: number) => {
    const token = localStorage.getItem("token");
    if (!token || !videoId || seconds === 0) return;

    const payload = { video_id: videoId, time_watched: Math.floor(seconds), percent };
    try {
      await axios.post(API_URL, payload, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      toast.error("Error saving progress");
    }
  };

  // Flush that survives navigation (back/forward/close)
  const flushProgressKeepAlive = () => {
    const token = localStorage.getItem("token");
    if (!token || !videoId) return;

    const payload = {
      video_id: videoId,
      time_watched: Math.floor(lastWatchedRef.current),
      percent: lastPercentRef.current,
    };

    try {
      // keepalive works during page unload; axios doesn’t support it
      fetch(API_URL, {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // swallow errors on unload
      });
    } catch {
      // ignore
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

    // Save on back/forward/close
    const handlePageHide = () => flushProgressKeepAlive();
    const handleBeforeUnload = () => flushProgressKeepAlive();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") flushProgressKeepAlive();
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isUnmounted = true;
      // Save once more on unmount (SPA route change/back button causes unmount)
      flushProgressKeepAlive();
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      player.unload();
    };
  }, [htmlString, startTime]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default VimeoEmbed;