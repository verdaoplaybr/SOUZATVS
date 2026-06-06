import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface PreviewPlayerProps {
  streamUrl: string;
}

export function PreviewPlayer({ streamUrl }: PreviewPlayerProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Debounce logic: wait 1500ms before changing the video stream
    const handler = setTimeout(() => {
      setUrl(streamUrl);
    }, 1500);

    return () => clearTimeout(handler);
  }, [streamUrl]);

  return (
    <div className="border-4 border-amber-500 rounded-xl overflow-hidden aspect-video w-full">
      {url ? (
        <ReactPlayer
          {...( {
            url: url,
            width: "100%",
            height: "100%",
            playing: true,
            muted: true,
            controls: false
          } as any)}
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-green-600 font-bold">Carregando...</div>
        </div>
      )}
    </div>
  );
}
