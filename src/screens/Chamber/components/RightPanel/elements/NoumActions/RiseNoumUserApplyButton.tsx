import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/contexts';
import { useError, useToast } from '@/hooks';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useGetNoumClassByNoumIdQuery } from '@/apollo/graphql';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { NoumActionButton } from './styles';
import RiseProgramCreateNoum from '../../../modals/RiseProgramCreateNoum';
import RiseProgramAlreadyCreated from '../../../modals/RiseProgramAlreadyCreated';
import { type IRiseNoumUserApplyButton } from './types';

export const RiseNoumUserApplyButton: React.FC<IRiseNoumUserApplyButton> = ({
  isNoumEditor,
}) => {
  const { t } = useTranslation();
  const [canUserApply, setCanUserApply] = useState<boolean | undefined>();
  const [openAlreadyCreated, setOpenAlreadyCreated] = useState(false);
  const [riseApplicationNoumId, setRiseApplicationNoumId] = useState<
    string | undefined
  >();

  const { isActive: isUserActive } = useAuth();
  const { addToast } = useToast();

  const { space } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { logError } = useError();

  const { data, error } = useGetNoumClassByNoumIdQuery({
    variables: {
      noumId: space?._id!,
    },
    skip: !space?._id,
    onCompleted: () => {
      if (data?.getNoumClassByNoumId?._id) {
        setCanUserApply(!data.getNoumClassByNoumId?.isDeleted);
      }
    },
    onError: () => {
      logError(error, 'GetNoumClassByNoumId');
    },
  });

  const onClickApplyButton = useCallback(() => {
    if (canUserApply) {
      if (isConnected) {
        setShowConfirm(true);
      } else {
        addToast('error', 'icon', t(`noumena.rise_program.apply_check`));
      }
    } else {
      addToast('error', 'icon', t(`noumena.rise_program.can_user_apply`));
    }
  }, [addToast, canUserApply, isConnected, t]);

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
        {t('noumena.chamber.riseprogram.apply_button')}
      </NoumActionButton>
      {showConfirm && (
        <RiseProgramCreateNoum
          onClose={() => setShowConfirm(false)}
          setRiseApplicationNoumId={setRiseApplicationNoumId}
          setOpenAlreadyCreated={setOpenAlreadyCreated}
        />
      )}
      {openAlreadyCreated && (
        <RiseProgramAlreadyCreated
          open={openAlreadyCreated}
          onClose={() => setOpenAlreadyCreated(false)}
          riseApplicationNoumId={riseApplicationNoumId}
        />
      )}
    </>
  );
};
