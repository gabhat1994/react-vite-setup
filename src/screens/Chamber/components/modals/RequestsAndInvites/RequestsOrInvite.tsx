import React, { useState, useCallback } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import {
  MyRequestContainer,
  TSpanWithOverFlowText,
} from '@/screens/Chamber/components/modals/RequestsAndInvites/styles';
import { Button } from '@/components/Button';
import { DeleteMyRequest } from '@/screens/Chamber/components/modals/RequestsAndInvites/DeleteMyRequest';
import { Stack } from '@/layout';
import { Avatar } from '@/components/Avatar/Avatar';
import {
  type RequestsOrInviteProps,
  ResolvingAnimationState,
} from '@/screens/Chamber/components/modals/RequestsAndInvites/types';
import { useAuth } from '@/features/auth/contexts';
import {
  ConnectionRequestTypeEnum,
  type Maybe,
} from '@/apollo/generated/types';
import { AvatarClickableWrapper } from '@/screens/Chamber/components/RightPanel/elements/MemberRequest/styles';
import { useUpdateConnectionStatusHelper } from '@/features/noums/hooks/spaceQuery';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';

const RequestsOrInvite: React.FC<RequestsOrInviteProps> = ({
  name,
  refetch,
  requestedAt,
  title,
  profileImage,
  isInvite,
  noumId,
  connectionId,
  isChamberBox,
  isNotPrivateNoum,
  isChambersScreen,
  requestToChamberId,
}) => {
  const { onChangeLastUpdatedConnectionId } = useNoumUserConnectionContext();
  const navigate = useNavigate();
  const { isUnregistered } = useAuth();

  const navigateToChamber = useCallback(() => {
    if (!isUnregistered) navigate(`/noum/${requestToChamberId}`);
  }, [requestToChamberId, isUnregistered, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  const [animationState, setAnimationState] = useState<ResolvingAnimationState>(
    ResolvingAnimationState.Default,
  );

  const { updateConnectionStatusHelper } = useUpdateConnectionStatusHelper();

  const startRequestResolvingAnimation = () => {
    setAnimationState(ResolvingAnimationState.FadeOut);
    refetch();
  };

  const updateConnectionStatus = async (
    spaceId: string,
    connectId: Maybe<string> | undefined,
    statusToUpdate: ConnectionRequestTypeEnum,
  ) => {
    if (noumId && connectId) {
      const isSuccess = await updateConnectionStatusHelper({
        spaceId,
        connectionId: connectId,
        status: statusToUpdate,
      });

      if (onChangeLastUpdatedConnectionId)
        onChangeLastUpdatedConnectionId(connectId);
      if (isSuccess) {
        startRequestResolvingAnimation();
      }
    }
  };

  const onDelete = async () => {
    await updateConnectionStatus(
      noumId,
      connectionId,
      ConnectionRequestTypeEnum.Cancelled,
    );
  };

  const formattedSendOnTime = requestedAt
    ? format(new Date(parseFloat(requestedAt)), 'MMM dd, yyyy hh:mm a')
    : '';

  const sentText = t('noumena.chamber.modal.requests_invites_sent');

  const invitedText = t('noumena.chamber.modal.requests_invites_invited');
  const onText = t('noumena.chamber.modal.requests_invites_on');

  const hasTodayOrYesterday =
    formattedSendOnTime?.includes(t('noumena.date.today')) ||
    formattedSendOnTime?.includes(t('noumena.date.yesterday'));

  const invitedTimeText = isChamberBox
    ? ''
    : ` ${!hasTodayOrYesterday ? onText : ''} ${formattedSendOnTime}`;

  const renderRequestOrInvite = () => (
    <Stack gap={12}>
      <AvatarClickableWrapper
        onClick={navigateToChamber}
        isClickable={!isUnregistered}
      >
        <Avatar url={profileImage || ''} />
      </AvatarClickableWrapper>
      <Stack vertical>
        <TSpanWithOverFlowText
          onClick={navigateToChamber}
          cursor={isUnregistered ? undefined : 'pointer'}
          font="body-m-bold"
          title={name ?? ''}
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {name}
        </TSpanWithOverFlowText>
        {isInvite && (
          <TSpanWithOverFlowText
            cursor={isInvite ? 'text' : 'pointer'}
            onClick={navigateToChamber}
            font={isNotPrivateNoum ? 'body-m' : 'body-m-bold'}
            colorToken="--text-card-header-neutral-default"
            title={title ?? ''}
          >
            {isChambersScreen && !isChamberBox ? '→' : ''} {title}
          </TSpanWithOverFlowText>
        )}
        <TSpanWithOverFlowText
          font="body-s"
          colorToken={
            isInvite
              ? '--text-card-header-neutral-default'
              : '--text-timestamp-neutral-default'
          }
          title={title ?? ''}
        >
          {`${
            isChamberBox ? title ?? '' : isInvite ? invitedText : sentText
          }${invitedTimeText}`}
        </TSpanWithOverFlowText>
      </Stack>
    </Stack>
  );

  return (
    <MyRequestContainer
      justify="space-between"
      fullWidth
      animationState={animationState}
    >
      {renderRequestOrInvite()}
      <Button
        style={{ margin: 'auto 0' }}
        size="small"
        tertiary
        onClick={() => setIsOpen(true)}
      >
        {t(`noumena.cancel`)}
      </Button>
      <DeleteMyRequest
        isInvite={isInvite}
        isOpen={isOpen}
        requestId=""
        onClose={() => setIsOpen(false)}
        onDelete={onDelete}
        component={renderRequestOrInvite}
      />
    </MyRequestContainer>
  );
};

export default RequestsOrInvite;
