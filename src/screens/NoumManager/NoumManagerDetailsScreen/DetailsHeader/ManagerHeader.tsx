import { GetSpaceForViewDocument } from '@/apollo/graphql';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { ManagerDetailsHeaderLayout } from '@/features/noums/components/ManagerDetailsHeader';
import { useResignFlow } from '@/features/noums/hooks/manageMembers/useResignFlow';
import { MemberUtils } from '@/features/noums/utils';
import { useBreakpoints } from '@/hooks';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { useApolloClient } from '@apollo/client';
import React from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useNoumManagerDetailsProvider } from '../providers/NoumManagerDetailsProvider';

type ManagerHeaderProps = {
  onGoBack: () => void;
  noumId: string;
};
export const ManagerHeader: React.FC<ManagerHeaderProps> = ({
  onGoBack,
  noumId,
}) => {
  const { noum, member } = useNoumManagerDetailsProvider();
  const { isMobile } = useBreakpoints();
  const { user } = useAuth();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const { openModal, resignFromManagerModal } = useResignFlow({
    noumId: noum?._id ?? '',
    onResign: async () => {
      await apolloClient.refetchQueries({
        include: [GetSpaceForViewDocument],
        onQueryUpdated: async (previousResult) => {
          if (previousResult.variables?.noumId !== noumId) {
            return;
          }
          await previousResult.refetch();

          navigate(generatePath(ROUTES.NOUM, { id: noumId }));
        },
      });
    },
  });

  const isMyAccount =
    MemberUtils.isManager(member) && member?.user?._id === user?._id;

  const RightContentMobile = isMyAccount ? (
    <EllipsisMenu
      containerWidth="125px"
      neutral
      onClick={() => {}}
      menuOptions={[
        {
          key: 'resign',
          label: 'Resign from the Manager Role',
          type: 'value',
          value: 'resign',
          intent: 'danger',
          onClick: openModal,
        },
      ]}
      iconColorToken="--button-card-neutral-default"
    />
  ) : null;

  return (
    <>
      <ManagerDetailsHeaderLayout.BaseHeader
        member={member}
        onGoBack={onGoBack}
        rightContent={
          isMobile ? (
            RightContentMobile
          ) : isMyAccount ? (
            <ManagerDetailsHeaderLayout.ResignButton onClick={openModal} />
          ) : null
        }
      />
      {resignFromManagerModal}
    </>
  );
};
