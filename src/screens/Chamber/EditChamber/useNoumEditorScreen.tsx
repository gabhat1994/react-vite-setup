import {
  Noum_Fee_Operation_Type,
  SpaceStatusEnum,
} from '@/apollo/generated/types';
import {
  useMarkSpaceAsEditedMutation,
  useRemoveNoumFromSubscriptionMutation,
  useUnlinkNoumsMutation,
} from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import ROUTES from '@/constants/routes';
import { useToast } from '@/hooks/toast';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { DefaultFonts } from '@/screens/Chamber/components/ThemePanel/constants';
import { type TNoumEditModal } from '@/screens/Chamber/components/modals/NoumEditOptionsModal/types';
import { SpaceUtils } from '@/utils/space';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useDiscardSpaceChangeHelper } from '@/features/noums/hooks/spaceQuery';
import { useError, useLaunchDarkly } from '@/hooks';
import { useChangeProjectChamberStatusHelper } from '@/features/noums/hooks/noums';

type ModalType =
  | 'edit-mode-guide'
  | 'archive'
  | 'invites'
  | 'permissions'
  | 'noum-ads'
  | 'broadcast'
  | 'new-broadcast'
  | 'theme'
  | 'noumena-copilot'
  | 'restore-noum'
  | 'visibility-settings'
  | 'custom-preview';

export function useNoumEditorScreen() {
  const { space, refetchSpaceById, isOwner, loading } = useNoumContext();
  const { flags } = useLaunchDarkly();
  const subscriptionIdForNoum =
    space?.noumTransactionFee?.subscription_id?.subscription_id;

  const modalManager = useModalManager<ModalType>();
  const { openModal, closeModal } = modalManager;

  const navigate = useNavigate();
  const [isVisited, setIsVisited] = useState<boolean>(false);
  const [isOnLoad, setIsOnLoad] = useState(false);

  const { addToast } = useToast();
  const { logError } = useError();
  const { setSelectedThemeId, isSettingTheme, setSelectedFonts } =
    useThemeContext();

  const location = useLocation();

  const [markSpaceAsEdited, { loading: markSpaceAsEditedLoading }] =
    useMarkSpaceAsEditedMutation();

  const isArchived = SpaceUtils.isArchived(space);
  const isMasterNoum = SpaceUtils.isMasterNoum(space);

  const { hasNoumPermission } = useNoumAuthorization();
  const hasEditNoumPermission =
    hasNoumPermission('edit-noum', isOwner) || (isMasterNoum && isOwner);

  useEffect(() => {
    const isPostPage = location?.pathname.indexOf('/post') > -1;
    if ((!isPostPage && space && !hasEditNoumPermission) || isArchived) {
      const route = space?._id
        ? `/noum/${space?._id}${location.search}${location.hash}`
        : ROUTES.NOUMS;
      if (route !== `${location.pathname}${location.search}${location.hash}`)
        navigate(route, { replace: true });
    }
  }, [
    isOwner,
    isArchived,
    navigate,
    space,
    location.pathname,
    location.search,
    location.hash,
    hasEditNoumPermission,
  ]);

  useEffect(() => {
    if (space && space.theme?._id) {
      setSelectedThemeId(SpaceUtils.getAppliedTheme(space));
    } else {
      setSelectedThemeId(undefined);
    }
    const spaceFonts = SpaceUtils.getAppliedFont(space);

    if (
      spaceFonts &&
      typeof spaceFonts === 'object' &&
      Object.keys(spaceFonts).length > 0
    ) {
      setSelectedFonts(spaceFonts);
    } else {
      setSelectedFonts(DefaultFonts);
    }
  }, [setSelectedFonts, setSelectedThemeId, space]);

  const hasUnsaved = useMemo(
    () =>
      SpaceUtils.hasUnsavedElement(space) ||
      SpaceUtils.hasUnsavedSetting(space),
    [space],
  );

  const { discardSpaceChangeHelper } = useDiscardSpaceChangeHelper();

  const [archiveAndRemoveNoum, { loading: archivingAndRemoving }] =
    useRemoveNoumFromSubscriptionMutation({
      onError: (error) => {
        logError(error, 'useRemoveNoumFromSubscription-edit-chamber');
      },
    });

  const { changeProjectChamberStatusHelper, loading: archivingNoum } =
    useChangeProjectChamberStatusHelper();

  const [unlinkNoumsMutation, { loading: unlinkArchivingLoader }] =
    useUnlinkNoumsMutation({
      onError: (err) => {
        addToast('error', 'icon', err.message);
      },
      onCompleted: () => {
        refetchSpaceById();
        addToast('success', 'icon', t('noumena.link_noums.unlink_alert'));
      },
    });

  const sideBarOptionSelected = (
    value: TNoumEditModal | DropdownValueType<string>,
  ) => {
    switch (value) {
      case 'noumena_copilot':
        openModal('noumena-copilot');
        break;
      case 'customize':
        openModal('theme');
        break;
      case 'manage_members': {
        if (!space?._id) return;
        navigate(
          generatePath(ROUTES.EDIT_NOUM_MANAGE_MEMBERS, { id: space?._id }),
        );
        break;
      }
      case 'archive':
        openModal('archive');
        break;
      case 'invites':
        openModal('invites');
        break;
      case 'permission':
        openModal('permissions');
        break;
      case 'broadcasting':
        openModal('broadcast');
        break;
      case 'custom_preview':
        if (hasUnsaved) {
          openModal('custom-preview');
        } else {
          if (!space?._id) return;
          navigate(
            generatePath(ROUTES.NOUM_CUSTOM_PREVIEW, { id: space?._id }),
          );
        }
        break;
      case 'noum_ads':
        openModal('noum-ads');
        break;
      case 'restore_last_published_version':
        openModal('restore-noum');
        break;
      case 'visibility_settings':
        openModal('visibility-settings');
        break;
      default:
        break;
    }
  };

  const onArchive = useCallback(async () => {
    closeModal();
    if (space?._id) {
      if (flags.paymentSubscriptions) {
        await archiveAndRemoveNoum({
          variables: {
            noumInput: {
              chamber_id: space?._id,
              subscription_id: subscriptionIdForNoum,
              operation_type: Noum_Fee_Operation_Type.Archived,
            },
          },
        });

        // TODO : remove below mutation when BE fixes SNS events. This is to sync the status across microservices
        await changeProjectChamberStatusHelper(
          space._id!,
          SpaceStatusEnum.Archived,
        );
        navigate(-1);
        return;
      }

      await changeProjectChamberStatusHelper(
        space._id!,
        SpaceStatusEnum.Archived,
      );
      navigate(-1);
    }
  }, [
    closeModal,
    space,
    changeProjectChamberStatusHelper,
    flags,
    archiveAndRemoveNoum,
    subscriptionIdForNoum,
    navigate,
  ]);

  const unlinkOnArchive = useCallback(async () => {
    closeModal();
    if (space?.link?._id && space._id) {
      await unlinkNoumsMutation({
        variables: {
          noumLinkId: space.link?._id,
          linkedNoumIDs: space._id,
        },
      });
    }
  }, [closeModal, space?._id, space?.link?._id, unlinkNoumsMutation]);

  const handleMarkAsVisited = useCallback(async () => {
    if (!space?._id) return;

    await markSpaceAsEdited({
      variables: { spaceId: space?._id },
      onCompleted: () => {
        setIsVisited(true);
        closeModal();
      },
    });
  }, [space?._id, markSpaceAsEdited, closeModal]);

  useEffect(() => {
    const discardValues = async () => {
      if (isOnLoad && !loading && !isArchived && hasEditNoumPermission) {
        setIsOnLoad(false);
      }
    };
    discardValues();
  }, [
    discardSpaceChangeHelper,
    hasUnsaved,
    isOnLoad,
    loading,
    isArchived,
    hasEditNoumPermission,
    space?._id,
  ]);

  useEffect(() => {
    if (space && (!space.elements || space.elements.length === 0)) {
      openModal('edit-mode-guide');
    }

    setIsVisited(
      !(
        space &&
        (!space.elements || space.elements.length === 0) &&
        !space.updatedAt
      ),
    );
  }, [openModal, space]);

  useEffect(() => {
    if (space?._id) {
      setIsOnLoad(true);
    }
  }, [space?._id]);

  const archiving = archivingAndRemoving || archivingNoum;

  return {
    isOnLoad,
    archiving,
    sideBarOptionSelected,
    onArchive,
    isVisited,
    handleMarkAsVisited,
    unlinkOnArchive,
    unlinkArchivingLoader,
    isSettingTheme,
    markSpaceAsEditedLoading,
    refetchSpaceById,
    modalManager,
  };
}
