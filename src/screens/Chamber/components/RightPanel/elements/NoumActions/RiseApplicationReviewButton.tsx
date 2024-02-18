import React, { useState } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { Modal, ModalSize } from '@/components/ExtendedModal';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useRiseQuestions } from '@/features/noums/hooks/spaceQuery';
import { NoumActionButton } from './styles';
import { RiseIframe, RiseIFrameContainer } from '../RiseApplication/styles';

interface Props {
  refreshStatus: () => void;
  isNoumEditor?: boolean;
}

export const RiseApplicationReviewButton = ({
  refreshStatus,
  isNoumEditor,
}: Props) => {
  const [modal, setModal] = useState<{
    open: boolean;
    source: string;
  }>({
    open: false,
    source: '',
  });
  const { isActive: isUserActive } = useAuth();
  const { space } = useNoumContext();
  const { applicationId } = useRiseQuestions(space?._id);

  const url = process.env.VITE_OPS_URL;

  const onClickApplyButton = async () => {
    const source = `${url}?to=riseapplication&applicationId=${applicationId}&theme=web&hidemenu=true`;
    setModal({ open: true, source });
  };

  const onCloseClick = () => {
    setModal({ open: false, source: '' });
    refreshStatus();
  };

  return (
    <>
      <NoumActionButton
        testId="user-rise-apply-button"
        isNoumEditor={isNoumEditor}
        disabled={!isUserActive}
        size={!isNoumEditor ? 'full' : undefined}
        primary
        onClick={onClickApplyButton}
      >
        Review Application
      </NoumActionButton>
      <Modal
        open={modal.open}
        size={ModalSize.XXL}
        enableCloseButton
        onClose={onCloseClick}
      >
        <RiseIFrameContainer>
          <RiseIframe src={modal.source} title="rise_Application_review" />
        </RiseIFrameContainer>
      </Modal>
    </>
  );
};
