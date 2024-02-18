import { t } from 'i18next';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { type ElementTypeEnum } from '@/apollo/generated/types';
import { getVisiblityChangeButtonTooltip } from '@/screens/Chamber/CustomPreview/customPreviewHelper';
import ArrowDown from './Actions/ArrowDown';
import ArrowUp from './Actions/ArrowUp';
import Delete from './Actions/Delete';
import Duplicate from './Actions/Duplicate';
import Edit from './Actions/Edit';
import Move from './Actions/Move';
import PlusBottom from './Actions/PlusBottom';
import PlusTop from './Actions/PlusTop';
import {
  ChildWrapper,
  HoverWrapperContainer,
  PlusWrapper,
  StackElements,
  ToolContainer,
  ToolNameContainer,
} from './Styles';
import { InsertDirection, type SectionProps } from './types';
import Visibility from './Actions/Visibility';
import { SectionToolType, elementTitle } from '../../shared/constants';

export const HoverWrapper = (props: SectionProps) => {
  const {
    children,
    className,
    type,
    isActive,
    id,
    provided,
    currentIndex,
    totalIndex,
    isDragging,
    isElementDragging,
    onDownClick,
    onUpClick,
    onInsert,
    section,
    disabled,
    isSectionBackground,
    isColumnBackground,
    setOnDragInitiateId,
    isTool: isMoveTool,
    elementType,
    isCustomPreview = false,
    isEditing = true,
  } = props;
  const { noumSidePanelId, hoverId, setHoverId } = useEditChamberState();
  const isTool = type === SectionToolType.TOOL_TYPE;
  const isSingleElementDragging = isDragging && isTool;

  return isEditing ? (
    <HoverWrapperContainer
      onMouseEnter={() => setHoverId?.(id)}
      onMouseLeave={() => setHoverId?.(undefined)}
      isHoverNotActive={!!hoverId && hoverId !== noumSidePanelId}
      data-testid="hoverWrapper-container"
      isChild={className === 'child'}
      isActive={isActive}
      isDragging={isSingleElementDragging}
      isElementDragging={isElementDragging}
      isMoveTool={isMoveTool}
    >
      <ToolContainer className={className} isTool={isTool}>
        <ToolNameContainer
          aria-label={`${
            isTool ? elementTitle[elementType as ElementTypeEnum] : 'section'
          }`}
          font="footnote-bold"
          colorToken="--text-button-neutral-alt-default"
        >
          {isTool
            ? elementTitle[elementType as ElementTypeEnum]
            : `${t('noumena.noum_editor.hover_controls_section_title')}`}
        </ToolNameContainer>
      </ToolContainer>
      {isTool && !isDragging && !isCustomPreview && (
        <>
          <PlusWrapper className={className}>
            <PlusTop onClick={() => onInsert?.(InsertDirection.Above)} />
          </PlusWrapper>
          <PlusWrapper className={className} isBottom={true}>
            <PlusBottom onClick={() => onInsert?.(InsertDirection.Below)} />
          </PlusWrapper>
        </>
      )}
      <StackElements className={className} isTool={isTool}>
        {isTool && !isCustomPreview ? (
          <Move
            isTool={isTool}
            provided={provided}
            setOnDragInitiateId={setOnDragInitiateId}
            id={id!}
          />
        ) : (
          <>
            <ArrowUp
              isDisabled={disabled?.moveUp}
              isTool={isTool}
              onUpClick={onUpClick}
              provided={provided}
              currentIndex={currentIndex}
            />
            <ArrowDown
              isTool={isTool}
              onDownClick={onDownClick}
              provided={provided}
              currentIndex={currentIndex}
              totalIndex={totalIndex}
            />
          </>
        )}
        {isCustomPreview ? (
          <Visibility
            tool={props.tool}
            isDisabled={disabled?.visibility}
            toolTip={getVisiblityChangeButtonTooltip(props.tool)}
          />
        ) : (
          <>
            <Edit
              isDisabled={disabled?.edit}
              isTool={isTool}
              id={id!}
              tool={props?.tool}
            />

            <Duplicate
              isTool={isTool}
              id={id!}
              isDisabled={disabled?.duplicate}
              isSectionBackground={isSectionBackground}
            />
            <Delete
              isTool={isTool}
              section={section}
              id={id!}
              isDisabled={disabled?.delete}
              isSectionBackground={isSectionBackground}
              tool={props?.tool}
            />
          </>
        )}
      </StackElements>
      <ChildWrapper
        className={className === 'child' ? 'child-wrapper' : 'parent-wrapper'}
        isDragging={isSingleElementDragging}
        isSectionBackground={isSectionBackground}
        isColumnBackground={isColumnBackground}
      >
        {children}
      </ChildWrapper>
    </HoverWrapperContainer>
  ) : (
    <ChildWrapper
      className={className === 'child' ? 'child-wrapper' : 'parent-wrapper'}
      isDragging={isSingleElementDragging}
      isSectionBackground={isSectionBackground}
      isColumnBackground={isColumnBackground}
    >
      {children}
    </ChildWrapper>
  );
};
export default HoverWrapper;
