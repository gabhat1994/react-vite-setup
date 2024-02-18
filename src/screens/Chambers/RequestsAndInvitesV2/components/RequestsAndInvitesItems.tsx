import { type FC } from 'react';
import { t } from 'i18next';
import { Spinner, TSpan } from '@/components';
import { UserUtil } from '@/utils/user';
import { InviteNonNemberNoListNote } from '@/screens/Chamber/components/modals/RequestsAndInvites/components/InviteNonNemberNoListNote';
import { Separator } from '@/components/Separator/Separator';
import RequestsOrInvitesItem from './RequestsOrInvitesItem';
import { type RequestsAndInvitesItemsProps } from './types';
import {
  EmptyContainer,
  RequestsAndInvitesItemsWrapper,
  RequestsOrInvitesItemContainer,
} from './styles';

const RequestsAndInvitesItems: FC<RequestsAndInvitesItemsProps> = ({
  isInvite,
  isReceived = false,
  data,
  loading,
  refetch,
}) => {
  const items = isInvite
    ? data?.filter(
        (item) =>
          !UserUtil.isInactive(
            (isReceived ? item?.requestFrom : item?.requestTo)?.uid,
          ),
      )
    : data;
  return (
    <RequestsAndInvitesItemsWrapper vertical fullWidth>
      {items.length > 0 ? (
        items.map((item) =>
          item ? (
            <RequestsOrInvitesItemContainer key={item?._id} fullWidth vertical>
              <RequestsOrInvitesItem
                item={item}
                isReceived={isReceived}
                isInvite={isInvite}
                refetch={refetch}
              />
              <Separator noMargin fullWidth />
            </RequestsOrInvitesItemContainer>
          ) : null,
        )
      ) : (
        <EmptyContainer vertical align="center">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <TSpan
                font="body-l"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {t(`noumena.noums.requests_or_invites_item.no_result`)}
              </TSpan>
              {items.length === 0 && isInvite && <InviteNonNemberNoListNote />}
            </>
          )}
        </EmptyContainer>
      )}
    </RequestsAndInvitesItemsWrapper>
  );
};

export default RequestsAndInvitesItems;
