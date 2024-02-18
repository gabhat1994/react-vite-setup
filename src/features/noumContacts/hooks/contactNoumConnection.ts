import { useCallback } from 'react';
import {
  useGetContactConnectionWithNoumLazyQuery,
  useGetSpaceByIdLazyQuery,
} from '@/apollo/graphql';
import {
  ConnectionRequestTypeEnum,
  ProjectChamberType,
} from '@/apollo/generated/types';

function useContactNoumConnection() {
  const [getContactNoumConnection] = useGetContactConnectionWithNoumLazyQuery();
  const [getSpaceById] = useGetSpaceByIdLazyQuery();

  const checkConnectedWithNoum = useCallback(
    async (noumId: string, contactId: string) => {
      const getNoumConnectionRes = await getContactNoumConnection({
        variables: {
          noumId,
          contactId,
        },
      });
      return (
        getNoumConnectionRes.data?.getContactConnectionWithNoum?.status ===
        ConnectionRequestTypeEnum.Approved
      );
    },
    [getContactNoumConnection],
  );

  const checkSecretNoum = useCallback(
    async (noumId: string, projectType?: ProjectChamberType) => {
      if (projectType === ProjectChamberType.Secret) {
        return true;
      }

      const spaceData = await getSpaceById({
        variables: {
          noumId,
          editorV2Enabled: true,
        },
      });
      return (
        (spaceData.data?.getSpaceById?.projectType as ProjectChamberType) ===
        ProjectChamberType.Secret
      );
    },
    [getSpaceById],
  );

  const checkConnectionWithSecretNoum = useCallback(
    async (
      noumId: string,
      contactId: string,
      projectType?: ProjectChamberType,
    ) => ({
      isConnected: await checkConnectedWithNoum(noumId, contactId),
      isSecretNoum: await checkSecretNoum(noumId, projectType),
    }),
    [checkConnectedWithNoum, checkSecretNoum],
  );

  return [checkConnectionWithSecretNoum];
}

export default useContactNoumConnection;
