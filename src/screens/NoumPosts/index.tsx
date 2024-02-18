import { useParams } from 'react-router-dom';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { NoumAuthorizationProvider } from '@/features/noums/contexts/NoumAuthorizationContext';
import { NoumUserConnectionProvider } from '@/features/noums/contexts/NoumUserConnectionContext';
import { PostElementProvider } from '../Chamber/components/elements/PostElement/PostElementProvider';
import { Posts } from './Posts';
import { ChamberProvider } from '../Chamber/ViewChamber/ChamberProvider';

export const NoumPosts = (): JSX.Element => {
  const { id = '' } = useParams();
  const { space, loadingSpace, loading } = useNoumDetails(id);

  return (
    <NoumAuthorizationProvider noumId={id}>
      <ChamberProvider noumId={id}>
        <NoumUserConnectionProvider>
          <PostElementProvider space={space}>
            <Posts loadingElement={loadingSpace || loading} />
          </PostElementProvider>
        </NoumUserConnectionProvider>
      </ChamberProvider>
    </NoumAuthorizationProvider>
  );
};

export default NoumPosts;
