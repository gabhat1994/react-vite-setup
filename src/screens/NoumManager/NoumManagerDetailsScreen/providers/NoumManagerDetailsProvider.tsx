import { type AppActivityTypes } from '@/apollo/generated/types';
import {
  useGetSpaceByIdQuery,
  useNoumMemberQuery,
  type AppActivityFragment,
  type NoumMemberBasicFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { createContext, useContext, useMemo, type FC } from 'react';
import { generatePath, useParams } from 'react-router';
import { useActivityLogs } from '../hooks/useActivityLogs';
import { type PageParams } from '../types';

type NoumManagerDetailsContextType = {
  member: Maybe<NoumMemberBasicFragment>;
  loading: boolean;
  noum: Maybe<SpaceOutputFragment>;
  isLoadingActivityLogs: boolean;
  activityLogs: AppActivityFragment[];
  activityLogsFilterTypes: AppActivityTypes[];
  setActivityLogsFilterTypes: (type: AppActivityTypes[]) => void;
};

const NoumManagerDetailsContext = createContext<NoumManagerDetailsContextType>({
  member: undefined,
  loading: false,
  noum: undefined,
  activityLogs: [],
  isLoadingActivityLogs: false,
  setActivityLogsFilterTypes: () => null,
  activityLogsFilterTypes: [],
});

export const NoumManagerDetailsProvider: FC = ({ children }) => {
  const { id = '', memberId = '' } = useParams<PageParams>();
  const { masterId: mainSpaceId } = useAuth();

  const { goBackToOrigin } = useNavigateWithOrigin();
  const { data: noumData, loading: loadingSpace } = useGetSpaceByIdQuery({
    variables: {
      noumId: id,
      userHomeNoumId: mainSpaceId,
      editorV2Enabled: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleGoBack = () => {
    goBackToOrigin({
      fallbackUrl: generatePath(ROUTES.NOUM, { id }),
    });
  };

  const { data, loading: loadingMember } = useNoumMemberQuery({
    variables: { memberId, noumId: id },
    fetchPolicy: 'cache-and-network',
    onError: handleGoBack,
    onCompleted(memberData) {
      if (!memberData.noumMember) {
        handleGoBack();
      }
    },
  });
  const noum = noumData?.getSpaceById;

  const {
    activityLogs,
    loading: isLoadingActivityLogs,
    activityLogsFilterTypes,
    setActivityLogsFilterTypes,
  } = useActivityLogs({
    noumId: id,
    memberId: data?.noumMember?.user?._id,
  });

  const value = useMemo(
    () => ({
      member: data?.noumMember,
      loading: loadingSpace || loadingMember,
      noum,
      activityLogs,
      activityLogsFilterTypes,
      isLoadingActivityLogs,
      setActivityLogsFilterTypes,
    }),
    [
      data?.noumMember,
      loadingSpace,
      loadingMember,
      activityLogsFilterTypes,
      noum,
      activityLogs,
      isLoadingActivityLogs,
      setActivityLogsFilterTypes,
    ],
  );

  return (
    <NoumManagerDetailsContext.Provider value={value}>
      {children}
    </NoumManagerDetailsContext.Provider>
  );
};

export const useNoumManagerDetailsProvider = () => {
  const context = useContext(NoumManagerDetailsContext);

  if (!context) {
    throw new Error(
      'useNoumManagerDetailsProvider must be rendered within NoumManagerDetailsContext.Provider.',
    );
  }

  return context;
};
