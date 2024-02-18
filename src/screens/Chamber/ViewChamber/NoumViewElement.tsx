import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Element } from '@/screens/Chamber/components/Element';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { SkeletonLoaderElements } from '@/screens/Chamber/components/elements/SkeletonLoader/const';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { useNoumContext } from './ChamberProvider';
import { type NoumViewElementProps } from './types';
import { ElementWrapper } from './styles';
import { toolRenderHelper } from './noumViewHelper';

const NoumViewElement: React.FC<NoumViewElementProps> = ({
  tools,
  isCompleteLoading,
  elementId,
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useSkeletonIsLoadingContext();
  const { space, isOwner } = useNoumContext();
  const { isConnected, isFollowing } = useNoumUserConnectionContext();

  const { user, isUnregistered, masterId: mainSpaceId } = useAuth();
  const { flags } = useLaunchDarkly();
  const [containerWidth, setContainerWidth] = useState<number>();
  const { renderableTools } = toolRenderHelper(
    space,
    isConnected,
    tools,
    user!,
    isUnregistered,
    flags,
  );

  const updatedList = useMemo(
    () =>
      SpaceUtils.isProjectNoum(space)
        ? renderableTools()
        : renderableTools().filter(
            (element) =>
              isLoading ||
              (isFollowing &&
                [
                  ElementTypeEnum.Userposts,
                  ElementTypeEnum.QuickQuestions,
                ].includes(element.elementType as ElementTypeEnum)),
          ),
    [isFollowing, isLoading, renderableTools, space],
  );

  const conditionalRender =
    space?._id !== mainSpaceId &&
    !isOwner &&
    !SpaceUtils.isMasterNoum(space) &&
    !isConnected;

  const list = isLoading
    ? SkeletonLoaderElements
    : conditionalRender
    ? updatedList
    : renderableTools();

  useLayoutEffect(() => {
    setContainerWidth(columnRef.current?.clientWidth);
  }, [containerWidth, columnRef, list]);

  return (
    <>
      {list &&
        list.map((tool) => (
          <ElementWrapper ref={columnRef} key={`${tool._id}`}>
            <Element
              isHighlight={isCompleteLoading && tool._id === elementId}
              isEditing={false}
              spaceId={space?._id || ''}
              spaceType={space?.type || ''}
              isOwner={isOwner}
              element={tool}
              id={`${tool._id}`}
              currentTitle={tool.headerContent ?? tool.elementType ?? 'UNKNOWN'}
              columnWidth={containerWidth}
            />
          </ElementWrapper>
        ))}
    </>
  );
};

export default NoumViewElement;
