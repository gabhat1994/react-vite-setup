import { Navigate, useLocation, useParams } from 'react-router';
import NotFound from './NotFound';

const Redirect = () => {
  const location = useLocation();
  const { id } = useParams();

  if (location.pathname.startsWith(`/chamber/${id}`))
    return <Navigate to={location.pathname.replace('chamber', 'noum')} />;

  return <NotFound />;
};

export default Redirect;
