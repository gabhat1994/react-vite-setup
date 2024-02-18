import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useChangeGroupNameMutation } from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import { useSocialHallCallContext } from '@/providers/SocialHallCallProvider';
import { SubscriptionType } from '@/screens/SocialHall/types';

export const useSocialHallData = () => {
  const { addToast } = useToast();
  const { onSendSubscriptionMessage } = useSocialHallCallContext();
  const [
    changeGroupName,
    { loading: isChangingGroupName, error: changeGroupNameError },
  ] = useChangeGroupNameMutation();

  const handleError = useCallback(
    (networkError: String | Error | null) => {
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${networkError}`,
      );
    },
    [addToast],
  );

  const handleChangeGroupName = useCallback(
    async (groupId: string, name: string) => {
      let isSuccess;
      await changeGroupName({
        variables: {
          groupId,
          input: { name },
        },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          isSuccess = false;
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'createMultipleEventInvitation',
            },
          });
        },
        onCompleted: () => {
          isSuccess = true;
          onSendSubscriptionMessage({
            type: SubscriptionType.UPDATE_GROUP_NAME,
            data: name,
          });
        },
      });
      return isSuccess;
    },
    [changeGroupName, handleError, onSendSubscriptionMessage],
  );
  return { handleChangeGroupName, isChangingGroupName, changeGroupNameError };
};

export default useSocialHallData;
