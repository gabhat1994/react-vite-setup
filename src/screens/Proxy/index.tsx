import { Spinner } from '@/components/Spinner';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import {
  Container,
} from './styles';

const Proxy = () => {
  const [searchParams] = useSearchParams();
  const navigateUrl = searchParams.get('url');
  const navigateBackUrl = searchParams.get('backurl');
  const navigate = useNavigate();
  setTimeout(() => {
    navigate(`..${navigateUrl!}&backurl=${navigateBackUrl}`);
  }, 0);
  return (
    <Container data-testid="t-nm-login">
      <Spinner />
    </Container>
  );
};

export default Proxy;
