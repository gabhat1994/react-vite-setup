import NoAccessCard from '@/screens/Chamber/ViewChamber/NoAccessCard';
import { UserUtil } from '@/utils/user';
import { type ReactNode } from 'react';
import { SpaceUtils } from '@/utils/space';
import { useNoumContext } from './ChamberProvider';

type NoumAccessGatewayProps = {
  children: ReactNode;
};

export function NoumAccessGateway({ children }: NoumAccessGatewayProps) {
  const { space, isOwner, loading } = useNoumContext();

  const isArchived = SpaceUtils.isArchived(space);
  const isInactiveUser = UserUtil.isInactive(space?.uid);
  const hasAccess = isOwner || (!isInactiveUser && !isArchived);

  if (!loading && !hasAccess) {
    return <NoAccessCard />;
  }

  return <>{children}</>;
}
