import { useState, useEffect, useCallback, useRef } from 'react';

export const useAudio = (file: string) => {
  const audioRef = useRef(new Audio(file));
  const [playing, setPlaying] = useState<boolean>(false);

  const play = useCallback(() => setPlaying(true), []);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    const ref = audioRef.current;
    ref.addEventListener('ended', () => setPlaying(false));
    return () => {
      ref.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [play];
};

export default { useAudio };
