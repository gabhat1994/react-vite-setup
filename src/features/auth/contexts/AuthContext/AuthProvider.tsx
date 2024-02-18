import * as Sentry from '@sentry/react';

import type {
  LogsOutput,
  UserSelectedQuestionAndAnswersOutputObject,
} from '@/apollo/generated/types';
import {
  useCleverTapUserPropertyLazyQuery,
  useCurrentUserLazyQuery,
  useGetCleverTapUserLazyQuery,
  useGetUserSubmittedOnboardingQuestionsAndAnswersLazyQuery,
  useMenuPermissionsForActiveSubscriptionLazyQuery,
} from '@/apollo/graphql';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { setUser as setSentryUser } from '@sentry/react';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

import { type Maybe } from '@/common/types';
import accessLocalStorage from '@/constants/accessLocalStorage';
import onboardingStatusLocalStorage from '@/constants/onboardingStatusLocalStorage';
import { useClient } from '@/hooks/apolloClient';
import { useAppBadge } from '@/hooks/appBadge';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { type EmailSubscriptionType } from '@/screens/CoreSettings/NotificationsSettings/types';
import { trackEvent } from '@/utils/tracking';
import clevertap from '@/utils/tracking/clevertap';
import { UserUtil } from '@/utils/user';
import { useError, useFCMDeviceToken } from '@/hooks';
import { hasAnsweredMoreInfo } from '@/features/user/onboarding/utils';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { AuthContext } from './AuthContext';
import { type AuthData, type LocalAuthCredential } from './types';

export const AuthProvider: FC<{
  children: ReactNode;
  client: ApolloClient<NormalizedCacheObject>;
  initialUser?: Maybe<UserFragment>;
}> = ({ children, initialUser, client }) => {
  const { initClient } = useClient();

  const { logError } = useError();
  const { identifyUser } = useLaunchDarkly();
  const { clearAppBadge } = useAppBadge();
  const { unregisterToken } = useFCMDeviceToken();
  const [initialNoumId, setInitialNoumId] = useState<number | undefined>();
  const [initialInvoiceId, setInitialInvoiceId] = useState<string>();
  const [initialContractId, setInitialContractId] = useState<string>();
  const [initialSowId, setInitialSowId] = useState<string>();
  const [initialUnsubscribeFrom, setInitialUnsubscribeFrom] =
    useState<EmailSubscriptionType>();
  const [user, setUser] = useState(initialUser);
  const [masterId, setMasterId] = useState<string>('');
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isLoadingAnswers, setIsLoadingAnswers] = useState<boolean>(false);
  const [onboardingAnswers, setOnboardingAnswers] =
    useState<Maybe<UserSelectedQuestionAndAnswersOutputObject>>(undefined);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [isOpsUser, setIsOpsUser] = useState<boolean>(false);
  const [isAcceptedSkipMediaTesting, setIsAcceptedSkipMediaTesting] =
    useState(false);

  const [cleverTapUserProperty] = useCleverTapUserPropertyLazyQuery();

  const [getCleverTapUser] = useGetCleverTapUserLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: ({ cq, space, referralEntry, wallets }) => {
      const age = user?.ageGroup
        ? `${user?.ageGroup?.min} - ${user?.ageGroup?.max}`
        : '';
      trackEvent('login', {
        Name: `${user?.firstName} ${user?.lastName}`,
        Age: age,
        DateOfBirth: user?.dob,
        Email: user?.email,
        Phone: user?.phone ? `+${user?.phone}` : undefined,
        UUID: user?._id,
        UserStatus: user?.userStatus,
        InternalUser: user?.email?.includes('@noumena.global') ? 'Y' : 'N',
        MasterNoumIdentifier: user?.chamber?._id,
        Location: user?.location,
        ProfilePic: user?.profile?.profilePicture,
        Skills: user?.skills?.map((x) => x?.name).join(', '),
        NetworkLink: user?.profile?.socialLinks
          ?.map((x) => x?.link)
          ?.join(', '),
        YearsOfFreelancing: `${user?.freelancingExperience?.min}-${user?.freelancingExperience?.max}`,
        TokensAllocated: space?.token?.count || 0,
        ReferralCode: referralEntry?.referralCode || '',
        HomeNoumProgress: `${space?.percentCompleted || 0}%`,
        CQScore: cq?.getNoumenaScore?.capitalQuotient || 0,
        DeviceType: navigator.userAgent,
        WalletCount: wallets?.length || 0,
        ...utmParams,
      });
      setUtmParams({});
    },
  });

  const [getAnsweredQuestions] =
    useGetUserSubmittedOnboardingQuestionsAndAnswersLazyQuery({
      fetchPolicy: 'cache-and-network',
      onCompleted(data) {
        if (data) {
          const { getUserSubmittedOnboardingQuestionsAndAnswers: answers } =
            data;
          setOnboardingAnswers(answers);
          setLocalStorage(
            onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS,
            answers,
          );
        }
      },
    });

  const [getMenuPermissions, { loading: isLoadingMenuPermissions }] =
    useMenuPermissionsForActiveSubscriptionLazyQuery({
      fetchPolicy: 'cache-and-network',
      onCompleted: () => {
        // TODO: Menu level permissions
      },
    });

  const handleOnboardingQuestions = async () => {
    setIsLoadingAnswers(true);
    try {
      await getAnsweredQuestions();
    } finally {
      setIsLoadingAnswers(false);
    }
  };
  const [currentUserQuery, { loading: currentUserLoading }] =
    useCurrentUserLazyQuery({
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data) {
          const { currentUser } = data;

          if (!currentUser) {
            return;
          }

          const homeNoumId = currentUser?.chamber?._id;
          await handleOnboardingQuestions();

          setUser(currentUser);

          setLocalStorage(
            onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS,
            UserUtil.isActive(currentUser) && hasAnsweredMoreInfo(currentUser),
          );

          onSetAcceptedSkipMediaTesting(
            !!currentUser?.isAcceptedSkipMediaTesting,
          );
          setSentryUser({
            id: currentUser?._id,
            email: currentUser?.email!,
            username: currentUser?.username!,
          });
          setMasterId(homeNoumId!);
          identifyUser({
            key: currentUser?._id,
            name: `${currentUser?.firstName} ${currentUser?.lastName}`,
            avatar: currentUser?.profile?.profilePicture ?? undefined,
            email: currentUser?.email ?? undefined,
          });

          const Site = {
            Name: `${currentUser?.firstName} ${currentUser?.lastName}`,
            UUID: currentUser?._id,
            Identity: currentUser?._id,
            Email: currentUser?.email,
            Phone: currentUser?.phone ? `+${currentUser?.phone}` : undefined,
            UserId: currentUser?._id,
            MasterNoumIdentifier: homeNoumId,
            Location: currentUser?.location,
            ProfilePic: currentUser?.profile?.profilePicture,
            NetworkLink: currentUser?.profile?.socialLinks
              ?.map((x) => x?.link)
              ?.join(', '),
            Skills: currentUser?.skills?.map((x) => x?.name).join(', '),
            YearsOfFreelancing: `${
              currentUser?.freelancingExperience?.min ?? 0
            }-${currentUser?.freelancingExperience?.max ?? 0}`,
            UserStatus: currentUser?.userStatus,
            InternalUser: currentUser?.email?.includes('@noumena.global')
              ? 'Y'
              : 'N',
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            CQScore: '0',
            HMpercentcompl: '0%',
            ...utmParams,
          };

          if (UserUtil.isActive(currentUser)) {
            try {
              const { data: ctData } = await cleverTapUserProperty();
              Site.CQScore =
                ctData?.cq?.getNoumenaScore?.capitalQuotient ?? '0';
              Site.HMpercentcompl = ctData?.space?.[0]?.percentCompleted
                ? `${ctData?.space[0]?.percentCompleted}%`
                : '0%';
            } catch (error) {
              Sentry.captureException(error, {
                tags: { section: 'cleverTapUserProperty' },
              });
            }
          }

          clevertap.onUserLogin.push({
            Site,
          });
          if (homeNoumId) {
            getCleverTapUser({
              variables: {
                homeNoumId,
                referralProduct: 'NOUMENATI',
              },
            });
            await getMenuPermissions({
              variables: {
                homeNoumId,
              },
            });
          }
        }
        setIsUserLoading(false);
      },
      onError(error) {
        if (error) {
          Sentry.captureException(
            new Error(
              `file: "AuthProvider.tsx", context: "useCurrentUserLazyQuery -> onError), error: ${error}, user: ${user}"`,
            ),
            {
              tags: { section: 'Tracking Logout' },
            },
          );

          signOut();
          setIsUserLoading(false);
        }
      },
    });

  const updateUserStatus = useCallback((status: string) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, userStatus: status } : null,
    );
  }, []);

  const updateUserAdditionalInformation = useCallback(
    (metadata: LogsOutput[]) => {
      setUser((prevUser) =>
        prevUser
          ? {
              ...prevUser,
              metadata: [...(prevUser?.metadata || []), ...metadata],
            }
          : null,
      );
    },
    [],
  );

  const setData = useCallback(() => {
    initClient();
    currentUserQuery();
  }, [currentUserQuery, initClient]);

  const signUp = useCallback(() => {
    trackEvent('APP_ONBOARDING_END');
    setData();
  }, [setData]);

  const onSetAcceptedSkipMediaTesting = useCallback(
    (isAccepted?: boolean) => {
      const isAcceptedValue =
        isAccepted !== undefined
          ? isAccepted
          : !!user?.isAcceptedSkipMediaTesting;
      setIsAcceptedSkipMediaTesting(isAcceptedValue);
    },
    [user?.isAcceptedSkipMediaTesting],
  );

  const setAuthData = useCallback(
    ({ noumId, invoiceId, contractId, sowId, unsubscribeFrom }: AuthData) => {
      setData();
      if (noumId) {
        setInitialNoumId(noumId);
      }
      if (invoiceId) {
        setInitialInvoiceId(invoiceId);
      }
      if (contractId) {
        setInitialContractId(contractId);
      }
      if (sowId) {
        setInitialSowId(sowId);
      }
      if (unsubscribeFrom) {
        setInitialUnsubscribeFrom(unsubscribeFrom);
      }
    },
    [setData],
  );

  const signIn = useCallback(
    (
      { accessToken, refreshToken, ...authData }: LocalAuthCredential,
      _utmParams?: Record<string, string>,
    ) => {
      setLocalStorage(accessLocalStorage.ACCESS_TOKEN, accessToken);
      setLocalStorage(accessLocalStorage.REFRESH_TOKEN, refreshToken);
      setUtmParams(_utmParams || {});
      setData();
      setAuthData(authData);
    },
    [setAuthData, setData],
  );

  const refetchUserData = useCallback(async () => {
    try {
      await currentUserQuery();
    } catch (err) {
      logError(err, '');
    }
  }, [currentUserQuery, logError]);

  const signOut = useCallback(async () => {
    clearAppBadge();
    await unregisterToken();
    await client.clearStore();
    setSentryUser(null);
    setUser(null);
    setOnboardingAnswers(undefined);
    setLocalStorage(accessLocalStorage.ACCESS_TOKEN);
    setLocalStorage(accessLocalStorage.REFRESH_TOKEN);
    setLocalStorage(onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS);
  }, [clearAppBadge, client, unregisterToken]);

  const isActive = UserUtil.isActive(user);
  const isPending = UserUtil.isPending(user);
  const isUnregistered = UserUtil.isUnregistered(user);
  const isUnauthenticated = UserUtil.isUnauthenticated(user);

  const payload = useMemo(
    () => ({
      user,
      masterId,
      signIn,
      signOut,
      updateUserStatus,
      isActive,
      isPending,
      isUnregistered,
      isUnauthenticated,
      loading: isUserLoading,
      currentUserLoading,
      signUp,
      setAuthData,
      refetchUserData,
      initialNoumId,
      setInitialNoumId,
      initialInvoiceId,
      setInitialInvoiceId,
      initialContractId,
      setInitialContractId,
      initialSowId,
      setInitialSowId,
      setIsLoadingAnswers,
      isLoadingAnswers,
      onboardingAnswers,
      isOpsUser,
      setIsOpsUser,
      isAcceptedSkipMediaTesting,
      initialUnsubscribeFrom,
      onSetAcceptedSkipMediaTesting,
      updateUserAdditionalInformation,
      isLoadingMenuPermissions,
    }),
    [
      user,
      masterId,
      signIn,
      signOut,
      updateUserStatus,
      isActive,
      isPending,
      isUnregistered,
      isUnauthenticated,
      isUserLoading,
      currentUserLoading,
      signUp,
      setAuthData,
      refetchUserData,
      initialNoumId,
      initialInvoiceId,
      initialContractId,
      initialSowId,
      isLoadingAnswers,
      onboardingAnswers,
      isOpsUser,
      isAcceptedSkipMediaTesting,
      initialUnsubscribeFrom,
      updateUserAdditionalInformation,
      onSetAcceptedSkipMediaTesting,
      isLoadingMenuPermissions,
    ],
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      const accessToken = getLocalStorage(accessLocalStorage.ACCESS_TOKEN);
      if (accessToken) {
        await currentUserQuery();
      } else {
        setIsUserLoading(false);
      }
    };
    getCurrentUser();
  }, [currentUserQuery]);

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};
