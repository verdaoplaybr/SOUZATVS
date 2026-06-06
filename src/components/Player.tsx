import { useEffect, useRef } from 'react';
import videojs from 'video.js';

interface PlayerProps {
  channelId: string;
  deviceId: string;
  poster?: string;
}

export function Player({ channelId, deviceId, poster }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current) {
      if (videoRef.current) {
        playerRef.current = videojs(videoRef.current, {
          autoplay: true,
          muted: false,
          fluid: true,
          sources: [{
            src: `/stream/${channelId}?deviceId=${deviceId}`,
            type: 'application/x-mpegURL'
          }]
        });
        
        playerRef.current.on('error', () => {
          const error = playerRef.current.error();
          if (error && (error.code === 4 || error.code === 3)) {
            alert("Seu tempo de teste de 4 horas expirou! Entre em contato para assinar o plano completo.");
            window.location.href = "https://wa.me/5511949988411?text=Quero+assinar+o+plano+premium";
          }
        });
      }
    }
  }, [channelId, deviceId]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="player-container w-full max-w-3xl border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,92,237,0.5)] rounded-xl overflow-hidden mt-6">
      <video ref={videoRef} className="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster={poster} />
    </div>
  );
}
