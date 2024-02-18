import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { pickBy } from 'lodash';
import { type ContractStatus, type SowStatus } from '@/apollo/generated/types';
import { type DocumentType } from '@/features/contracts/types';
import { type ContractManagerSearchParams } from '@/features/contracts/utils/routes';
import { type ListPOV } from './types';

export function useContractManagerSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedParams: ContractManagerSearchParams = {
    noumId: searchParams.get('noumId') ?? undefined,
    type: (searchParams.get('type') as DocumentType) ?? undefined,
    status:
      (searchParams.get('status') as ContractStatus | SowStatus) ?? undefined,
    perspective: (searchParams.get('perspective') as ListPOV) ?? undefined,
  };

  const updateSearchParams = useCallback(
    ({ type, perspective }: ContractManagerSearchParams) => {
      setSearchParams(
        pickBy({ type, perspective }, Boolean) as Record<string, string>,
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return {
    searchParams: parsedParams,
    updateSearchParams,
  };
}
