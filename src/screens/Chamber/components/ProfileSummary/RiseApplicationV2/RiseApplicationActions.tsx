import { memo } from 'react';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { Button } from '@/components';
import { ApplicationResultStatusAdmin } from '@/apollo/generated/types';
import { useToast, useBreakpoints } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { useRiseApplicationContext } from './RiseApplicationProvider/context';
import { Wrapper } from './styles';
import RiseApplicationStatus from './RiseApplicationStatus';
import SubmitRiseApplicationModal from './SubmitRiseApplicationModal';
import { RiseApplicationReviewButton } from '../../RightPanel/elements/NoumActions/RiseApplicationReviewButton';
import RiseApplicationInfoText from './RiseApplicationInfoText';

const RiseApplicationActions = memo(() => {
  const { isOwner } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();
  const { isDesktop } = useBreakpoints();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const {
    status,
    enableApplicationSubmission,
    canSubmit,
    setCanSubmit,
    isClassDeleted,
    essayQuestionAnswered,
    refresh,
    applicationId,
    resultJson,
  } = useRiseApplicationContext();

  if (!status) {
    return null;
  }

  const handleSubmitClick = () => {
    if (isClassDeleted) {
      addToast('error', 'icon', t(`noumena.rise_program.can_user_apply`));
      return;
    }
    if (essayQuestionAnswered) {
      addToast('error', 'icon', t('noumena.rise_program.essay_not_answered'));
    } else {
      setCanSubmit(true);
    }
  };

  return (
    <>
      {isOwner && status === ApplicationResultStatusAdmin.Inprogress && (
        <Wrapper>
          {isDesktop && <RiseApplicationInfoText />}
          <Button
            size="full"
            primary
            disabled={!enableApplicationSubmission}
            onClick={handleSubmitClick}
          >
            {t('noumena.chamber.rise.submit_my_application')}
          </Button>
        </Wrapper>
      )}
      {isConnected && (
        <RiseApplicationReviewButton refreshStatus={refresh} isNoumEditor />
      )}
      {(isConnected ||
        (isOwner && status !== ApplicationResultStatusAdmin.Inprogress)) &&
        isDesktop && (
          <RiseApplicationStatus status={status} isOwner={isOwner} />
        )}
      <SubmitRiseApplicationModal
        open={canSubmit}
        onClose={() => setCanSubmit(false)}
        refresh={refresh}
        applicationId={applicationId}
        resultJson={resultJson}
      />
    </>
  );
});

export default RiseApplicationActions;
