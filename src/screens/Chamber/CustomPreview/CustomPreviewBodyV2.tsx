import { useMemo, type FC } from 'react';
import { cleanList, reorderList } from '@/utils/list';
import { Spacer, Stack } from '@/layout';
import { BodyContainer } from '@/screens/Chamber/ViewChamber/styles';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { clearSectionWithNoTools } from '@/screens/Chamber/ViewChamber/noumViewHelper';
import {
  NoumSectionContainer,
  NoumSectionLayout,
} from '@/screens/Chamber/components/NoumSections/Styles';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { ColumnContainer } from '@/screens/Chamber/components/SectionElementRearrange/styles';
import { SpaceUtils } from '@/utils/space';
import { useBreakpoints } from '@/hooks';
import { useEvents } from '@/features/events/hooks';
import { ElementUtils } from '@/utils/element';
import {
  type NoumCustomPreviewElementInput,
  type ElementOutput,
} from '@/apollo/generated/types';
import { NoumLayoutUtils } from '@/hooks/noumLayout';
import { useGetQuickQuestionHelper } from '@/screens/Chamber/components/elements/QuickQuestionsElement/hooks/useGetQuickQuestionHelper';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import CustomPreviewElementV2 from './CustomPreviewElementV2';
import { CustomPreviewTabEnum } from './constants';
import { filteredSections } from './customPreviewHelper';

type CustomPreviewBodyV2Props = {};

const CustomPreviewBodyV2: FC<CustomPreviewBodyV2Props> = () => {
  const { isOwner, space } = useNoumContext();
  const { customPreviewElements, updateCustomPreviewElements } =
    useEditChamberState();

  const { hasNoumPermission } = useNoumAuthorization();
  const hasNoumCustomPreviewPermission = hasNoumPermission(
    'custom-noum-preview',
    isOwner,
  );
  const { isSmallerThanLaptop } = useBreakpoints();
  const { eventsCount } = useEvents({
    chamberId: space?._id || '',
    preventGetEvents: false,
  });

  const { totalQuestionCount } = useGetQuickQuestionHelper({
    spaceId: space?._id || '',
    isCollapsed: true,
    status: undefined,
  });

  const cpType = hasNoumCustomPreviewPermission
    ? CustomPreviewTabEnum.Edit
    : CustomPreviewTabEnum.Preview;

  const sectionList = useMemo(() => {
    const layout = SpaceUtils.getCustomPreviewLayoutV2(
      space,
      customPreviewElements,
      cpType,
    );

    return layout.sections;
  }, [cpType, customPreviewElements, space]);

  const finalSectionList = useMemo(
    () =>
      cleanList(
        clearSectionWithNoTools(
          hasNoumCustomPreviewPermission
            ? sectionList
            : filteredSections(sectionList, eventsCount, totalQuestionCount),
        ),
      ),
    [
      eventsCount,
      hasNoumCustomPreviewPermission,
      sectionList,
      totalQuestionCount,
    ],
  );

  const handlePositionChange = async (currentIndex: number, delta: number) => {
    const { tools } =
      sectionList.length > 0 && sectionList[0].columns.length > 0
        ? sectionList[0].columns[0]
        : { tools: [] };
    if (tools.length > 0) {
      const newElements = reorderList<ElementOutput>(
        tools,
        currentIndex,
        currentIndex + delta,
      );
      const elementsCP = newElements.map((el, index) => ({
        _id: el._id,
        customPosition: index + 1,
      })) as NoumCustomPreviewElementInput[];
      updateCustomPreviewElements?.(elementsCP);
    }
  };

  const includeCPAdditionalInfo =
    finalSectionList.length > 0 &&
    NoumLayoutUtils.hasCustomPreviewAdditionalInfoElement(finalSectionList[0]);

  return (
    <BodyContainer>
      <Spacer height={16} />
      <Stack vertical gap={12} fullWidth>
        {finalSectionList.map((section) => (
          <NoumSectionContainer
            isBackground={section.background}
            key={section._id}
          >
            <NoumSectionLayout
              id={section?._id}
              noumSectionType={section.type}
              isSmallerThanLaptop={isSmallerThanLaptop}
            >
              {section?.columns.map((col) => (
                <ColumnContainer
                  data-testid="noum-section-column"
                  id={col._id}
                  key={col._id}
                  gap={12}
                  vertical
                  isBackground={col.background}
                >
                  {col.tools.map((tool, toolIndex) =>
                    ElementUtils.isCustomPreviewVisible(tool) ? (
                      <CustomPreviewElementV2
                        tool={tool}
                        spaceId={space?._id || ''}
                        index={toolIndex}
                        totalIndex={col.tools.length - 1}
                        isEditing={hasNoumCustomPreviewPermission}
                        key={tool._id}
                        onUpClick={() => handlePositionChange(toolIndex, -1)}
                        onDownClick={() => handlePositionChange(toolIndex, 1)}
                        includeCPAdditionalInfo={includeCPAdditionalInfo}
                      />
                    ) : null,
                  )}
                </ColumnContainer>
              ))}
            </NoumSectionLayout>
          </NoumSectionContainer>
        ))}
      </Stack>
    </BodyContainer>
  );
};

export default CustomPreviewBodyV2;
