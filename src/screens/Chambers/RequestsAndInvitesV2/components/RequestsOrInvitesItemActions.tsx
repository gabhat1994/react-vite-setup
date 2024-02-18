import { type FC } from 'react';
import { Button, Icon } from '@/components';
import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { t } from 'i18next';
import { Stack } from '@/layout';
import { type RequestsOrInvitesItemActionsProps } from './types';

const RequestsOrInvitesItemActions: FC<RequestsOrInvitesItemActionsProps> = ({
  isReceived,
  handleActionClick,
}) => (
  <Stack gap={8} fullWidth>
    {isReceived ? (
      <>
        <Button
          size="full_small"
          tertiary
          onClick={() => handleActionClick(ConnectionRequestTypeEnum.Declined)}
        >
          {t(`noumena.chamber.decline_button`)}
        </Button>
        <Button
          size="full_small"
          secondary
          onClick={() => handleActionClick(ConnectionRequestTypeEnum.Approved)}
        >
          {t(`noumena.chamber.accept_button`)}
        </Button>
      </>
    ) : (
      <Button
        size="small"
        intent="negative"
        secondary
        icon={<Icon name="close_m" size={24} />}
        onClick={() => handleActionClick(ConnectionRequestTypeEnum.Cancelled)}
      />
    )}
  </Stack>
);

export default RequestsOrInvitesItemActions;
