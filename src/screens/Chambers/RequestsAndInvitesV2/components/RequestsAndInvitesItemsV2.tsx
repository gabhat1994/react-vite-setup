import { type FC } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components';
import { InviteNonNemberNoListNote } from '@/screens/Chamber/components/modals/RequestsAndInvites/components/InviteNonNemberNoListNote';
import { Separator } from '@/components/Separator/Separator';
import { type RequestsAndInvitesItemsPropsV2 } from './types';
import {
  EmptyContainer,
  RequestsAndInvitesItemsWrapper,
  RequestsOrInvitesItemContainer,
} from './styles';
import RequestsOrInvitesItemV2 from './RequestsOrInvitesItemV2';

const RequestsAndInvitesItemsV2: FC<RequestsAndInvitesItemsPropsV2> = ({
  isInvite,
  data,
  loading,
  isReceived,
  refetch,
}) => (
  <RequestsAndInvitesItemsWrapper vertical fullWidth>
    {data.length > 0 ? (
      <RequestsOrInvitesItemContainer fullWidth vertical>
        <RequestsOrInvitesItemV2
          data={data}
          isReceived={isReceived}
          isInvite={isInvite}
          refetch={refetch}
        />
        <Separator noMargin fullWidth />
      </RequestsOrInvitesItemContainer>
    ) : (
      <EmptyContainer vertical align="center">
        {!loading && (
          <>
            <TSpan
              font="body-l"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {t(`noumena.noums.requests_or_invites_item.no_result`)}
            </TSpan>
            {data.length === 0 && isInvite && <InviteNonNemberNoListNote />}
          </>
        )}
      </EmptyContainer>
    )}
  </RequestsAndInvitesItemsWrapper>
);
export default RequestsAndInvitesItemsV2;
