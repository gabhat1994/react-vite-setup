import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { Navigate, Route, Routes, generatePath } from 'react-router';
import ROUTES from '@/constants/routes';
import { useNavigateBack } from '@/hooks/navigation';
import { ManageMembersModal } from '../components/modals/ManageMembersModal';

interface ViewNoumRoutesProps {
  noumId: string;
}

export function ViewNoumRoutes({ noumId }: ViewNoumRoutesProps) {
  const navigateBack = useNavigateBack();
  const { hasNoumPermission } = useNoumAuthorization();

  const hasManageMembersPermission =
    hasNoumPermission('invite-users') || hasNoumPermission('assign-user-roles');

  return (
    <Routes>
      <Route
        path="manage-members"
        element={
          hasManageMembersPermission ? (
            <ManageMembersModal
              isOpen={true}
              handleClose={() =>
                navigateBack(-1, {
                  fallback: generatePath(ROUTES.NOUM, { id: noumId }),
                })
              }
            />
          ) : (
            <Navigate to={generatePath(ROUTES.NOUM, { id: noumId })} />
          )
        }
      />
    </Routes>
  );
}
