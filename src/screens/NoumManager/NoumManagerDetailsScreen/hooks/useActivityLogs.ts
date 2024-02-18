import { AppActivityTypes } from '@/apollo/generated/types';
import { useGetNoumActivityLogQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { useMemo, useState } from 'react';

interface UseMemberPerformanceOptions {
  memberId: string | undefined;
  noumId: string;
}

export const useActivityLogs = ({
  noumId,
  memberId,
}: UseMemberPerformanceOptions) => {
  const [activityLogsFilterTypes, setActivityLogsFilterTypes] = useState<
    AppActivityTypes[]
  >([
    AppActivityTypes.EventHosted,
    AppActivityTypes.MembersInvited,
    AppActivityTypes.MessageSent,
    AppActivityTypes.PostCreation,
    AppActivityTypes.Transaction,
  ]);

  const { data: activityLogsData, loading } = useGetNoumActivityLogQuery({
    variables: {
      noumId,
      offset: 0,
      limit: 100,
      filter: {
        types: activityLogsFilterTypes,
        userId: memberId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const activityLogs = useMemo(
    () => cleanList(activityLogsData?.getNoumActivityLog?.data),
    [activityLogsData?.getNoumActivityLog?.data],
  );

  return {
    loading,
    activityLogs,
    activityLogsFilterTypes,
    setActivityLogsFilterTypes,
  };
};
