import { t } from 'i18next';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';

import { SpaceStatusEnum, type NoumLink } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useChangeProjectChamberStatusHelper } from '@/features/noums/hooks/noums';
import { useToggle } from '@/hooks';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useGetNoumByLinkContext } from '@/screens/Chamber/components/RightPanel/NoumByLinkProvider';
import { ChamberUnarchiveModal } from '@/screens/Chamber/components/modals/ChamberArchive/ChamberUnarchiveModal';
import HandleUnlinkNoum from '@/screens/Chamber/components/modals/LinkNoum/HandleUnlinkNoum';
import LinkNoum from '@/screens/Chamber/components/modals/LinkNoum/LinkNoumModal';
import { type HandleUnlinkNoumRef } from '@/screens/Chamber/components/modals/LinkNoum/types';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { compact } from 'lodash';
import { SpaceUtils } from '@/utils/space';
import { NoumActionButton, RowContainer } from './styles';

export const NoumOwnerActions: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleUnlinkNoumRef = useRef<HandleUnlinkNoumRef>(null);
  const { isActive: isUserActive } = useAuth();
  const [isLinkNoumOpen, toggleLinkNoumOpen] = useToggle(false);
  const {
    space,
    editDisabled,
    refetchSpaceById: onRefetchSpaceById,
    isOwner,
  } = useNoumContext();

  const {
    flags: { invoiceTool, contractTool },
  } = useLaunchDarkly();

  const { noumLinkData, refetch, loadingLinked } = useGetNoumByLinkContext();

  const { hasNoumPermission } = useNoumAuthorization();

  const hasAccessToManageMembersView =
    hasNoumPermission('assign-user-roles') || hasNoumPermission('invite-users');

  const getNoumLink = useMemo(
    () => noumLinkData?.getNoumLinkByNoumId,
    [noumLinkData],
  );

  const isNoumLinked = !!getNoumLink?.link?._id;

  const onEdit = useCallback(() => {
    if (!space?._id) return;
    navigate(generatePath(ROUTES.EDIT_NOUM, { id: space._id }));
  }, [navigate, space]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { changeProjectChamberStatusHelper } =
    useChangeProjectChamberStatusHelper();

  const handleUnarchive = useCallback(async () => {
    if (space?._id) {
      await changeProjectChamberStatusHelper(
        space._id,
        SpaceStatusEnum.Published,
        onRefetchSpaceById,
      );
    }
  }, [space, changeProjectChamberStatusHelper, onRefetchSpaceById]);

  const handleSelectDropdown = (selectedDropdown?: string) => {
    switch (selectedDropdown) {
      case 'unlinked_noum':
        if (getNoumLink?.link && getNoumLink.link.linkedNoumsCount > 2) {
          handleUnlinkNoumRef.current?.toggleUnlinkMultipleNoum();
        } else {
          handleUnlinkNoumRef.current?.toggleUnlinkConfirmationOpen();
        }
        break;
      case 'manage_members': {
        if (!space?._id) return;
        navigate(generatePath(ROUTES.NOUM_MANAGE_MEMBERS, { id: space._id }));
        break;
      }
      case 'linked_noum':
        toggleLinkNoumOpen();
        break;
      case 'new_invoice':
        navigate({
          pathname: '/invoice/create',
          search: `?noumId=${space?._id}`,
        });
        break;
      case 'new_contract':
        navigate(ContractToolRoutes.createContract({ noumId: space?._id! }));
        break;
      case 'new_sow':
        navigate(
          ContractToolRoutes.createStatementOfWork({
            noumId: space?._id!,
          }),
        );
        break;
    }
  };

  const handleGoToLinkNoum = useCallback(() => {
    if (isNoumLinked) {
      navigate(
        `${ROUTES.LINK_NOUM}?linkID=${noumLinkData?.getNoumLinkByNoumId?.link?._id}`,
      );
    } else {
      navigate(`${ROUTES.LINK_NOUM}?preselect=${space?._id}`);
    }
  }, [
    isNoumLinked,
    navigate,
    noumLinkData?.getNoumLinkByNoumId?.link?._id,
    space,
  ]);

  const ellipsisMenuOptions = useMemo<DropdownValueType<string, string>[]>(
    () =>
      compact([
        hasNoumPermission('link-noums', isOwner) && {
          value: 'linked_noum',
          key: 'Linked Noum',
          type: 'value',
          label: t('noumena.link_noums.link_noums', {
            linkNo: '',
          }),
          icon: (
            <Icon
              name="link_m"
              size={24}
              color="--text-tablecell-header-neutral-highlighted"
            />
          ),
        },
        hasNoumPermission('link-noums', isOwner) &&
          isNoumLinked && {
            value: 'unlinked_noum',
            key: 'Unlink',
            type: 'value',
            label: t('noumena.link_noums.unlink'),
            intent: 'danger',
            icon: (
              <Icon
                name="unlink_m"
                size={24}
                color="--text-tablecell-header-danger-primary-highlighted"
              />
            ),
          },
        hasAccessToManageMembersView && {
          value: 'manage_members',
          key: 'Manage Members',
          type: 'value',
          label: t('noumena.chamber_edit.manage_members.title'),
          icon: (
            <Icon
              name="groups_m"
              size={24}
              color="--text-tablecell-header-neutral-highlighted"
            />
          ),
        },
        !!invoiceTool && {
          value: 'new_invoice',
          key: 'new_invoice',
          type: 'value',
          label: 'New Invoice',
          icon: (
            <Icon
              name="plus_m"
              size={24}
              color="--text-tablecell-header-neutral-highlighted"
            />
          ),
        },
        !!contractTool && {
          value: 'new_contract',
          key: 'new_contract',
          type: 'value',
          label: 'New Contract',
          icon: (
            <Icon
              name="plus_m"
              size={24}
              color="--text-tablecell-header-neutral-highlighted"
            />
          ),
        },
        !!contractTool && {
          value: 'new_sow',
          key: 'new_sow',
          type: 'value',
          label: 'New Statement of Work (SOW)',
          icon: (
            <Icon
              name="plus_m"
              size={24}
              color="--text-tablecell-header-neutral-highlighted"
            />
          ),
        },
      ]),
    [
      contractTool,
      hasAccessToManageMembersView,
      hasNoumPermission,
      invoiceTool,
      isNoumLinked,
      isOwner,
    ],
  );

  if (SpaceUtils.isArchived(space)) {
    return (
      <>
        <RowContainer data-testid="archived-noum-actions">
          <NoumActionButton
            disabled={editDisabled}
            size="full"
            secondary
            onClick={() => setOpen(true)}
          >
            {t('noumena.chamber.unarchive_button')}
          </NoumActionButton>
        </RowContainer>
        {open && (
          <ChamberUnarchiveModal
            isOpen={open}
            handleClose={handleClose}
            onUnarchive={handleUnarchive}
            spaceId={space?._id}
          />
        )}
      </>
    );
  }

  return (
    <>
      <RowContainer data-testid="edit-noum-actions">
        <NoumActionButton
          disabled={!isUserActive}
          size="full"
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
        </NoumActionButton>
        {ellipsisMenuOptions.length > 0 && (
          <div className="ellipsis-menu">
            <EllipsisMenu
              menuOptions={ellipsisMenuOptions}
              size="full"
              onClick={handleSelectDropdown}
              containerWidth="147"
              loadingLinked={loadingLinked}
            />
          </div>
        )}
      </RowContainer>
      <LinkNoum
        goToNoumLink={handleGoToLinkNoum}
        isOpen={isLinkNoumOpen}
        handleClose={toggleLinkNoumOpen}
      />
      <HandleUnlinkNoum
        noumLink={getNoumLink?.link as NoumLink}
        ref={handleUnlinkNoumRef}
        space={space}
        refetch={refetch}
      />
    </>
  );
};
