import { type FC } from 'react';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { Element } from '@/screens/Chamber/components/Element';
import { ElementUtils } from '@/utils/element';
import ElementWrapper from '@/screens/Chamber/components/ElementWrapper/ElementWrapper';
import { NonInteractiveOverlay } from '@/screens/Chamber/components/ElementWrapper/styles';
import { HoverWrapper } from '@/features/noums/noumEditor/components/HoverWrapper';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { type CustomPreviewElementV2Props } from './types';

const CustomPreviewElementV2: FC<CustomPreviewElementV2Props> = ({
  tool,
  spaceId,
  index,
  totalIndex,
  isEditing,
  onUpClick,
  onDownClick,
  includeCPAdditionalInfo,
}) => {
  const isCPAdditionalInfoTool = ElementUtils.isCPAdditionalInfoElement(tool);
  const isDisabledToMoveUp = index < (includeCPAdditionalInfo ? 2 : 1);
  const isColumnBackgroundForView =
    !isEditing &&
    (ElementUtils.isMediaElement(tool) ||
      tool.elementType === ElementTypeEnum.Text);

  return (
    <HoverWrapper
      key={tool?._id}
      id={tool?._id!}
      className="child"
      type={SectionToolType.TOOL_TYPE}
      isActive={false}
      isCustomPreview
      currentIndex={index}
      elementType={tool?.elementType || undefined}
      totalIndex={totalIndex}
      isEditing={isEditing && !isCPAdditionalInfoTool}
      onUpClick={onUpClick}
      onDownClick={onDownClick}
      tool={tool}
      disabled={{
        moveUp: isDisabledToMoveUp,
        visibility: !ElementUtils.isCPVisibilityChangeable(tool),
      }}
      isSectionBackground
      isColumnBackground={isColumnBackgroundForView}
    >
      <ElementWrapper
        className="element-container"
        element={tool}
        spaceId={spaceId}
        isCustomPreview={isEditing}
        isCustomPreviewVisible={ElementUtils.isCustomPreviewVisible(tool)}
        isEditing={false}
      >
        <>
          {!isCPAdditionalInfoTool && isEditing && <NonInteractiveOverlay />}
          <Element
            className="element-container"
            spaceId={spaceId}
            element={tool}
            id={tool?._id || ''}
            currentTitle={tool?.headerContent ?? tool?.elementType ?? 'UNKNOWN'}
            isEditing={isEditing && isCPAdditionalInfoTool}
            columnWidth={700}
            textEditorContentPadding={isEditing ? 16 : 0}
          />
        </>
      </ElementWrapper>
    </HoverWrapper>
  );
};

export default CustomPreviewElementV2;
