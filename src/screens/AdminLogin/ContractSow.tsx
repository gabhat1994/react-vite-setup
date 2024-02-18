import { useState } from 'react';
import { SowDetailOps } from './Components/SowDetailOps';
import { ContractDetailOps } from './Components/ContractDetailOps';

type TContractSow = {
  contractId?: string;
  sowId?: string;
  componentFromUrl: string;
};

type State = {
  contractId?: string;
  sowId?: string;
};
export const ContractSow = ({
  contractId,
  sowId,
  componentFromUrl,
}: TContractSow) => {
  const [state, setState] = useState<State>({
    contractId,
    sowId,
  });

  if (state.contractId) {
    return (
      <ContractDetailOps
        contractId={state.contractId}
        setState={setState}
        componentFromUrl={componentFromUrl}
      />
    );
  }
  if (state.sowId) {
    return (
      <SowDetailOps
        sowId={state.sowId}
        setState={setState}
        componentFromUrl={componentFromUrl}
      />
    );
  }

  return null;
};
