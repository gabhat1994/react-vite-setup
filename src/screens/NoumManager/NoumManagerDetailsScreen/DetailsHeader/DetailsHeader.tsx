import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useNavigateBack } from '@/hooks/navigation';
import React from 'react';
import { generatePath } from 'react-router';
import { useNoumManagerDetailsProvider } from '../providers/NoumManagerDetailsProvider';
import { ManagerHeader } from './ManagerHeader';
import { NoumOwnerHeader } from './NoumOwnerHeader';

type DetailsHeaderProps = {};

export const DetailsHeader: React.FC<DetailsHeaderProps> = () => {
  const navigateBack = useNavigateBack();
  const { noum } = useNoumManagerDetailsProvider();
  const { user } = useAuth();
  const noumId = noum?._id ?? '';

  const handleGoBack = () => {
    navigateBack(-1, {
      fallback: generatePath(routes.NOUM, { id: noumId }),
    });
  };

  const isOwner = noum?.uid?._id === user?._id;

  return isOwner ? (
    <NoumOwnerHeader onGoBack={handleGoBack} />
  ) : (
    <ManagerHeader onGoBack={handleGoBack} noumId={noumId} />
  );
};
