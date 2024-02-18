import {
  forwardRef,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { delay } from '@/utils/delay';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { ElementUtils } from '@/utils/element';
import { useToggle } from '@/hooks';
import { EditMode } from './EditMode';
import { Wrapper, WrapperChildContainer } from './styles';
import { type ElementWrapperProps } from './types';
import { ViewModeNoumEditor } from './ViewModeNoumEditor';

export const ElementWrapper = forwardRef(
  (props: ElementWrapperProps, ref: Ref<HTMLDivElement>) => {
    const {
      spaceId,
      element,
      currentTitle = '',
      currentIndex,
      totalIndex,
      isEditing = false,
      children,
      lift,
      provided,
      isBorder = false,
      handleOpenExperienceModal,
      hideContent,
      setShowAll,
      isCustomPreview,
      handleCPVisibilityChange,
      selectedCustomPreviewTab,
      isHighlight,
      updateElementLoader,
      ...rest
    } = props;

    const [childRef, setChildRef] = useState<HTMLSpanElement | null>();
    const [childHeight, setChildHeight] = useState<number>();
    useEffect(() => {
      if (!childHeight) {
        setChildHeight(childRef?.clientHeight);
      }
    }, [childHeight, childRef?.clientHeight]);

    const contentCollapse = useMemo(
      () =>
        element.elementType === ElementTypeEnum.BusinessBrief ||
        element.elementType === ElementTypeEnum.Home ||
        element.elementType === ElementTypeEnum.Text ||
        element.elementType === ElementTypeEnum.Skills,
      [element.elementType],
    );

    const isTitleHide = useMemo(
      () =>
        element.elementType === ElementTypeEnum.Video ||
        element.elementType === ElementTypeEnum.Text ||
        element.elementType === ElementTypeEnum.Userposts ||
        element.elementType === ElementTypeEnum.Image,
      [element.elementType],
    );

    const move = useCallback(
      async (type: 'up' | 'down') => {
        if (!lift) return;

        const actions = lift(`${element._id}`);

        if (!actions) return;

        const { moveDown, moveUp, drop } = actions;

        if (type === 'up') {
          await delay(moveUp, 0);
        }
        if (type === 'down') {
          await delay(moveDown);
        }
        await delay(drop, 0);
      },
      [lift, element],
    );

    const onUpClick = useCallback(() => move('up'), [move]);
    const onDownClick = useCallback(() => move('down'), [move]);

    const [isCustomPreviewVisible, toggle] = useToggle(
      ElementUtils.isCustomPreviewVisible(element),
    );
    const onChangeCPVisibility = () => {
      handleCPVisibilityChange?.(!isCustomPreviewVisible);
      toggle();
    };

    return (
      <Wrapper
        isHighlight={isHighlight}
        ref={ref}
        data-testid="wrapper"
        {...rest}
        isVisible={
          !isCustomPreview || (isCustomPreview && isCustomPreviewVisible)
        }
      >
        <>
          {isEditing ? (
            <EditMode
              spaceId={spaceId}
              element={element}
              currentTitle={currentTitle}
              currentIndex={currentIndex}
              totalIndex={totalIndex}
              onUpClick={onUpClick}
              onDownClick={onDownClick}
              provided={provided}
              handleOpenExperienceModal={handleOpenExperienceModal}
              isCustomPreview={isCustomPreview}
              isCustomPreviewVisible={isCustomPreviewVisible}
              handleCPVisibilityChange={onChangeCPVisibility}
              updateElementLoader={updateElementLoader}
            />
          ) : (
            !isTitleHide &&
            currentTitle && <ViewModeNoumEditor currentTitle={currentTitle} />
          )}
        </>

        {!hideContent && (
          <>
            <WrapperChildContainer
              ref={(newRef) => setChildRef(newRef)}
              isEditing={isEditing}
              childHeight={childHeight}
              isBorder={isBorder}
              data-testid="childContainer"
              preview={ElementUtils.isMediaElement(element)}
              isEditor={contentCollapse}
            >
              {children}
            </WrapperChildContainer>
          </>
        )}
      </Wrapper>
    );
  },
);

export default ElementWrapper;
