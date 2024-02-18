import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSocialHallCallContext } from '@/providers';
import {
  useVideoMasonryLayoutCalc,
  type VideoMasonryLayoutCalc,
} from './useVideoMasonryLayoutCalc';

type SpeakerViewProps = {
  clientWidth: number;
  clientHeight: number;
  showChatPanel?: boolean;
  showMembersPanel?: boolean;
};

export const useSpeakerView = ({
  clientHeight,
  clientWidth,
  showChatPanel,
  showMembersPanel,
}: SpeakerViewProps) => {
  const maxVideoPerPage = 1;

  const { screenSharingLocalUserFeed, screenSharingRemoteUserFeed } =
    useSocialHallCallContext();

  const elemRef = useRef<HTMLDivElement | null>(null);
  const { calculateLayout } = useVideoMasonryLayoutCalc();
  const [dimension, setDimension] = useState<VideoMasonryLayoutCalc>({
    width: 0,
    cols: 0,
    height: 0,
    rows: 0,
  });

  useLayoutEffect(() => {
    if (elemRef.current) {
      setDimension(() =>
        calculateLayout({
          clientWidth,
          clientHeight,
          maxVideoPerPage,
          videoCount: 1,
        }),
      );
    }
  }, [calculateLayout, clientHeight, clientWidth]);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 250);
  }, [
    clientWidth,
    screenSharingLocalUserFeed,
    screenSharingRemoteUserFeed,
    showChatPanel,
    showMembersPanel,
  ]);

  const maxHeight = useMemo(
    () => (dimension.rows ? `${dimension.rows * dimension.height}px` : '100vh'),
    [dimension],
  );

  return {
    elemRef,
    maxHeight,
    dimension,
  };
};
