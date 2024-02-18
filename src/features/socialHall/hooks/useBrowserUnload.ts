import { useEffect, useCallback } from 'react';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import getApiUrl from '@/apollo/getApiUrl';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { getLocalStorage } from '@/utils/localStorage';

export const useBrowserUnload = (callback: () => void): void => {
  const { socialHallId } = useSocialHallContext();

  const onUnload = useCallback(() => {
    const userAccessToken = getLocalStorage(accessLocalStorage.ACCESS_TOKEN);
    const url = `${getApiUrl()}/api/v1/query`;
    callback();
    fetch(url, {
      keepalive: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${userAccessToken}`,
      },
      body: JSON.stringify({
        query: `mutation exitFromSocialHall($socialHallId: ID!, $fromLeaveCTA: Boolean) {
          exitFromSocialHall(socialHallId: $socialHallId, fromLeaveCTA: $fromLeaveCTA) {
            _id
          }
        }`,
        variables: {
          socialHallId,
          fromLeaveCTA: true,
        },
      }),
    });
  }, [socialHallId, callback]);

  useEffect(() => {
    window.addEventListener('unload', onUnload);
    return () => {
      window.removeEventListener('unload', onUnload);
    };
  }, [onUnload]);
};

export default useBrowserUnload;
