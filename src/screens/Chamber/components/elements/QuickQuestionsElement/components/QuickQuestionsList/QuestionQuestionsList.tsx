import {
  type NoumQuestionOutput,
  type QuestionStatusEnum,
} from '@/apollo/generated/types';
import { Stack } from '@/layout';
import React from 'react';

import { Pagination } from '@/components/Pagination/Pagination';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { QuestionAnswer } from '@/screens/Chamber/components/elements/QuickQuestionsElement/components/QuestionAnswer';
import { SkeletonLoaderQuickQuestionElementBody } from '../../../SkeletonLoader/SkeletonLoaderQuickQuestionElement';
import { PAGE_SIZE } from '../../constants';
import { QuestionWrapper } from '../../styles';
import NoQuestions from '../NoQuestions/NoQuestions';

type QuestionQuestionsListProps = {
  data: NoumQuestionOutput[];
  loading: boolean;
  count: number;
  refetch: () => Promise<void>;
  currentPage: number;
  totalQuestionCount: number;
  selectedTab: QuestionStatusEnum;
  selectedCustomPreviewTab: string | undefined;
  isOwner: boolean | undefined;
  openQuestionCount: number;
  closeQuestionCount: number;
  onPageChange: (page: number) => void;
  openAddQuestionModal: () => void;
};

export const QuickQuestionsList: React.FC<QuestionQuestionsListProps> = ({
  data,
  loading,
  count,
  currentPage,
  refetch,
  totalQuestionCount,
  openQuestionCount,
  closeQuestionCount,
  selectedTab,
  isOwner,
  onPageChange,
  selectedCustomPreviewTab,
  openAddQuestionModal,
}) => (
  <>
    {data.length > 0 ? (
      <QuestionWrapper loading={loading} gap={16}>
        {data.map((question, index) => (
          <ElementWrapperV2.BodyListItemWrapper
            key={question._id}
            type="question"
            isLastItem={index === data.length - 1}
            index={index}
          >
            <QuestionAnswer
              key={question?._id}
              question={question}
              selectedCustomPreviewTab={selectedCustomPreviewTab}
              selectedTab={selectedTab}
              onRefetch={refetch}
              isOwner={isOwner}
            />
          </ElementWrapperV2.BodyListItemWrapper>
        ))}
        {count > PAGE_SIZE && (
          <Stack padding={16} fullWidth>
            <Pagination
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalCount={count}
              onPageChange={onPageChange}
            />
          </Stack>
        )}
      </QuestionWrapper>
    ) : loading ? (
      <ElementWrapperV2.Body>
        <SkeletonLoaderQuickQuestionElementBody />
      </ElementWrapperV2.Body>
    ) : (
      <NoQuestions
        totalQuestionCount={totalQuestionCount}
        openAddQuestionModal={openAddQuestionModal}
        openQuestionCount={openQuestionCount}
        closeQuestionCount={closeQuestionCount}
        selectedTab={selectedTab}
      />
    )}
  </>
);
