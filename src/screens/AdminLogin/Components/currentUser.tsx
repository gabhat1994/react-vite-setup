import { useGetCurrentUserStatusQuery } from '@/apollo/graphql';

export const CurrentUser = (props: { id?: string }) => {
  const { data, loading, error } = useGetCurrentUserStatusQuery();
  return (
    <div>
      <h1>Current User component</h1>
      <p>Id: {props.id || 'Id not provided'}</p>
      {loading && <p>Fetchi details...</p>}
      {error && <p>Error Fetching user...</p>}
      {data && <p>User Status: {data.currentUser?.userStatus}</p>}
    </div>
  );
};
export default CurrentUser;
