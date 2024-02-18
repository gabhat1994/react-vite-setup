import { memo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ElementUtils } from '@/utils/element';
import { Spacer } from '@/layout';
import { AddSectionPopover } from '@/features/noums/noumEditor/components';
import { DNDContainer } from './styles';
import { type DragableSectionProps } from './types';
import { NoumSections } from '../NoumSections';

export const DragableSection = memo((props: DragableSectionProps) => {
  const { section, isDragging, provided, currentIndex } = props;
  const [isLoading, setIsLoading] = useState(false);
  const isSpecificItem =
    currentIndex === ElementUtils.getSectionPosition(section!) - 1;
  return (
    <DNDContainer
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      isDragging={isDragging}
      data-testid={section?._id}
    >
      {isLoading && isSpecificItem && (
        <>
          <Skeleton
            width="100%"
            height={134}
            borderRadius={12}
            enableAnimation
            baseColor="var(--color-base-gray-100)"
          />
          <Spacer height={12} />
        </>
      )}
      <AddSectionPopover
        position={ElementUtils.getSectionPosition(section!)}
        setIsLoading={setIsLoading}
      />
      <Spacer height={12} />
      <NoumSections
        key={section?._id}
        provided={provided}
        currentIndex={currentIndex}
        {...props}
      />
    </DNDContainer>
  );
});
