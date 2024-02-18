import { t } from 'i18next';
import React, { useCallback, useMemo, useRef } from 'react';
import { generatePath, useNavigate } from 'react-router';

import {
  ProjectChamberType,
  SpaceStatusEnum,
  SpaceTypeEnum,
  type NoumLink,
} from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useResignFlow } from '@/features/noums/hooks/manageMembers/useResignFlow';
import { useChangeProjectChamberStatusHelper } from '@/features/noums/hooks/noums';
import { MemberUtils } from '@/features/noums/utils';
import { useWindowDimensions } from '@/hooks';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useGetNoumByLinkContext } from '@/screens/Chamber/components/RightPanel/NoumByLinkProvider';
import { ChamberUnarchiveModal } from '@/screens/Chamber/components/modals/ChamberArchive/ChamberUnarchiveModal';
import HandleUnlinkNoum from '@/screens/Chamber/components/modals/LinkNoum/HandleUnlinkNoum';
import LinkNoum from '@/screens/Chamber/components/modals/LinkNoum/LinkNoumModal';
import { type HandleUnlinkNoumRef } from '@/screens/Chamber/components/modals/LinkNoum/types';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { SpaceUtils } from '@/utils/space';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import RiseApplicationActions from '../../../ProfileSummary/RiseApplicationV2/RiseApplicationActions';
import { VisibilitySettingsModal } from '../../../modals/VisibilitySettingsModal';
import {
  NoumEditorOwnerActionNames,
  getEllipsisMenuOptions,
  getPlusMenuOptions,
} from './config';
import { EllipsisWrapper, NoumActionButton } from './styles';
import { type NoumEditorOwnerActionsProps } from './types';

type ModalType = 'link-noum' | 'unarchive' | 'visibility-settings';

export const NoumEditorOwnerActions: React.FC<NoumEditorOwnerActionsProps> = ({
  onEdit,
}) => {
  const navigate = useNavigate();
  const handleUnlinkNoumRef = useRef<HandleUnlinkNoumRef>(null);
  const { isActive: isUserActive } = useAuth();
  const {
    space,
    editDisabled,
    refetchSpaceById: onRefetchSpaceById,
    isOwner,
  } = useNoumContext();
  const { noumMember } = useNoumUserConnectionContext();

  const isMasterNoum = SpaceUtils.isMasterNoum(space);
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const canResign = MemberUtils.isManager(noumMember);

  const { openModal: openResignModal, resignFromManagerModal } = useResignFlow({
    noumId: space?._id ?? '',
    onResign: onRefetchSpaceById,
  });

  const {
    flags: { invoiceTool, contractTool, elementPermission },
  } = useLaunchDarkly();

  const { hasNoumPermission } = useNoumAuthorization();

  const hasAccessToManageMembersView =
    hasNoumPermission('assign-user-roles') || hasNoumPermission('invite-users');

  const hasEditNoumPermission =
    hasNoumPermission('edit-noum', isOwner) || (isMasterNoum && isOwner);

  const hasLinkNoumPermission = hasNoumPermission('link-noums', isOwner);

  const windowSize = useWindowDimensions();
  const { noumLinkData, refetch, loadingLinked } = useGetNoumByLinkContext();

  const isMobile = useMemo(
    () => windowSize.width <= breakpoints.MOBILE_L,
    [windowSize.width],
  );

  const getNoumLink = noumLinkData?.getNoumLinkByNoumId;
  const isNoumLinked = !!getNoumLink?.link?._id;

  const { changeProjectChamberStatusHelper, loading: loadingChangeNoumStatus } =
    useChangeProjectChamberStatusHelper();

  const handleUnarchive = useCallback(async () => {
    if (space?._id) {
      await changeProjectChamberStatusHelper(
        space._id,
        SpaceStatusEnum.Published,
        closeModal,
      );
    }
  }, [space, changeProjectChamberStatusHelper, closeModal]);

  const handleSelectDropdown = (selectedDropdown?: string) => {
    switch (selectedDropdown) {
      case NoumEditorOwnerActionNames.UnlinkNoums:
        if (getNoumLink?.link && getNoumLink.link.linkedNoumsCount > 2) {
          handleUnlinkNoumRef.current?.toggleUnlinkMultipleNoum();
        } else {
          handleUnlinkNoumRef.current?.toggleUnlinkConfirmationOpen();
        }
        break;
      case NoumEditorOwnerActionNames.LinkNoums:
        openModal('link-noum');
        break;
      case NoumEditorOwnerActionNames.NewInvoice:
        navigate({
          pathname: '/invoice/create',
          search: `?noumId=${space?._id}`,
        });
        break;
      case NoumEditorOwnerActionNames.NewContract:
        navigate(ContractToolRoutes.createContract({ noumId: space?._id! }));
        break;
      case NoumEditorOwnerActionNames.NewSow:
        navigate(
          ContractToolRoutes.createStatementOfWork({
            noumId: space?._id!,
          }),
        );
        break;
      case NoumEditorOwnerActionNames.ManageMembers: {
        if (!space?._id) return;
        navigate(generatePath(ROUTES.NOUM_MANAGE_MEMBERS, { id: space._id }));
        break;
      }
      case NoumEditorOwnerActionNames.VisibilitySettings:
        openModal('visibility-settings');
        break;
      case NoumEditorOwnerActionNames.ResignFromManager:
        openResignModal();
        break;
    }
  };

  const handleGoToLinkNoum = () => {
    if (isNoumLinked) {
      navigate(
        `${ROUTES.LINK_NOUM}?linkID=${noumLinkData?.getNoumLinkByNoumId?.link?._id}`,
      );
    } else {
      navigate(`${ROUTES.LINK_NOUM}?preselect=${space?._id}`);
    }
  };

  const ellipsisMenuOptions = useMemo(
    () =>
      getEllipsisMenuOptions({
        hasAccessToManageMembersView,
        isNoumLinked,
        isElementPermissionsEnabled: elementPermission,
        hasLinkNoumPermission,
        canResignFromManager: canResign,
        t,
      }),
    [
      canResign,
      elementPermission,
      hasAccessToManageMembersView,
      hasLinkNoumPermission,
      isNoumLinked,
    ],
  );

  const plusMenuOptions = useMemo(
    () => getPlusMenuOptions(!!contractTool, !!invoiceTool, t),
    [contractTool, invoiceTool],
  );

  if (SpaceUtils.isArchived(space)) {
    return (
      <>
        <Stack
          align="center"
          justify="center"
          data-testid="archived-noum-actions"
        >
          <NoumActionButton
            disabled={editDisabled}
            size="full"
            secondary
            onClick={() => openModal('unarchive')}
          >
            {t('noumena.chamber.unarchive_button')}
          </NoumActionButton>
        </Stack>
        {modalType === 'unarchive' && (
          <ChamberUnarchiveModal
            isOpen={modalType === 'unarchive'}
            handleClose={closeModal}
            onUnarchive={handleUnarchive}
            loading={loadingChangeNoumStatus}
            spaceId={space?._id}
          />
        )}
      </>
    );
  }

  if (space?.type === SpaceTypeEnum.RiseApplication) {
    return (
      <Stack
        gap={16}
        data-testid="rise-application-actions"
        fullWidth={isMobile}
      >
        <RiseApplicationActions />
      </Stack>
    );
  }

  return (
    <>
      <Stack gap={16} data-testid="edit-noum-actions" fullWidth={isMobile}>
        {ellipsisMenuOptions.length > 0 && (
          <EllipsisWrapper className="ellipsis-menu">
            <EllipsisMenu
              menuOptions={ellipsisMenuOptions}
              size="full"
              onClick={handleSelectDropdown}
              containerWidth="235px"
              loadingLinked={loadingLinked}
            />
          </EllipsisWrapper>
        )}
        <Dropdown
          containerWidth="max-content"
          hideIcons
          closeOnSelect
          onSelectOption={(v) => handleSelectDropdown(v.value)}
          options={plusMenuOptions}
          isAnimation={false}
          observerMinHeight="0"
          renderContainerFromBottom
        >
          {({
            targetRef,
            targetProps,
            toggle,
          }: DropdownTargetProps<HTMLButtonElement>) => (
            <Button
              ref={targetRef}
              onClick={toggle}
              {...targetProps}
              secondary
              size="large"
              leftIcon={<Icon name="plus_m" size={24} />}
            />
          )}
        </Dropdown>
        {hasEditNoumPermission && (
          <Button
            disabled={!isUserActive}
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
        )}
      </Stack>
      <LinkNoum
        goToNoumLink={handleGoToLinkNoum}
        isOpen={modalType === 'link-noum'}
        handleClose={closeModal}
      />
      <HandleUnlinkNoum
        noumLink={getNoumLink?.link as NoumLink}
        ref={handleUnlinkNoumRef}
        space={space}
        refetch={refetch}
      />

      <VisibilitySettingsModal
        key={space?.projectType ?? ProjectChamberType.Public}
        isOpen={modalType === 'visibility-settings'}
        handleClose={closeModal}
        noumId={space?._id ?? ''}
        space={space}
      />
      {resignFromManagerModal}
    </>
  );
};
