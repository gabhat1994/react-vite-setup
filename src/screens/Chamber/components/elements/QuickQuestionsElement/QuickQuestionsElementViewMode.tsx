import { useState } from 'react';

import { QuestionStatusEnum } from '@/apollo/generated/types';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useLaunchDarkly } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import QuickQuestionsElementHeader from '@/screens/Chamber/components/elements/QuickQuestionsElement/components/QuickQuestionsElementHeader';
import { AddQuestionModal } from '@/screens/Chamber/components/elements/QuickQuestionsElement/modals/AddQuestion/AddQuestionModal';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { ElementWrapperV2 } from '../../ElementWrapperV2';
import { QuickQuestionsList } from './components/QuickQuestionsList/QuestionQuestionsList';
import { useGetQuickQuestionHelper } from './hooks/useGetQuickQuestionHelper';
import { type QuickQuestionsElementProps } from './types';
import { QuickQuestionsUtils } from './utils';

type ModalType = 'add-question-modal';

const QuickQuestionsElementViewMode = ({
  isEditing,
  spaceId,
  currentTitle,
  selectedCustomPreviewTab,
  isOwner,
}: QuickQuestionsElementProps) => {
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const [selectedTab, setSelectedTab] = useState<QuestionStatusEnum>(
    QuestionStatusEnum.Active,
  );

  const {
    flags: { webTips },
  } = useLaunchDarkly();

  const { isConnected } = useNoumUserConnectionContext();
  const {
    quickQuestionsList,
    count,
    loading,
    refetch,
    totalQuestionCount,
    openQuestionCount,
    closeQuestionCount,
    answeredQuestionCount,
    tippedQuestionCount,
    isShowPlaceholder,
    currentPage,
    onPageChange,
    setCurrentPage,
    setOffset,
  } = useGetQuickQuestionHelper({
    spaceId,
    status: selectedTab,
    isCollapsed: false,
    isEditing,
  });

  const availableTabOptions = QuickQuestionsUtils.getAvailableTabOptions({
    answeredQuestionCount,
    isConnected,
    isOwner,
    isShowPlaceholder,
    tippedQuestionCount,
    webTips,
  });

  const onTabChange = (value: string) => {
    setSelectedTab(value as QuestionStatusEnum);
    setCurrentPage(1);
    setOffset(0);
  };

  return (
    <>
      <QuickQuestionsElementHeader
        spaceId={spaceId}
        currentTitle={currentTitle}
        openAddQuestionModal={() => openModal('add-question-modal')}
        selectedCustomPreviewTab={selectedCustomPreviewTab}
        openQuestionCount={openQuestionCount}
      />

      <ElementWrapperV2.Body>
        <BasicChipsTabsForm
          onChange={onTabChange}
          inputList={availableTabOptions}
          selectedId={selectedTab}
          mode="isUnderline"
          isWithoutImage
          tabWidth="auto"
          fontSize="--font-link-medium-size"
          textFont="--font-body-medium-regular-font"
        />
      </ElementWrapperV2.Body>
      <QuickQuestionsList
        count={count}
        loading={loading}
        refetch={refetch}
        isOwner={isOwner}
        closeQuestionCount={closeQuestionCount}
        openQuestionCount={openQuestionCount}
        onPageChange={onPageChange}
        selectedTab={selectedTab}
        selectedCustomPreviewTab={selectedCustomPreviewTab}
        currentPage={currentPage}
        totalQuestionCount={totalQuestionCount}
        data={quickQuestionsList}
        openAddQuestionModal={() => openModal('add-question-modal')}
      />
      {modalType === 'add-question-modal' && (
        <AddQuestionModal
          spaceId={spaceId}
          onClose={closeModal}
          isOpen
          refetch={refetch}
        />
      )}
    </>
  );
};

export default QuickQuestionsElementViewMode;
