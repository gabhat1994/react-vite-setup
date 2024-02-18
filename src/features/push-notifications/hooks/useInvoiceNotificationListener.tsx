import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { type MessagePayload } from '@/services/rest/firebase';
import { GetInvoiceByIdDocument } from '@/apollo/graphql';
import { usePushNotification } from '../contexts/PushNotification';

export function useInvoiceNotificationListener() {
  const { onAnyMessage } = usePushNotification();

  const apolloClient = useApolloClient();

  useEffect(() => {
    const handler = (message: MessagePayload) => {
      if (!!message.data?.pnId && message.data.invoiceId) {
        apolloClient.refetchQueries({
          include: [GetInvoiceByIdDocument],
          onQueryUpdated: (previousResult) => {
            previousResult.refetch({
              id: message.data?.invoiceId,
            });
          },
        });
      }
    };

    const unsubscribe = onAnyMessage(handler);

    return unsubscribe;
  }, [onAnyMessage, apolloClient]);
}
