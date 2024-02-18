import { useState } from 'react';

type ScreenDensity = {
  density: number;
};

export function useScreenDensity(): ScreenDensity {
  const [screenDensity] = useState(window?.devicePixelRatio ?? 1);

  return {
    density: screenDensity,
  };
}
