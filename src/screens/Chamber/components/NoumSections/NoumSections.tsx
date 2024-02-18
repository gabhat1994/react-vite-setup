import { type FC, Fragment, useCallback, useMemo } from 'react';
import { delay } from '@/utils/delay';

import { useBreakpoints } from '@/hooks';
import { DroppableElementArea } from '@/screens/Chamber/components/SectionElementRearrange/DroppableElementArea';

import { HoverWrapper } from '@/features/noums/noumEditor/components';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { type NoumSectionsProps } from './types';
import { NoumSectionContainer, NoumSectionLayout } from './Styles';
import { useEditChamberState } from '../../EditChamber/provider';

export const NoumSections: FC<NoumSectionsProps> = (props) => {
  const {
    setNoumSidePanelId,
    noumSidePanelId,
    setNoumSidePanelType,
    section,
    lift,
    index,
  } = props;
  const { isSmallerThanLaptop } = useBreakpoints();
  const { sectionSideBarOptions, height, setHeight, useHeightRef } =
    useEditChamberState();
  const isSectionBackground =
    section?._id === sectionSideBarOptions?.sectionBackgroud?.id;
  const isSectionAlignItems =
    section?._id === sectionSideBarOptions?.selectedAlignItem?.id;
  const isSectionLayout =
    section?._id === sectionSideBarOptions?.selectedLayout?.id;
  const isSection = section?._id === noumSidePanelId;

  const isEmptySection = useMemo(
    () => section?.columns.some((col) => col.tools.length > 0),
    [section?.columns],
  );
  const move = useCallback(
    async (movingType: 'up' | 'down') => {
      if (!lift) return;
      const actions = lift(`${section?._id}`);

      if (!actions) return;

      const { moveDown, moveUp, drop } = actions;

      if (movingType === 'up') {
        await delay(moveUp, 100);
      }
      if (movingType === 'down') {
        await delay(moveDown);
      }
      await delay(drop, 100);
    },
    [lift, section?._id],
  );

  const onUpClick = useCallback(() => move('up'), [move]);
  const onDownClick = useCallback(() => move('down'), [move]);

  const sectionHandler = useCallback(
    (e) => {
      setHeight?.(useHeightRef?.current?.offsetHeight);
      e.stopPropagation();
      if (!e.defaultPrevented) {
        setNoumSidePanelType?.(SectionToolType.SECTION_TYPE);
        setNoumSidePanelId?.(section?._id);
      }
    },
    [
      section?._id,
      setHeight,
      setNoumSidePanelId,
      setNoumSidePanelType,
      useHeightRef,
    ],
  );

  return (
    <>
      <HoverWrapper
        id={section?._id!}
        className="parent"
        type={SectionToolType.SECTION_TYPE}
        isActive={noumSidePanelId === section?._id}
        onUpClick={onUpClick}
        onDownClick={onDownClick}
        {...props}
      >
        <NoumSectionContainer
          aria-label={`section_${index + 1}`}
          ref={isSection ? useHeightRef : null}
          height={isSectionLayout ? height : undefined}
          isBackground={
            isSectionBackground
              ? sectionSideBarOptions?.sectionBackgroud?.background
              : section?.background
          }
          isEmptySection={isEmptySection}
          onClick={(e) => sectionHandler(e)}
          isEdit
        >
          <NoumSectionLayout
            id={section?._id}
            noumSectionType={
              isSectionLayout
                ? sectionSideBarOptions?.selectedLayout?.layoutType
                : section?.type!
            }
            isSmallerThanLaptop={isSmallerThanLaptop}
            sectionAlign={
              isSectionAlignItems
                ? sectionSideBarOptions?.selectedAlignItem?.alignItem
                : section?.columnsVerticalAlignType!
            }
          >
            {section?.columns.map((col) => (
              <Fragment key={col._id}>
                <DroppableElementArea
                  tools={col.tools}
                  columnId={col._id}
                  setNoumSidePanelId={setNoumSidePanelId}
                  setNoumSidePanelType={setNoumSidePanelType}
                  noumSidePanelId={noumSidePanelId}
                  col={col}
                  isSectionLayout={isSectionLayout}
                  sectionId={section._id}
                  isSectionBg={
                    isSectionBackground
                      ? sectionSideBarOptions?.sectionBackgroud?.background
                      : section?.background
                  }
                  {...props}
                />
              </Fragment>
            ))}
          </NoumSectionLayout>
        </NoumSectionContainer>
      </HoverWrapper>
    </>
  );
};

export default NoumSections;
