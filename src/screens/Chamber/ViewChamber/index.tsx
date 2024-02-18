import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToggle } from '@/hooks';
import { NoumViewLayout } from '@/layout/NoumLayout';
import { EditNonMemberNameModal } from '@/screens/Chamber/components/modals/EditNonMemberNameModal';
import { useParams } from 'react-router-dom';
import NoumView from './NoumView';
import { ChamberHeader } from './ChamberHeader';
import { ChamberLeftSideBar } from './ChamberLeftSideBar';
import { NoumBodyContainer } from './NoumBodyContainer';
import { ViewNoumRoutes } from './ViewNoumRoutes';

const Index = () => {
  const { id = '' } = useParams();

  const {
    flags: { newSignUp },
  } = useLaunchDarkly();
  const { isUnregistered, initialNoumId } = useAuth();
  const [isEditNMNameModalOpen, toggleEditNMNameModalOpen] = useToggle(
    (isUnregistered && id && id !== '') || false,
  );

  return (
    <NoumView id={id}>
      <NoumViewLayout
        leftSidebar={<ChamberLeftSideBar />}
        header={<ChamberHeader />}
      >
        <NoumBodyContainer />
        {isUnregistered && initialNoumId && !newSignUp ? (
          <EditNonMemberNameModal
            isOpen={isEditNMNameModalOpen}
            confirmCallback={toggleEditNMNameModalOpen}
          />
        ) : (
          <></>
        )}

        <ViewNoumRoutes noumId={id} />
      </NoumViewLayout>
    </NoumView>
  );
};

export default Index;
