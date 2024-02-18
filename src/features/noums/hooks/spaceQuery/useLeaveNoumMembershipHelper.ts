import { GetSpaceForViewDocument, useLeaveNoumMembershipMutation } from '@/apollo/graphql';
import { useError } from '@/hooks';
import { useCallback } from 'react';

type LeaveNoumMembershipHelperProps = {
  onSuccess: () => void;
};

export function useLeaveNoumMembershipHelper({
  onSuccess,
}: LeaveNoumMembershipHelperProps) {
  const { logError } = useError();

  const [leaveNoumMembership, { loading }] = useLeaveNoumMembershipMutation({
    onCompleted: onSuccess,
  });

  const leaveNoumMembershipHelper = useCallback(
    async (noumId: string) => {
      try {
        await leaveNoumMembership({
          variables: { noumId },
          awaitRefetchQueries: true,
          refetchQueries: [GetSpaceForViewDocument],
        });

        return true;
      } catch (error) {
        logError(error, 'leaveNoumMembership');
        return false;
      }
    },
    [leaveNoumMembership, logError],
  );

  return {
    loading,
    leaveNoumMembershipHelper,
  };
}

export default useLeaveNoumMembershipHelper;
