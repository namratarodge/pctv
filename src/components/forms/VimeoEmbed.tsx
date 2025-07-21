import Player from "@vimeo/player";
import { useEffect, useRef } from "react";

const VimeoEmbed = ({ htmlString, onVideoProgress }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const lastWatchedRef = useRef(0); // stores last watched seconds

  useEffect(() => {
    if (!containerRef.current) return;

    const iframe = containerRef.current.querySelector("iframe");
    if (!iframe) return;

    const player = new Player(iframe);
    playerRef.current = player;

    player.on("timeupdate", ({ seconds, duration }) => {
      lastWatchedRef.current = seconds;
      const percent = (seconds / duration) * 100;
      console.log(`Watched: ${seconds.toFixed(1)}s / ${duration}s (${percent.toFixed(2)}%)`);
    });

    player.on("ended", () => {
      console.log("Video ended");
    });

    return () => {
      // Notify parent before unloading
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