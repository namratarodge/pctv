"use client";

import Player from "@vimeo/player";
import { FC, useEffect, useRef } from "react";

interface VimeoEmbedProps {
  htmlString: string;
  onVideoProgress?: (seconds: number) => void;
  startTime?: number; // Add this prop
}

const VimeoEmbed: FC<VimeoEmbedProps> = ({
  htmlString,
  onVideoProgress,
  startTime = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const lastWatchedRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = containerRef.current.querySelector("iframe");
    if (!iframe) return;

    const player = new Player(iframe as HTMLIFrameElement, {
      autoplay: true,
    });
    playerRef.current = player;

    let isUnmounted = false;

    player.ready().then(async () => {
      try {
        const duration = await player.getDuration();
        await player.setVolume(1); // Set volume to 100%
        if (!isUnmounted && startTime > 0 && startTime < duration) {
          await player.setCurrentTime(startTime);
        }
        await player.play();
      } catch (error) {
        console.error("Failed to set start time:", error);
      }
    });

    player.on(
      "timeupdate",
      ({ seconds, duration }: { seconds: number; duration: number }) => {
        lastWatchedRef.current = seconds;
        const percent = (seconds / duration) * 100;
        console.log(
          `Watched: ${seconds.toFixed(1)}s / ${duration}s (${percent.toFixed(
            2
          )}%)`
        );
      }
    );

    player.on("ended", () => {
      console.log("Video ended");
    });

    return () => {
      isUnmounted = true;
      if (onVideoProgress) {
        onVideoProgress(lastWatchedRef.current);
      }

      player.unload();
    };
  }, [htmlString, onVideoProgress, startTime]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default VimeoEmbed;
