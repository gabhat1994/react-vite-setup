import {
  forwardRef,
  type Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  ConnectionRequestTypeEnum,
  SpaceTypeEnum,
  type Maybe,
} from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { typeOfChamberBox } from '@/components/ChamberBox/consts';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { useApolloClient } from '@apollo/client';

import { GetConnectedSpacesDocument } from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { Underline } from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/styles';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { trackEvent } from '@/utils/tracking';
import { UserUtil } from '@/utils/user';
import { useUpdateConnectionStatusHelper } from '@/features/noums/hooks/spaceQuery';
import {
  AvatarClickableWrapper,
  ButtonSection,
  CustomMessage,
  MemberRequestContainer,
  MemberRequestDataBody,
  MemberRequestDataHead,
  MemberRequestHead,
  MemberRequestName,
  MemberRequestTitle,
  RequestResolvedMessageSection,
  SpinnerContainer,
  StyledEventDescription,
  StyledSeeMoreButton,
  TagLabel,
} from './styles';
import type IMemberRequest from './types';

export enum ResolvingAnimationState {
  Default,
  FadeOut,
  FadeIn,
}

const MemberRequest = forwardRef(
  (
    {
      name,
      requestFromChamberId,
      title,
      profileImage,
      category,
      isHomeType,
      connectionId,
      chamberId,
      noumType,
      inviterId,
      refetchReceivedRequests,
      message,
      isModal,
    }: IMemberRequest,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { t } = useTranslation();
    const contentRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const apolloClient = useApolloClient();

    const isUnregistered = useMemo(() => UserUtil.isUnregistered(user), [user]);
    const { updateConnectionStatusHelper, loading } =
      useUpdateConnectionStatusHelper();
    const [isRequestResolved, setIsRequestResolved] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [animationStarted, setAnimationStarted] = useState<Boolean>(false);

    const [animationState, setAnimationState] =
      useState<ResolvingAnimationState>(ResolvingAnimationState.Default);

    const [status, setStatus] = useState<ConnectionRequestTypeEnum>(
      ConnectionRequestTypeEnum.Requested,
    );

    const startRequestResolvingAnimation = (
      requestStatus: ConnectionRequestTypeEnum,
    ) => {
      setStatus(requestStatus);
      setAnimationStarted(true);
      setAnimationState(ResolvingAnimationState.FadeOut);
      setTimeout(() => {
        setAnimationStarted(false);
        setIsRequestResolved(true);
        setAnimationState(ResolvingAnimationState.FadeIn);
        setTimeout(() => {
          if (refetchReceivedRequests) refetchReceivedRequests();
          if (requestStatus === ConnectionRequestTypeEnum.Approved) {
            apolloClient.refetchQueries({
              include: [GetConnectedSpacesDocument],
            });
          }
        }, 250);
      }, 250);
    };

    const updateConnectionStatus = async (
      spaceId: string | null | undefined,
      connectId: Maybe<string> | undefined,
      statusToUpdate: ConnectionRequestTypeEnum,
    ) => {
      let isSuccess = false;
      if (spaceId && connectId) {
        isSuccess = await updateConnectionStatusHelper({
          spaceId,
          connectionId: connectId,
          status: statusToUpdate,
        });

        if (isSuccess) {
          startRequestResolvingAnimation(statusToUpdate);
        }
      }

      return isSuccess;
    };

    const onAcceptClick = async () => {
      const isSuccess = await updateConnectionStatus(
        chamberId,
        connectionId,
        ConnectionRequestTypeEnum.Approved,
      );
      if (isSuccess && noumType === SpaceTypeEnum.Home) {
        trackEvent('friend_request_accept', {
          UUID: user?._id,
          DeviceType: navigator.userAgent,
          Inviter: inviterId,
        });
      }
    };

    const onDeclineClick = async () => {
      updateConnectionStatus(
        chamberId,
        connectionId,
        ConnectionRequestTypeEnum.Declined,
      );
    };

    const navigateToChamber = () => {
      if (!isUnregistered) navigate(`/noum/${requestFromChamberId}`);
    };

    useEffect(() => {
      const flag =
        collapsed && contentRef.current
          ? contentRef.current?.offsetHeight < contentRef.current?.scrollHeight
          : false;
      setShowMore(flag);
    }, [contentRef, message, collapsed]);

    return (
      <>
        <MemberRequestContainer ref={ref} isModal={isModal}>
          <MemberRequestHead data-testid="theadSection">
            <MemberRequestDataHead>
              <AvatarClickableWrapper
                onClick={navigateToChamber}
                isClickable={!isUnregistered}
              >
                <Avatar url={profileImage} />
              </AvatarClickableWrapper>
              <MemberRequestDataBody>
                <MemberRequestTitle
                  onClick={navigateToChamber}
                  data-testid="tMemberRequestTitle"
                  title={title}
                  isClickable={!isUnregistered}
                >
                  {title}
                </MemberRequestTitle>
                <MemberRequestName
                  colorToken="--text-tablecell-neutral-default"
                  isHomeType={isHomeType}
                >
                  {!isHomeType &&
                    `${t('noumena.chamber.member_request.invited_by')} `}{' '}
                  <span>{name}</span>
                </MemberRequestName>
              </MemberRequestDataBody>
            </MemberRequestDataHead>
            {category && (
              <TagLabel
                bgColor={
                  typeOfChamberBox[category.toLowerCase() as ChamberBoxNameEnum]
                    .bgColor
                }
                color={
                  typeOfChamberBox[category.toLowerCase() as ChamberBoxNameEnum]
                    .color
                }
              >
                {capitalizeFirstLetter(category)}
              </TagLabel>
            )}
          </MemberRequestHead>
          <StyledEventDescription>
            {collapsed ? (
              <CustomMessage ref={contentRef}>{message}</CustomMessage>
            ) : (
              message
            )}
            {showMore && (
              <StyledSeeMoreButton
                colorToken="--link-card-brand-primary-default"
                onClick={() => setCollapsed(!collapsed)}
                font="link-m"
              >
                {t('noumena.homeChambers.event.see_more')}
              </StyledSeeMoreButton>
            )}
          </StyledEventDescription>
          {loading || animationStarted ? (
            <SpinnerContainer>
              {' '}
              <Spinner />{' '}
            </SpinnerContainer>
          ) : isRequestResolved ? (
            <RequestResolvedMessageSection animationState={animationState}>
              <span data-testid="resolve-request-text">
                {status === ConnectionRequestTypeEnum.Declined &&
                  t(`noumena.request_declined`)}
                {status === ConnectionRequestTypeEnum.Approved &&
                  t(`noumena.request_accepted`)}
              </span>
            </RequestResolvedMessageSection>
          ) : (
            <ButtonSection
              animationState={animationState}
              data-testid="ttagsSection"
            >
              <Button
                data-testid="decline-button"
                onClick={onDeclineClick}
                tertiary
                size="small"
              >
                {t(`noumena.Decline`)}{' '}
              </Button>
              <Button
                data-testid="accept-button"
                onClick={onAcceptClick}
                secondary
                size="small"
              >
                {t(`noumena.Accept`)}
              </Button>
            </ButtonSection>
          )}
        </MemberRequestContainer>
        <Underline />
      </>
    );
  },
);

export default MemberRequest;
