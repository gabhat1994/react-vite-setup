import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import ROUTES from '@/constants/routes';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useBreakpoints, useWindowDimensions } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { NoumEditRestrictionModal } from '@/screens/Chamber/components/modals/NoumEditRestrictionModal';
import { t } from 'i18next';
import { useState, type FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generatePath, useNavigate } from 'react-router';
import { SpaceUtils } from '@/utils/space';
import { NoumEditorOwnerActions } from './NoumEditorOwnerActions';
import { NoumEditorUserActions } from './NoumEditorUserActions';
import { ActionsWrapper } from './styles';

export const NoumEditorViewModeActions: FC = () => {
  const navigate = useNavigate();
  const { loadingSpace, space, editDisabled, isOwner } = useNoumContext();
  const isMasterNoum = SpaceUtils.isMasterNoum(space);
  const windowSize = useWindowDimensions();

  const { isMobile } = useBreakpoints();

  const { hasNoumPermission } = useNoumAuthorization();

  const isManagerMenuVisible =
    hasNoumPermission('assign-user-roles', isOwner) ||
    hasNoumPermission('invite-users', isOwner) ||
    hasNoumPermission('link-noums', isOwner);

  const [isRestrictionModalOpen, setRestrictionModalOpen] = useState(false);

  const onEdit = () => {
    if (windowSize.width < breakpoints.LAPTOP) {
      setRestrictionModalOpen(true);
      return;
    }

    if (!space?._id) {
      return;
    }

    const uri = isMasterNoum
      ? ROUTES.EDIT_HOME_NOUM
      : generatePath(ROUTES.EDIT_NOUM, { id: space._id });

    navigate(uri);
  };

  if (loadingSpace) {
    return (
      <ActionsWrapper data-testid="view-mode-actions-skeleton">
        <Skeleton height={56} borderRadius={8} />
      </ActionsWrapper>
    );
  }

  return (
    <>
      {isManagerMenuVisible ? (
        <>
          {isMasterNoum ? (
            <Stack fullWidth={isMobile}>
              <Button
                disabled={editDisabled}
                size={isMobile ? 'full' : 'large'}
                primary
                leftIcon={
                  <Icon
                    name="edit_m"
                    size={24}
                    color="--icon-button-neutral-alt-default"
                  />
                }
                onClick={onEdit}
              >
                {t('noumena.chamber.edit_button')}
              </Button>
            </Stack>
          ) : (
            <NoumEditorOwnerActions onEdit={onEdit} />
          )}
          <NoumEditRestrictionModal
            isOpen={isRestrictionModalOpen}
            onClose={() => setRestrictionModalOpen(false)}
          />
        </>
      ) : (
        <NoumEditorUserActions />
      )}
    </>
  );
};

export default NoumEditorViewModeActions;
