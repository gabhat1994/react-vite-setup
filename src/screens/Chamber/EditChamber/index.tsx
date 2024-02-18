import { useParams } from 'react-router-dom';
import { NoumAuthorizationProvider } from '@/features/noums/contexts/NoumAuthorizationContext';
import { NoumLayoutStatusFilter } from '@/apollo/generated/types';
import NoumEditor from './NoumEditor';
import { ChamberProvider } from '../ViewChamber/ChamberProvider';

const Index = () => {
  const { id = '' } = useParams();

  return (
    <NoumAuthorizationProvider noumId={id}>
      <ChamberProvider
        noumId={id}
        noumLayoutStatus={NoumLayoutStatusFilter.Unpublished}
      >
        <NoumEditor id={id} />
      </ChamberProvider>
    </NoumAuthorizationProvider>
  );
};

export default Index;
