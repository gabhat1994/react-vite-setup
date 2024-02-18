import { useState, useEffect } from 'react';
import { type InputListTypes } from './types';

type Props = {
  inputList: InputListTypes[];
  selectedId: string;
  windowSize?: number;
  isMobile?: boolean;
};

export const useBasicChipsTabs = ({
  inputList,
  selectedId,
  windowSize = 0,
  isMobile = false,
}: Props) => {
  const [underlineWidth, setUnderlineWith] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const handleSetUnderlineWidth = (val: number) => setUnderlineWith(val);
  const handleSetUnderlineLeft = (val: number) => setUnderlineLeft(val);

  useEffect(() => {
    if (selectedId && underlineWidth) {
      const activeTabIndex = inputList.findIndex((el, index) => {
        const localId = el.id ? el.id.toString() : index.toString();

        return localId === selectedId.toString();
      });
      const spaceWidth =
        (windowSize - underlineWidth * inputList.length - 32) /
        (inputList.length * 2);

      if (isMobile) {
        handleSetUnderlineLeft(
          activeTabIndex !== 0
            ? underlineWidth * Math.max(0, activeTabIndex) +
                Math.max(0, activeTabIndex) * spaceWidth * 2
            : spaceWidth,
        );
      } else {
        handleSetUnderlineLeft(
          underlineWidth * Math.max(0, activeTabIndex) +
            Math.max(0, activeTabIndex) * 12,
        );
      }
    }
  }, [inputList, isMobile, selectedId, underlineWidth, windowSize]);

  return {
    underlineWidth,
    underlineLeft,
    handleSetUnderlineWidth,
    handleSetUnderlineLeft,
  };
};
