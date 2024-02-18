import {
  BodyContentEnum,
  NoumLayoutSectionType,
  NoumLayoutSectionVerticalAlignType,
} from '@/apollo/generated/types';
import { TSpan } from '@/components';
import { useRiseQuestions } from '@/features/noums/hooks/spaceQuery';
import { useBreakpoints } from '@/hooks';
import { memo } from 'react';
import { useNoumContext } from '../../ViewChamber/ChamberProvider';
import {
  NoumSectionContainer,
  NoumSectionLayout,
} from '../NoumSections/Styles';
import { ColumnContainer } from '../SectionElementRearrange/styles';
import { RiseEssayQuestion } from './RiseEssayQuestion';

const riseElement = {
  bodyContentJson: null,
  bodyContentType: BodyContentEnum.Text,
  elementType: 'TEXT',
  status: 'PUBLISHED',
};

export const RiseEssayQuestionV2 = memo(() => {
  const { isSmallerThanLaptop } = useBreakpoints();
  const { space, isOwner } = useNoumContext();

  const {
    questions,
    applicationId,
    resultJson,
    refetch,
    status,
    parentNoumId,
  } = useRiseQuestions(space?._id);

  if (!questions || questions.length <= 0) {
    return null;
  }

  return (
    <>
      {questions.length > 0 &&
        questions.map((object) => (
          <NoumSectionContainer key={`${object?.id}`} isBackground={true}>
            <NoumSectionLayout
              isSmallerThanLaptop={isSmallerThanLaptop}
              noumSectionType={NoumLayoutSectionType.SingleColumn_700Px}
              sectionAlign={NoumLayoutSectionVerticalAlignType.Center}
            >
              <ColumnContainer
                data-testid="noum-section-column"
                key={object?.question || ''}
                gap={12}
                vertical
                isBackground={true}
              >
                <TSpan
                  font="heading-xs-bold"
                  colorToken="--text-body-header-neutral-default"
                >
                  {object?.question || ''}
                </TSpan>
                <RiseEssayQuestion
                  isEditing={false}
                  spaceId={space?._id || ''}
                  isOwner={isOwner}
                  element={riseElement}
                  applicationId={applicationId}
                  questionId={object?.id}
                  refetch={refetch}
                  resultJson={resultJson}
                  status={status}
                  parentNoumId={parentNoumId}
                  question={object?.question}
                />
              </ColumnContainer>
            </NoumSectionLayout>
          </NoumSectionContainer>
        ))}
    </>
  );
});
