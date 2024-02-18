import { NoumMemberStatus } from '@/apollo/generated/types';
import { useGetCqDataQuery, useSubmitCqFormMutation } from '@/apollo/graphql';
import ChamberDefaultImag from '@/assets/images/chamber_default.png';
import riseAvatar from '@/assets/images/riseavatar.png';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { useCQ } from '@/features/money/hooks';
import { useHomeNoumAboutMeHelper } from '@/features/noums/hooks/noums';
import { useUpdateProjectChamberHelper } from '@/features/noums/hooks/spaceQuery';
import { useBreakpoints } from '@/hooks';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useToggle } from '@/hooks/toggle';
import { Spacer, Stack } from '@/layout';
import { NonInteractiveOverlay } from '@/screens/Chamber/components/ElementWrapper/styles';
import { PersonalDetailsModal } from '@/screens/Chamber/components/modals/PersonalDetailsModal/Modal';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { useEditChamberState } from '../../EditChamber/provider';
import { useNoumContext } from '../../ViewChamber/ChamberProvider';
import { NoumByLinkProvider } from '../RightPanel/NoumByLinkProvider';
import { NoumEditorViewModeActions } from '../RightPanel/elements/NoumActions';
import { NoumInvitedConnection } from '../RightPanel/elements/NoumActions/NoumInvitedConnection';
import { NoumWaitInvitation } from '../RightPanel/elements/NoumActions/NoumWaitInvitation';
import { UserActionMode } from '../RightPanel/elements/NoumActions/types';
import { ProjectCreateModal } from '../modals/ProjectCreate/ProjectCreateModal';
import Favourite from './Favourite';
import NoumBio from './NoumBio';
import NoumDescription from './NoumDescription';
import { NoumManagerInvitation } from './NoumManagerInvitation/NoumManagerInvitation';
import NoumTagsDetail from './NoumTagsDetail';
import { ProfileBannerEditable } from './ProfileBanner';
import { RiseApplicationSteps } from './RiseApplicationV2/RiseApplicationSteps';
import {
  FavWrapper,
  NoumEditorEdit,
  NoumEditorHead,
  NoumEditorStyledCard,
  ProfilePictureHeader,
  ProfileSummaryDataContainer,
  ProfileSummaryName,
} from './styles';
import { Privacy, type IProfileSummary } from './types';

const ProfileSummaryNew = forwardRef(
  ({
    disabled,
    name,
    title,
    icon,
    imageURL,
    lastUpdated,
    location,
    bio,
    ownerName,
    ownerImageURL,
    ownerTitle,
    ownerBio,
    isMasterNoum,
    spaceId,
    isUpdateMode,
    category,
    isPublished,
    coverURL,
    isCustomPreview,
  }: IProfileSummary) => {
    const { t } = useTranslation();
    const { masterId, refetchUserData } = useAuth();
    const { flags } = useLaunchDarkly();
    const {
      space: noumSpace,
      refetchSpaceById: refetchNoumView,
      isOwner,
    } = useNoumContext();
    const { connectionStatus, onHandleConnection, userActionMode, noumMember } =
      useNoumUserConnectionContext();

    const { space: editSpace, refetchSpaceById: refetchEditNoum } =
      useEditChamberState();
    const space = editSpace || noumSpace;
    const isEditMode = !!editSpace?._id;
    const hasInvitation =
      space?.membershipStatus?.status === NoumMemberStatus.Invited;

    const hasRolePromotion =
      !!space?.membershipStatus?.rolePromotionToApprove?._id;

    const showMemberInvitation =
      flags.elementPermission && (hasInvitation || hasRolePromotion);

    const showConnectionInvitationOld =
      (isMasterNoum || !flags.elementPermission) &&
      !isOwner &&
      userActionMode === UserActionMode.handleInvitation;

    const showSecretNoumInvitation =
      !showMemberInvitation &&
      !isOwner &&
      !isMasterNoum &&
      spaceId !== masterId &&
      userActionMode === UserActionMode.handleWaitInvitation;

    const handleRefetchSpace = useCallback(() => {
      if (editSpace) {
        refetchEditNoum?.();
      } else {
        refetchNoumView();
      }
    }, [editSpace, refetchEditNoum, refetchNoumView]);

    const { data: cqData } = useGetCqDataQuery();
    const [submitCqFormMutation] = useSubmitCqFormMutation();
    const { cqData: cqDataDetail } = useCQ(space?._id || '', !isOwner);
    const [isEditOpen, toggleEditOpen] = useToggle(false);

    const { isUnregistered } = useAuth();
    const { isTablet, isMobile } = useBreakpoints();
    const [isIdentityFormSubmitted, setIsIdentityFormSubmitted] =
      useState(false);
    const [identityForm, setIdentityForm] = useState<{
      __typename?: 'CQForm' | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      details?: any;
      formId?: string | null | undefined;
      status?: string | null | undefined;
    }>();
    const summaryDescription = isMasterNoum ? ownerBio : bio;
    const chamberTitle = isMasterNoum ? ownerTitle : title;
    const ownedBy = isOwner ? t('noumena.you') : ownerName;
    const profileURL = isMasterNoum ? ownerImageURL : imageURL;

    const { updateProjectChamberHelper, loading: isCoverLoader } =
      useUpdateProjectChamberHelper();
    const { homeNoumAboutMeProfilePicHelper } = useHomeNoumAboutMeHelper();
    const imageAvatar =
      SpaceUtils.isRiseApplicationNoum(noumSpace) ||
      SpaceUtils.isRiseNoum(space)
        ? riseAvatar
        : imageURL;

    const [profileImage, setProfileImage] = useState<string | undefined>(() =>
      profileURL && profileURL !== ChamberDefaultImag
        ? profileURL
        : ChamberDefaultImag,
    );

    const [coverImage, setCoverImage] = useState(() =>
      coverURL && coverURL !== ChamberDefaultImag ? coverURL : undefined,
    );

    useEffect(() => {
      const existingIdentityForm =
        cqData?.capitalquotient?.getCQDetails?.forms?.find(
          (form) => form?.formId === '1',
        );
      if (existingIdentityForm) {
        setIsIdentityFormSubmitted(Boolean(existingIdentityForm.status));
        setIdentityForm(existingIdentityForm);
      }
    }, [cqData]);

    const summaryData = {
      spaceId,
      name,
      description: summaryDescription,
      profileImage: imageURL,
      categoryId: category?._id || undefined,
    };

    useEffect(() => {
      setProfileImage(profileURL);
    }, [ownerImageURL, imageURL, coverURL, profileURL]);

    const handleChangeProfileImage = useCallback(
      async (profileImageURL: string | undefined) => {
        setProfileImage(profileImageURL);
        if (spaceId && profileImageURL) {
          if (isMasterNoum) {
            const { profilePicSuccess } = await homeNoumAboutMeProfilePicHelper(
              profileImageURL,
            );

            if (
              profilePicSuccess &&
              isIdentityFormSubmitted &&
              identityForm &&
              masterId
            ) {
              const indentifyDetails = Array.isArray(identityForm?.details)
                ? identityForm?.details
                : identityForm?.details.submitted;
              const formCopy = [...(indentifyDetails || [])];
              const indexOfProfilePicture = formCopy.findIndex(
                (ans) => ans.qid === '4',
              );
              if (indexOfProfilePicture !== -1) {
                formCopy[indexOfProfilePicture] = {
                  ...formCopy[indexOfProfilePicture],
                  value: profileImageURL,
                };
              }
              submitCqFormMutation({
                variables: {
                  input: {
                    noumId: masterId,
                    status: cqData?.capitalquotient?.getCQDetails?.status,
                    form: {
                      formId: identityForm?.formId,
                      description: 'identity',
                      status: identityForm?.status,
                      details: formCopy,
                    },
                  },
                },
              });
            }
          } else {
            await updateProjectChamberHelper(
              spaceId,
              {
                profileImage: profileImageURL,
              },
              true,
            );
          }
        }
        handleRefetchSpace();
        refetchUserData();
      },
      [
        cqData?.capitalquotient?.getCQDetails?.status,
        handleRefetchSpace,
        homeNoumAboutMeProfilePicHelper,
        identityForm,
        isIdentityFormSubmitted,
        isMasterNoum,
        masterId,
        refetchUserData,
        spaceId,
        submitCqFormMutation,
        updateProjectChamberHelper,
      ],
    );
    const isPrivate =
      cqDataDetail.visibility === Privacy.PRIVATE && !isOwner && isMasterNoum;

    const handleChangeCoverImage = useCallback(
      async (coverImageURL: string | undefined) => {
        setCoverImage(coverImageURL);
        if (spaceId) {
          await updateProjectChamberHelper(
            spaceId,
            {
              headerBackgroundUrl: coverImageURL,
            },
            true,
          );
        }
        handleRefetchSpace();
      },
      [handleRefetchSpace, spaceId, updateProjectChamberHelper],
    );

    if (!space) {
      return null;
    }

    return (
      <NoumByLinkProvider spaceId={spaceId}>
        <NoumEditorStyledCard>
          {isCustomPreview && <NonInteractiveOverlay />}
          <ProfileBannerEditable
            height={isUpdateMode || coverImage ? 273 : undefined}
            url={coverImage}
            onContentChange={handleChangeCoverImage}
            maximumFileSize={5}
            onlyEditable={isUpdateMode}
            borderRadius={isTablet ? 0 : undefined}
            onClear={() => handleChangeCoverImage('')}
            loading={isCoverLoader}
            isBanner
          />
          <NoumEditorHead
            data-testid="theadSection"
            isCoverPhoto={!!coverImage || isUpdateMode}
          >
            <ProfilePictureHeader
              aria-label="profile_picture"
              isCoverPhoto={!!coverImage || isUpdateMode}
            >
              <ProfileBannerEditable
                url={isMasterNoum ? profileImage : imageAvatar}
                onContentChange={handleChangeProfileImage}
                maximumFileSize={5}
                onClear={() => handleChangeProfileImage(undefined)}
                onlyEditable={isUpdateMode}
                size={isMobile ? 'XVL' : 'XXL'}
                borderRadius={16}
              />
            </ProfilePictureHeader>
            <ProfileSummaryDataContainer>
              <Stack
                gap={8}
                wrap="wrap"
                justify={isPrivate ? 'flex-end' : 'space-between'}
                data-testid="ttagsSection"
                padding={isTablet ? '0 16px 0 0' : '0'}
                align="center"
              >
                <Stack aria-label="noum_tag_details" gap={8}>
                  <NoumTagsDetail
                    disabled={disabled}
                    icon={icon}
                    isMasterNoum={isMasterNoum}
                    member={noumMember}
                    ownerTitle={ownerTitle}
                    title={title}
                    noum={space}
                  />
                </Stack>
                {!isUpdateMode && isPublished && !isUnregistered && (
                  <FavWrapper aria-label="favourite_icon">
                    <Favourite />
                  </FavWrapper>
                )}
              </Stack>
              <Stack
                justify="space-between"
                align="center"
                padding={isTablet ? '0 16px 0 0' : '0'}
              >
                <Stack vertical>
                  <ProfileSummaryName
                    aria-label="noum_profile_name"
                    disabled={disabled}
                    data-testid="tprofileSummaryName"
                  >
                    <TSpan
                      font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}
                      colorToken="--text-card-header-neutral-hightlighted"
                    >
                      {isMasterNoum ? ownerName : name}
                    </TSpan>
                  </ProfileSummaryName>
                  {!isMobile && (
                    <>
                      <NoumBio
                        isMasterNoum={isMasterNoum}
                        lastUpdated={lastUpdated}
                        ownedBy={ownedBy}
                        disabled={disabled}
                        chamberTitle={chamberTitle}
                        location={location}
                      />
                    </>
                  )}
                </Stack>
                {!isEditMode && !isMobile && !isCustomPreview && (
                  <NoumEditorViewModeActions />
                )}
              </Stack>
            </ProfileSummaryDataContainer>
            {isUpdateMode && (
              <NoumEditorEdit aria-label="noum_edit_information">
                <Button
                  leftIcon={
                    <Icon
                      name="edit_m"
                      size={24}
                      color="--icon-button-neutral-default"
                    />
                  }
                  size="large"
                  tertiary
                  onClick={toggleEditOpen}
                  disabled={
                    editSpace?.category?.name.toLowerCase() ===
                    'rise_application'
                  }
                >
                  {t(`noumena.chamber.edit_information__button`)}
                </Button>
              </NoumEditorEdit>
            )}
          </NoumEditorHead>
          {showMemberInvitation && (
            <NoumManagerInvitation
              noum={space}
              invitationSentFrom={
                space?.membershipStatus?.invitationSentFrom ??
                space?.membershipStatus?.rolePromotionToApprove?.rolePromotedBy
              }
              isManagerInvitation={space?.membershipStatus?.role.isManager}
              isRolePromotion={
                space?.membershipStatus?.rolePromotionToApprove?.isManager
              }
              onRefetch={handleRefetchSpace}
            />
          )}
          {isMobile && (
            <>
              <Spacer height={16} />
              <Stack padding="0 16px">
                <NoumBio
                  isMasterNoum={isMasterNoum}
                  lastUpdated={lastUpdated}
                  ownedBy={ownedBy}
                  disabled={disabled}
                  chamberTitle={chamberTitle}
                  location={location}
                />
              </Stack>
            </>
          )}
          <Spacer height={16} />
          <Stack vertical reverse={isMobile} gap={16}>
            {showConnectionInvitationOld && (
              <NoumInvitedConnection
                connectionStatus={connectionStatus}
                onHandle={onHandleConnection!}
                isNoumEditor
              />
            )}
            {showSecretNoumInvitation && <NoumWaitInvitation />}
            <NoumDescription
              isUpdateMode={isUpdateMode}
              summaryDescription={summaryDescription}
            />
          </Stack>
          {SpaceUtils.isRiseApplicationNoum(noumSpace) && (
            <RiseApplicationSteps />
          )}
        </NoumEditorStyledCard>

        <>
          {isMasterNoum ? (
            <PersonalDetailsModal
              isOpen={isEditOpen}
              handleClose={toggleEditOpen}
              handleSuccess={toggleEditOpen}
              spaceId={spaceId}
              isUpdateMode
            />
          ) : isEditOpen ? (
            <ProjectCreateModal
              isOpen={isEditOpen}
              handleClose={toggleEditOpen}
              handleSuccess={toggleEditOpen}
              isUpdateMode
              summaryData={summaryData}
            />
          ) : null}
        </>
      </NoumByLinkProvider>
    );
  },
);

export default ProfileSummaryNew;
