import {
  forwardRef,
  type Ref,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { type Transition } from 'history';
import { generatePath, useParams } from 'react-router-dom';
import useBlocker from '@/hooks/useBlocker';
import { useAuth } from '@/features/auth/contexts';
import { DisablePublishOrDraftContext } from '@/providers';
import { NoumLayoutStatus, SpaceStatusEnum } from '@/apollo/generated/types';
import {
  StyledButton,
  LeftActionButtonsWrapper,
  RightActionButtonsWrapper,
  StatusWrapper,
  StatusLabel,
  EditChangeStatusText,
  LastUpdateLabel,
} from '@/components/Header/styles';
import { type DropdownValueType } from '@/components/Dropdown';
import { UndoRedo } from '@/features/noums/noumEditor/components';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { SpaceUtils } from '@/utils/space';
import { UserUtil } from '@/utils/user';
import { getTimeStampForDisplaying } from '@/utils/getTimeStampForDisplaying';
import ROUTES from '@/constants/routes';
import { useNavigateBack } from '@/hooks/navigation';
import { useEditChamberState } from './provider';
import { NoumEditOptionsNew } from '../components/RightPanel/elements/NoumEditOptions/NoumEditOptionsNew';
import { ChamberPublishVisibilityInfo } from '../components/modals/ChamberPublishVisibilityInfo';
import { ChamberRestoreModal } from '../components/modals/ChamberActionModal/Restore/ChamberRestoreModal';
import { ChamberDiscardChange } from '../components/modals/ChamberDiscardChange';
import ChamberSaveAsDraft from '../components/modals/ChamberSaveAsDraft';
import ChamberPublish from '../components/modals/ChamberPublish';
import { type EditHeaderProps } from './types';
import { type TNoumEditModal } from '../components/modals/NoumEditOptionsModal/types';
import { EditHeaderWrapperNew } from './styles';
import { useNoumContext } from '../ViewChamber/ChamberProvider';

interface EditHeaderNewProps
  extends Omit<EditHeaderProps, 'space' | 'spaceId'> {
  onSelectEditOption?: (v: TNoumEditModal | DropdownValueType<string>) => void;
}

export const EditHeaderNew = forwardRef(
  (
    {
      emptyElementErrorMessage,
      onChamberRestore,
      onSelectEditOption,
    }: EditHeaderNewProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { t } = useTranslation();
    const { id = '' } = useParams();
    const { disableUpdate, setdisabledUpdateElement } = useContext(
      DisablePublishOrDraftContext,
    );
    const { hasNoumPermission } = useNoumAuthorization();
    const [isOpenPublishModal, togglePublishModal] = useState<boolean>(false);
    const [isOpenVisibilityInfoModal, toggleVisibilityInfoModal] =
      useState<boolean>(false);
    const [isOpenSaDModal, toggleSaDModal] = useState<boolean>(false);
    const [isOpenExitModal, toggleExitModal] = useState<boolean>(false);
    const [isRestored, setIsRestored] = useState(false);
    const [isOpenRestoreModal, setIsOpenRestoreModal] = useState(false);
    const { masterId: mainSpaceId, isPending: isUserPending } = useAuth();
    const { space, isOwner, refetchSpaceByConfig, refetchSpaceById } =
      useNoumContext();
    const { sectionStatus, setSectionStatus } = useEditChamberState();
    const hasNoumPublishPermission = SpaceUtils.isProjectNoum(space)
      ? hasNoumPermission('publish-noum', true)
      : isOwner;

    const isNoumPublishedAtAll = !(
      UserUtil.isActive(space?.uid) &&
      space?.status === SpaceStatusEnum.Published
    );

    // TODO: Check if this is valid.
    // const hasUnsavedPermissions = SpaceUtils.hasUnsavedPermission(connections);

    const hasUnsaved = useMemo(() => {
      const hasUnsavedNoumLayout =
        space?.layout?.status === NoumLayoutStatus.Unsaved ||
        sectionStatus === NoumLayoutStatus.Unsaved;

      const hasSpaceAnyUnsaved =
        SpaceUtils.hasUnsavedElement(space) ||
        SpaceUtils.hasUnsavedSetting(space);

      return hasUnsavedNoumLayout || hasSpaceAnyUnsaved;
    }, [sectionStatus, space]);

    const hasDraft = useMemo(() => {
      const hasDraftNoumLayout =
        space?.layout?.status === NoumLayoutStatus.Draft ||
        sectionStatus === NoumLayoutStatus.Draft;
      const hasSpaceAnyDrafts =
        SpaceUtils.hasDraftElement(space) || SpaceUtils.hasDraftSetting(space);

      return hasDraftNoumLayout || hasSpaceAnyDrafts;
    }, [sectionStatus, space]);
    const hasPublished = useMemo(() => {
      const hasPublishedNoumLayout =
        space?.layout?.status === NoumLayoutStatus.Published ||
        sectionStatus === NoumLayoutStatus.Published;

      const hasSpaceAnyPublished = SpaceUtils.hasPublishedElement(space);

      return hasPublishedNoumLayout || hasSpaceAnyPublished;
    }, [sectionStatus, space]);

    const isMasterNoum = SpaceUtils.isMasterNoum(space);
    const lastChangedDate = getTimeStampForDisplaying(space?.updatedAt, true);
    const publishedDate = getTimeStampForDisplaying(space?.publishedAt, true);

    const handleBlockNavigation = ({ retry }: Transition) => {
      if (hasUnsaved) {
        toggleExitModal(true);
      } else {
        retry();
      }
    };

    useBlocker(handleBlockNavigation, hasUnsaved);

    const navigateBack = useNavigateBack();
    const onLeaveEditPage = useCallback(
      () =>
        navigateBack(-1, {
          fallback: isMasterNoum
            ? ROUTES.HOME_NOUM
            : generatePath(ROUTES.NOUM, { id }),
        }),
      [id, isMasterNoum, navigateBack],
    );

    const handleClickPublish = async () => {
      setdisabledUpdateElement(true);
      togglePublishModal(true);
    };

    const handleClickDraft = () => {
      setdisabledUpdateElement(true);
      toggleSaDModal(true);
      setSectionStatus?.(undefined);
    };

    const handleClickExit = useCallback(() => {
      if (hasUnsaved) {
        toggleExitModal(true);
      } else {
        onLeaveEditPage();
      }
    }, [hasUnsaved, onLeaveEditPage]);

    const handleClosePublishModal = useCallback(
      (isSuccess?: boolean) => {
        togglePublishModal(false);
        refetchSpaceById();
        refetchSpaceByConfig();
        if (isSuccess) {
          onLeaveEditPage();
        }
      },
      [refetchSpaceById, refetchSpaceByConfig, onLeaveEditPage],
    );

    const handleCloseVisibilityInfoModal = () => {
      toggleVisibilityInfoModal(false);
      togglePublishModal(true);
    };

    const handleCloseSaDModal = () => {
      refetchSpaceById?.();
      toggleSaDModal(false);
    };

    const handleClickRestore = () => {
      setIsOpenRestoreModal?.(true);
    };

    const RenderStatus = ({ className: name = 'xs-hidden' }) => (
      <StatusWrapper className={`xs-${name}`} aria-label="noum_status">
        {hasUnsaved || hasDraft || isRestored ? (
          <>
            <StatusLabel
              data-testid={`lastChangedLabel_xs_${name}`}
              labelSize="small"
              aria-label="noum-status-label"
            >
              {t('noumena.header.last_changed.text')}: {lastChangedDate}
              {hasUnsaved || (hasUnsaved && hasDraft) ? (
                <EditChangeStatusText
                  colorToken="--text-top-nav-danger-primary-default"
                  aria-label="noum_status_unsaved"
                >
                  {t('noumena.header.unsaved_changes.text')}
                </EditChangeStatusText>
              ) : hasDraft && !hasUnsaved ? (
                <EditChangeStatusText
                  colorToken="--text-top-nav-neutral-default"
                  aria-label="noum_status_draft"
                >
                  {t('noumena.header.drafted_changes.text')}
                </EditChangeStatusText>
              ) : (
                <></>
              )}
            </StatusLabel>
            {hasPublished && (hasUnsaved || hasDraft) && (
              <LastUpdateLabel
                data-testid={`publishedDateLabel_xs_${name}`}
                onClick={handleClickRestore}
                aria-label="noum-status-last-restored"
              >
                {t('noumena.header.restore_last_saved.text')} ({publishedDate}
                )
                <br />
              </LastUpdateLabel>
            )}
          </>
        ) : (
          (hasPublished || isRestored) && (
            <StatusLabel
              labelSize="small"
              data-testid={`lastPublishedLabel_xs_${name}`}
              className={`xs-${name}`}
              aria-label="noum_status_last_published"
            >
              {t('noumena.header.last_published.text')}: {publishedDate}
              <EditChangeStatusText
                colorToken="--text-top-nav-neutral-default"
                aria-label="noum_status_changes_status"
              >
                {t('noumena.header.all_changes_saved.text')}
              </EditChangeStatusText>
            </StatusLabel>
          )
        )}
      </StatusWrapper>
    );

    if (!space?._id) {
      return null;
    }

    return (
      <EditHeaderWrapperNew
        ref={ref}
        data-testid="Edit-Header"
        aria-label="noum-edit-mode-header"
      >
        <LeftActionButtonsWrapper
          gap={34}
          align="center"
          aria-label="noum-edit-mode-left-actions-wrapper"
        >
          <StyledButton
            data-testid="Header-SaveAsADraft"
            secondary={hasUnsaved}
            intent="negative"
            tertiary={!hasUnsaved}
            size="small"
            onClick={handleClickExit}
            aria-label="noum_edit_mode_left_action_button"
          >
            {!hasUnsaved
              ? t('noumena._new_header.done_button.text')
              : t('noumena._new_header.cancel_button.text')}
          </StyledButton>
          <UndoRedo />
        </LeftActionButtonsWrapper>
        {isMasterNoum ? (
          <RenderStatus className="hidden" />
        ) : (
          <NoumEditOptionsNew
            onSelect={onSelectEditOption}
            isNoumPublishedAtAll={isNoumPublishedAtAll}
            isShowRestore={!!publishedDate && (hasUnsaved || hasDraft)}
          />
        )}
        <RightActionButtonsWrapper aria-label="noum-edit-mode-right-actions-wrapper">
          <StyledButton
            data-testid="Header-SaveAsADraft"
            secondary
            size="small"
            onClick={handleClickDraft}
            disabled={!hasUnsaved || disableUpdate}
            aria-label="save_as_draft_button"
          >
            {t('noumena._new_header.draft_button.text')}
          </StyledButton>
          {hasNoumPublishPermission && (
            <StyledButton
              data-testid="Header-Publish-Button"
              primary
              intent="positive"
              size="small"
              onClick={handleClickPublish}
              aria-label="publish_button"
              disabled={
                (!hasUnsaved &&
                  !hasDraft &&
                  // !hasUnsavedPermissions &&
                  !isRestored) ||
                disableUpdate ||
                isUserPending
              }
            >
              {t('noumena.header.publish_button.text')}
            </StyledButton>
          )}
        </RightActionButtonsWrapper>

        {hasNoumPublishPermission && (
          <ChamberPublish
            spaceId={space?._id}
            space={space}
            isOpen={isOpenPublishModal}
            handleClose={handleClosePublishModal}
            handleClickInfo={() => {
              toggleVisibilityInfoModal(true);
            }}
            emptyElementErrorMessage={emptyElementErrorMessage}
            isHomeNoum={space?._id === mainSpaceId}
            aria-label="publish_noum_layout_modal"
          />
        )}
        <ChamberPublishVisibilityInfo
          isOpen={isOpenVisibilityInfoModal}
          handleClose={handleCloseVisibilityInfoModal}
        />
        <ChamberSaveAsDraft
          spaceId={space?._id}
          space={space}
          isOpen={isOpenSaDModal}
          handleClose={handleCloseSaDModal}
          emptyElementErrorMessage={emptyElementErrorMessage}
          aria-label="save_as_draft_modal"
        />
        <ChamberDiscardChange
          spaceId={space?._id}
          space={space}
          isOpen={isOpenExitModal}
          handleSuccess={onLeaveEditPage}
          handleClose={() => toggleExitModal(false)}
          aria-label="discard_changes_modal"
        />
        <ChamberRestoreModal
          spaceId={space?._id}
          isOpen={isOpenRestoreModal}
          version={publishedDate ?? ''}
          aria-label="noum_restore_layout_modal"
          cancelCallback={() => setIsOpenRestoreModal?.(false)}
          sucessCallback={() => {
            setIsOpenRestoreModal(false);
            setIsRestored(true);
            onChamberRestore?.();
          }}
          emptyElementErrorMessage={emptyElementErrorMessage}
        />
      </EditHeaderWrapperNew>
    );
  },
);
