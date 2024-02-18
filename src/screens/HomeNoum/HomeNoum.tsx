import { useAuth } from '@/features/auth/contexts';
import NoumView from '../Chamber/ViewChamber/NoumView';
import HomeNoumView from './HomeNoumView';

const HomeNoum = (): JSX.Element => {
  const { masterId } = useAuth();

  if (!masterId) {
    // TODO: Redirect to another page?
    return <></>;
  }

  return (
    <NoumView id={masterId}>
      <HomeNoumView />
    </NoumView>
  );
};

export default HomeNoum;
