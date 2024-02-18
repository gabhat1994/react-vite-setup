import { Header } from '@/components/Header';
import { TSpan } from '@/components/Typography';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import {
  useLinkNoums,
  useSelectNoumsToLink,
} from '@/features/noums/hooks/noums';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import useDebounce from '@/hooks/useDebounce';
import { MainHeader } from '@/layout/MainHeader';
import { NoumProvider } from '@/providers';
import { UserUtil } from '@/utils/user';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import LinkNoumActionFooter from './components/LinkNoumActionFooter';
import { NoumPreview } from './components/NoumPreview';
import ResultContainer from './components/ResultContainer';
import { SelectNoumOptionsToLink } from './components/SelectNoumOptionsToLink';
import { LinkNoumCompletedModal } from './components/modal/LinkCompletedModal';
import { LinkConfirmationModal } from './components/modal/LinkConfirmationModal';
import { LinkExistingNoumModal } from './components/modal/LinkExistingNoumModal';
import { LinkVisibilityModal } from './components/modal/LinkVisibilityModal';
import { visibilityLevelReverse } from './data';
import {
  filterOutSubNoums,
  getUniqueItems,
  reGroupNoums,
  visibilityDialogFlag,
} from './helper';
import {
  ActionWrapper,
  Container,
  LinkNoumDescription,
  MainContainer,
  NoumMainContainer,
  TitleWrapper,
} from './styles';
import { type OptionType } from './types';

const LinkNoums = () => {
  const { user } = useAuth();
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const navigate = useNavigate();
  const { isDesktop, isMobile } = useBreakpoints();
  const [isConfirmScreen, setConfirmScreen] = useState(false);

  const {
    noums,
    fetchMore,
    infiniteState,
    getDefaultNoum,
    linkNoumsMutation,
    preCalculateNoumLinkData,
    onSearchChange,
    search,
    linkedNoumsCalculatedData,
    linkedNoumsCalculatedLoading,
    mutationLoading,
    getDefaultNoumLink,
    loading,
  } = useLinkNoums(true);

  const {
    selectedOption,
    existingLinkedNoum,
    optionState,
    setOptionState,
    defaultOptionState,
    previewOptions,
    subNoums,
    parentNoumsLength,
    checkedOptions,
    currentVisibilityLevel,
    updateOption,
    verifyAndReturnInGlobalChecked,
    updateOptionState,
    showCompletedModal,
    toggleShowCompletedModal,
    showConfirmationModal,
    setShowConfirmationModal,
    showLinkExistingNoumModal,
    toggleShowVisibilityModal,
    toggleShowLinkExistingNoumModal,
    showVisibilityModal,
    visibilityLevelSettings,
    setWarning,
    acceptedWarning,
    pageLoader,
  } = useSelectNoumsToLink({
    getDefaultNoumLink,
    getDefaultNoum,
  });

  const followersCount =
    linkedNoumsCalculatedData?.preCalculateNoumLinkData?.followersCount ?? 0;

  const connectionsCount = elementPermission
    ? linkedNoumsCalculatedData?.preCalculateNoumLinkData?.membersCount ?? 0
    : linkedNoumsCalculatedData?.preCalculateNoumLinkData?.connectionsCount ??
      0;

  useEffect(() => {
    const groupedNoums = reGroupNoums(
      getUniqueItems([...noums]),
      defaultOptionState,
      verifyAndReturnInGlobalChecked,
    );

    const newNoums = filterOutSubNoums(groupedNoums, subNoums);
    setOptionState(() => getUniqueItems(newNoums));
  }, [
    noums,
    defaultOptionState,
    verifyAndReturnInGlobalChecked,
    subNoums,
    setOptionState,
  ]);

  const handleGoBack = () => {
    const url = window.location.href;
    if (url.includes('preselect')) {
      const searchParams = new URLSearchParams(window.location.search);
      const spaceId = searchParams.get('preselect');
      navigate(`/noum/${spaceId}`);
    } else {
      navigate(ROUTES.NOUMS);
    }
  };

  const debouncedOptions = useDebounce(previewOptions, 1000);

  useEffect(() => {
    if (debouncedOptions.length >= 2) {
      preCalculateNoumLinkData({
        variables: {
          linkedNoumIDs: debouncedOptions.map((option) => option.spaceId),
        },
      });
    }
  }, [debouncedOptions, preCalculateNoumLinkData]);

  useEffect(() => {
    setConfirmScreen(false);
  }, [checkedOptions]);

  const handleAcceptVisibilitySettings = useCallback(() => {
    toggleShowVisibilityModal(false);
    setWarning(true);
    if (isDesktop) {
      setShowConfirmationModal(true);
    } else {
      setConfirmScreen(true);
    }
  }, [
    isDesktop,
    setShowConfirmationModal,
    setWarning,
    toggleShowVisibilityModal,
  ]);

  const handleAcceptExtraLinking = () => {
    updateOption(selectedOption);
    toggleShowLinkExistingNoumModal(false);
  };

  const handleLinkNoums = useCallback(() => {
    const showVisibilityDialog = visibilityDialogFlag(
      visibilityLevelSettings,
      acceptedWarning,
    );
    if (showVisibilityDialog) {
      toggleShowVisibilityModal(!showVisibilityModal);
    } else {
      handleAcceptVisibilitySettings();
    }
  }, [
    acceptedWarning,
    handleAcceptVisibilitySettings,
    showVisibilityModal,
    toggleShowVisibilityModal,
    visibilityLevelSettings,
  ]);

  const handleConfirmLinkNoums = useCallback(async () => {
    await linkNoumsMutation({
      variables: {
        linkedNoumIDs: previewOptions.map((option) => option.spaceId),
      },
      onCompleted: (response) => {
        if (response.linkNoums?.status) {
          toggleShowCompletedModal();
          setShowConfirmationModal(false);
          setConfirmScreen(false);
        }
      },
    });
  }, [
    linkNoumsMutation,
    previewOptions,
    toggleShowCompletedModal,
    setShowConfirmationModal,
  ]);

  const enablePreview =
    (isConfirmScreen || isDesktop) && previewOptions.length > 0;

  const unLinkedSelected = useMemo(
    () =>
      previewOptions.length - defaultOptionState.length > 0 &&
      parentNoumsLength > 1,
    [defaultOptionState.length, parentNoumsLength, previewOptions.length],
  );

  const enableResult = useMemo(
    () => !isDesktop && isConfirmScreen && unLinkedSelected,
    [isConfirmScreen, isDesktop, unLinkedSelected],
  );

  const enableNoumContainer = !isConfirmScreen || isDesktop;

  return (
    <NoumProvider>
      <MainContainer>
        <Header isBorderRadius={false}>
          <MainHeader
            avatar={UserUtil.getProfilePicture(user) || undefined}
            userName={user?.firstName || undefined}
          />
        </Header>
        <Container>
          <TitleWrapper>
            {!isMobile && (
              <TSpan
                style={{
                  marginBottom: '12px',
                }}
                font="body-xl-bold"
                colorToken="--text-card-header-neutral-default"
              >
                {t(`noumena.link_noums.link_noums`, {
                  linkNo: '',
                })}
              </TSpan>
            )}
            <LinkNoumDescription colorToken="--text-card-header-neutral-highlighted">
              {isConfirmScreen
                ? t('noumena.link_noums.confirmation.description_header')
                : t('noumena.link_noums.description_header')}
            </LinkNoumDescription>
          </TitleWrapper>
          <NoumMainContainer>
            {enableNoumContainer && (
              <SelectNoumOptionsToLink
                loading={loading}
                infiniteState={infiniteState}
                pageLoader={pageLoader}
                optionState={optionState}
                searchStr={search}
                updateOptionState={updateOptionState}
                onSearchChange={onSearchChange}
                fetchMore={fetchMore}
              />
            )}
            {enablePreview ? (
              <NoumPreview
                visibility={visibilityLevelReverse[currentVisibilityLevel]}
                options={previewOptions}
                followers={followersCount}
                connections={connectionsCount}
                loading={linkedNoumsCalculatedLoading}
                isDesktop={isDesktop}
                unLinkedSelected={unLinkedSelected}
              />
            ) : null}
          </NoumMainContainer>
          <ActionWrapper>
            {enableResult ? (
              <ResultContainer
                visibility={visibilityLevelReverse[currentVisibilityLevel]}
                selectedNoums={checkedOptions.length}
                followers={followersCount}
                connections={connectionsCount}
                loading={linkedNoumsCalculatedLoading}
              />
            ) : null}
            <LinkNoumActionFooter
              defaultOptions={defaultOptionState}
              checkedOptions={previewOptions}
              handleConfirmLinkNoums={handleConfirmLinkNoums}
              handleGoBack={handleGoBack}
              handleLinkNoums={handleLinkNoums}
              loading={mutationLoading}
              isConfirmScreen={isConfirmScreen}
              isDesktop={isDesktop}
              parentNoums={parentNoumsLength}
              setConfirmScreen={setConfirmScreen}
            />
          </ActionWrapper>
        </Container>
      </MainContainer>
      <LinkNoumCompletedModal
        handleClose={handleGoBack}
        handleGoBack={handleGoBack}
        isOpen={showCompletedModal}
      />
      <LinkVisibilityModal
        visibility={visibilityLevelReverse[currentVisibilityLevel]}
        handleAccept={handleAcceptVisibilitySettings}
        isOpen={showVisibilityModal}
        handleClose={() => {
          toggleShowVisibilityModal(!showVisibilityModal);
        }}
      />
      <LinkExistingNoumModal
        handleAccept={handleAcceptExtraLinking}
        linkedNoums={existingLinkedNoum || ([] as OptionType[])}
        selectedOption={selectedOption}
        isOpen={showLinkExistingNoumModal}
        handleClose={() => {
          toggleShowLinkExistingNoumModal(false);
        }}
      />
      <LinkConfirmationModal
        loading={mutationLoading}
        isOpen={showConfirmationModal}
        handleConfirm={handleConfirmLinkNoums}
        handleClose={() => {
          setShowConfirmationModal(false);
        }}
        noumsCount={previewOptions.length}
      />
    </NoumProvider>
  );
};

export default LinkNoums;
