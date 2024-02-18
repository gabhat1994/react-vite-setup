import { useCallback } from 'react';

export type VideoMasonryLayoutCalc = {
  width: number;
  height: number;
  cols: number;
  rows: number;
};

type VideoMasonryProps = {
  clientWidth: number;
  clientHeight: number;
  videoCount: number;
  aspectRatio?: number;
  maxVideoPerPage?: number;
};

export const useVideoMasonryLayoutCalc = () => {
  const calculateLayout = useCallback(
    ({
      clientWidth,
      clientHeight,
      videoCount,
      aspectRatio = 16 / 9,
      maxVideoPerPage = 0,
    }: VideoMasonryProps): VideoMasonryLayoutCalc => {
      let bestLayout = {
        area: 0,
        cols: 0,
        rows: 0,
        width: 0,
        height: 0,
        maxElement: maxVideoPerPage ?? 0,
      };

      const count = maxVideoPerPage < videoCount ? maxVideoPerPage : videoCount;

      for (let cols = 1; cols <= count; cols += 1) {
        let width;
        let height;
        const rows = Math.ceil(count / cols);
        const hScale = clientWidth / (cols * aspectRatio);
        const vScale = clientHeight / rows;
        if (hScale <= vScale) {
          width = Math.floor(clientWidth / cols);
          height = Math.floor(width / aspectRatio);
        } else {
          height = Math.floor(clientHeight / rows);
          width = Math.floor(height * aspectRatio);
        }
        const area = width * height;
        if (area > bestLayout.area) {
          bestLayout = {
            area,
            width,
            height,
            rows,
            cols,
            maxElement: rows * cols,
          };
        }
      }
      return bestLayout;
    },
    [],
  );

  return { calculateLayout };
};
