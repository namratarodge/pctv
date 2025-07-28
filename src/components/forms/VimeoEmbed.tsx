'use client'

import Player from "@vimeo/player";
import { FC, useEffect, useRef } from "react";

interface VimeoEmbedProps {
  htmlString: string;
  onVideoProgress?: (seconds: number) => void;
  startTime?: number; // Add this prop
}

const VimeoEmbed: FC<VimeoEmbedProps> = ({ htmlString, onVideoProgress, startTime = 0  }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const lastWatchedRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = containerRef.current.querySelector("iframe");
    if (!iframe) return;

    const player = new Player(iframe as HTMLIFrameElement);
    playerRef.current = player;

    player.ready().then(() => {
      if (startTime > 0) {
        player.setCurrentTime(startTime).catch((error) => {
          console.error("Failed to set start time:", error);
        });
      }
    });

    player.on("timeupdate", ({ seconds, duration }: { seconds: number; duration: number }) => {
      lastWatchedRef.current = seconds;
      const percent = (seconds / duration) * 100;
      console.log(`Watched: ${seconds.toFixed(1)}s / ${duration}s (${percent.toFixed(2)}%)`);
    });

    player.on("ended", () => {
      console.log("Video ended");
    });

    return () => {
      if (onVideoProgress) {
        onVideoProgress(lastWatchedRef.current);
      }

      player.unload();
    };
  }, [htmlString, onVideoProgress]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export default VimeoEmbed;