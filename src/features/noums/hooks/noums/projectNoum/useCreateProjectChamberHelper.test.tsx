import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { act, renderHook } from '@testing-library/react-hooks';
import {
  InstitutionsEnum,
  type ProjectChamberInput,
  ProjectChamberType,
  SpacePermissionEnum,
  SpaceStatusEnum,
} from '@/apollo/generated/types';
import { useCreateProjectChamberHelper } from './useCreateProjectChamberHelper';

const newProjectChamber = {
  name: 'name',
  description: 'Description',
  profileImage: undefined,
  category: 'CategoryID',
  institution: InstitutionsEnum.Noumena,
  status: SpaceStatusEnum.Draft,
  permission: SpacePermissionEnum.All,
  projectType: ProjectChamberType.Public,
};
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

it('useCreateProjectChamberHelper', async () => {
  const { result } = renderHook(() => useCreateProjectChamberHelper(), {
    wrapper: Wrapper,
  });

  act(async () => {
    const { id } = await result.current.createProjectChamberHelper(
      newProjectChamber as ProjectChamberInput,
    );

    expect(typeof id).toBe('string');
  });
});
