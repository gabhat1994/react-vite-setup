import { Header } from '@/components/Header';
import { Spinner } from '@/components/Spinner';
import routes from '@/constants/routes';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  useRemoveSectionHelper,
  useRemoveToolFromNoumLayoutHelper,
} from '@/features/noums/hooks/spaceQuery';
import { NoumLayoutDeleteModal } from '@/features/noums/noumEditor/components';
import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { Stack } from '@/layout';
import { NoumViewLayout } from '@/layout/NoumLayout';
import { type LinkedNoumOptionType } from '@/screens/LinkNoum/components/types';
import { ElementUtils } from '@/utils/element';
import { cleanList } from '@/utils/list';
import { SpaceUtils } from '@/utils/space';
import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useNoumContext } from '../ViewChamber/ChamberProvider';
import { NoumSidePanel } from '../components/NoumSidePanel';
import { NoumenaCopilot } from '../components/NoumenaCopilot';
import { type SectionToolProps } from '../components/SectionElementRearrange/types';
import { ThemePanel } from '../components/ThemePanel';
import { ChamberArchiveModal } from '../components/modals/ChamberArchive';
import { CreateBroadcastModal } from '../components/modals/ChamberBroadcast/CreateBroadcast';
import { ViewBroadcastModal } from '../components/modals/ChamberBroadcast/ViewBroadcast';
import ChamberEditMode from '../components/modals/ChamberEditMode';
import { ChamberPermissionModal } from '../components/modals/ChamberPermission';
import { ChamberVisibilityInviteModal } from '../components/modals/ChamberVisibilityInvite';
import UnlinkOnArchiveNoumModal from '../components/modals/LinkNoum/UnlinkOnArchiveNoumModal';
import { NoumAdsModal } from '../components/modals/NoumAds';
import { VisibilitySettingsModal } from '../components/modals/VisibilitySettingsModal';
import { EditChamberHeader } from './EditChamberHeader';
import { EditHeaderNew } from './EditHeaderNew';
import { EditNoumBody } from './EditNoumBody';
import { EditNoumRoutes } from './EditNoumRoutes';
import errorMessage from './constants';
import { EditChamberProvider } from './provider';
import { AppStyled } from './styles';
import { useNoumEditorScreen } from './useNoumEditorScreen';
import { ChamberDiscardChange } from '../components/modals/ChamberDiscardChange';

interface NoumEditorProps {
  id: string;
}

function NoumEditor({ id }: NoumEditorProps) {
  const { space, loading, refetchSpaceById, isOwner } = useNoumContext();

  const {
    isOnLoad,
    archiving,
    onArchive,
    sideBarOptionSelected,
    isVisited,
    handleMarkAsVisited,
    unlinkOnArchive,
    unlinkArchivingLoader,
    isSettingTheme,
    markSpaceAsEditedLoading,
    modalManager: { modalType, openModal, closeModal },
  } = useNoumEditorScreen();

  const [emptyElementErrorMessage, setEmptyElement] = useState<string>('');
  const [noumSidePanelId, setNoumSidePanelId] = useState<string | undefined>();
  const [noumSectionToolType, setNoumSectionToolType] =
    useState<SectionToolProps>();
  const [isDeleteModal, setisDeleteModal] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const navigate = useNavigate();
  const { removeSectionHelper, loading: removeSectionLoading } =
    useRemoveSectionHelper();
  const { removeToolFromNoumLayoutHelper, loading: removeToolLoading } =
    useRemoveToolFromNoumLayoutHelper();
  useEffect(() => {
    setEmptyElement('');
    const invalidElements = ElementUtils.isInvalidTool(
      space?.layout?.sections!,
    );
    if (invalidElements?.length) {
      setEmptyElement(errorMessage(invalidElements?.[0]?.elementType));
    }
  }, [space]);

  const { hasNoumPermission } = useNoumAuthorization();
  const hasEditNoumPermission =
    hasNoumPermission('edit-noum', isOwner) ||
    (SpaceUtils.isMasterNoum(space) && isOwner);

  const links = space?.link;
  const linkedNoumsCount = links?.linkedNoumsCount ?? 0;
  const linkedNoums = useMemo(
    () => cleanList<LinkedNoumOptionType>(links?.linkedNoums),
    [links?.linkedNoums],
  );

  const deleteHandler = async () => {
    if (!deletedId || deletedId === '') return;
    let isSuccess = false;
    if (space?._id) {
      if (noumSectionToolType === SectionToolType.SECTION_TYPE) {
        const section = space.layout?.sections.find(
          (sectionItem) => sectionItem._id === deletedId,
        );
        if (!section) return;
        isSuccess = await removeSectionHelper(section, space._id);
      } else if (noumSectionToolType === SectionToolType.TOOL_TYPE) {
        isSuccess = await removeToolFromNoumLayoutHelper(deletedId, space._id);
      } else return;
    }
    if (isSuccess) {
      setisDeleteModal(false);
    }
  };

  if (loading && !space) {
    return <Spinner />;
  }

  return (
    <EditChamberProvider
      setisDeleteModal={setisDeleteModal}
      setNoumSectionToolType={setNoumSectionToolType}
      setNoumSidePanelId={setNoumSidePanelId}
      noumSidePanelId={noumSidePanelId}
      refetchSpaceById={refetchSpaceById}
      setDeletedId={setDeletedId}
    >
      {space && hasEditNoumPermission && !SpaceUtils.isArchived(space) && (
        <AppStyled
          data-testid="EDIT-CHAMBER"
          className="App"
          applyMinHeight={false}
          aria-label="noum-layout"
        >
          <Header
            isBorderRadius={false}
            style={{ padding: `0px` }}
            aria-label="noum-header"
          >
            <EditHeaderNew
              emptyElementErrorMessage={emptyElementErrorMessage}
              onChamberRestore={refetchSpaceById}
              onSelectEditOption={sideBarOptionSelected}
            />
          </Header>

          <NoumViewLayout
            isEditing
            header={<EditChamberHeader />}
            hasThemePanel={modalType === 'theme' || !!noumSidePanelId}
          >
            {(loading && !space) || isOnLoad ? (
              <Stack>
                <Spinner />
              </Stack>
            ) : (
              <EditNoumBody
                setNoumSidePanelId={setNoumSidePanelId}
                noumSidePanelId={noumSidePanelId}
                setNoumSidePanelType={setNoumSectionToolType}
              />
            )}
            <ThemePanel
              noumId={id}
              open={modalType === 'theme'}
              onClose={closeModal}
            />
            <NoumSidePanel
              noumSidePanelType={noumSectionToolType!}
              open={!!noumSidePanelId}
              onClose={() => setNoumSidePanelId(undefined)}
              noumSidePanelId={noumSidePanelId!}
            />
          </NoumViewLayout>

          {SpaceUtils.isProjectNoum(space) && (
            <ChamberEditMode
              isOpen={modalType === 'edit-mode-guide' && !isVisited}
              handleClose={closeModal}
              handleMarkAsVisited={handleMarkAsVisited}
              markSpaceAsEditedLoading={markSpaceAsEditedLoading}
            />
          )}
          {space.link ? (
            <UnlinkOnArchiveNoumModal
              isOpen={modalType === 'archive'}
              handleClose={closeModal}
              handleUnlinking={unlinkOnArchive}
              loading={unlinkArchivingLoader}
            />
          ) : (
            space?.name && (
              <ChamberArchiveModal
                noumName={space?.name}
                isOpen={modalType === 'archive'}
                handleClose={closeModal}
                onArchive={onArchive}
                loading={archiving}
              />
            )
          )}
          {space?.projectType && modalType === 'invites' && (
            <ChamberVisibilityInviteModal
              spaceId={id}
              linkedNoums={linkedNoums}
              visibility={space?.projectType}
              isOpen={true}
              isSEOEnabled={!!space?.enableAds}
              handleClose={closeModal}
            />
          )}
          {modalType === 'permissions' && (
            <ChamberPermissionModal
              spaceId={id}
              isOpen={true}
              onClose={closeModal}
              onInvite={() => openModal('invites')}
              linkedCount={linkedNoumsCount}
            />
          )}
          {modalType === 'noum-ads' && (
            <NoumAdsModal
              isOpen={true}
              onClose={closeModal}
              refetchSpaceById={refetchSpaceById}
            />
          )}
          {modalType === 'broadcast' && (
            <ViewBroadcastModal
              spaceId={id}
              isOpen={true}
              onClose={closeModal}
              onCampaign={() => openModal('new-broadcast')}
            />
          )}
          {modalType === 'new-broadcast' && (
            <CreateBroadcastModal
              noumType={space.projectType}
              noumId={id}
              isOpen={true}
              onClose={() => {
                openModal('broadcast');
              }}
            />
          )}
          <NoumLayoutDeleteModal
            isOpen={isDeleteModal}
            onClose={() => setisDeleteModal(false)}
            type={noumSectionToolType!}
            onConfirm={deleteHandler}
            loading={removeToolLoading || removeSectionLoading}
          />
          {modalType === 'noumena-copilot' && (
            <NoumenaCopilot noumId={id} open={true} onClose={closeModal} />
          )}
          {modalType === 'visibility-settings' && (
            <VisibilitySettingsModal
              noumId={id}
              isOpen={true}
              handleClose={closeModal}
              space={space}
            />
          )}
          {modalType === 'custom-preview' && (
            <ChamberDiscardChange
              spaceId={id}
              space={space}
              isOpen={true}
              handleSuccess={() =>
                navigate(
                  generatePath(routes.NOUM_CUSTOM_PREVIEW, {
                    id,
                  }),
                )
              }
              handleClose={closeModal}
              aria-label="discard_changes_modal"
            />
          )}
          <EditNoumRoutes noumId={id} />
        </AppStyled>
      )}
      {isSettingTheme && <Spinner />}
    </EditChamberProvider>
  );
}

export default NoumEditor;
