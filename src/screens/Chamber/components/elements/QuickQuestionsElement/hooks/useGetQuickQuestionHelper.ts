import {
  SortOperator,
  type QuestionStatusEnum,
} from '@/apollo/generated/types';
import { useGetQuestionsForSpaceQuery } from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import { cleanList } from '@/utils/list';
import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { PAGE_SIZE } from '../constants';
import { questionsMockData } from '../data';

interface UseGetQuickQuestionHelperProps {
  spaceId: string;
  status: QuestionStatusEnum | undefined;
  isCollapsed: boolean;
  isEditing?: boolean;
}

export function useGetQuickQuestionHelper({
  spaceId,
  status,
  isCollapsed,
  isEditing,
}: UseGetQuickQuestionHelperProps) {
  const { addToast } = useToast();
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, refetch, previousData } = useGetQuestionsForSpaceQuery(
    {
      variables: {
        spaceId,
        sort: {
          column: 'createdAt',
          operator: SortOperator.Desc,
        },
        limit: isCollapsed ? 1 : PAGE_SIZE,
        filter: isCollapsed ? {} : { status },
        offset,
      },
      skip: (!isCollapsed && !status) || !spaceId,
      fetchPolicy: 'cache-and-network',
      onError(error) {
        let message = t('noumena.error.unknown');
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
      },
    },
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(Math.max(page - 1, 0) * PAGE_SIZE);
  };

  const queryData = data || previousData;

  const quickQuestionsList = useMemo(
    () => cleanList(queryData?.getQuestionsForSpace?.data),
    [queryData?.getQuestionsForSpace?.data],
  );
  const quickQuestionsMockList = useMemo(
    () => cleanList(questionsMockData.getQuestionsForSpace?.data),
    [],
  );

  const openQuestionCount = queryData?.open?.count || 0;
  const closeQuestionCount = queryData?.close?.count || 0;
  const answeredQuestionCount = queryData?.answered?.count || 0;
  const tippedQuestionCount = queryData?.tipped?.count || 0;
  const totalQuestionCount = openQuestionCount + closeQuestionCount;
  const isShowPlaceholder = isEditing && totalQuestionCount < 1;

  const handleRefetch = async () => {
    await refetch();
  };

  return {
    data,
    loading,
    refetch: handleRefetch,
    openQuestionCount,
    closeQuestionCount,
    answeredQuestionCount,
    tippedQuestionCount,
    totalQuestionCount,
    quickQuestionsList: isShowPlaceholder
      ? quickQuestionsMockList
      : quickQuestionsList,
    count: data?.getQuestionsForSpace?.count ?? 0,
    isShowPlaceholder,
    setCurrentPage,
    setOffset,
    onPageChange,
    currentPage,
  };
}
