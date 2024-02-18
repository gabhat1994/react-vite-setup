import { useEffect, useState } from 'react';
import { type Maybe } from '@/apollo/generated/types';
import { useGetNoumProgramresultByIdQuery } from '@/apollo/graphql';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useError } from '@/hooks/useError';
import { SpaceUtils } from '@/utils/space';

type Questions = {
  id?: string;
  question?: string;
  answer?: string;
};

export function useRiseQuestions(id: string | null | undefined) {
  const { logError } = useError();
  const { space } = useNoumContext();
  const [questions, setQuestions] =
    useState<Maybe<(Questions | null | undefined)[]>>();
  const [applicationId, setApplicationId] = useState<string | undefined>();
  const [resultJson, setResultJson] = useState<Maybe<JSON>>();
  const [status, setStatus] = useState<string | null>();
  const [parentNoumId, setParentNoumId] = useState<string | null>();

  const { data, loading, error, refetch } = useGetNoumProgramresultByIdQuery({
    skip: !SpaceUtils.isRiseApplicationNoum(space) || !id,
    variables: {
      noumId: id || '',
    },
    fetchPolicy: 'cache-and-network',
    onError: () => {
      logError(error, 'GetNoumProgramresultById');
    },
  });

  useEffect(() => {
    setQuestions(data?.getNoumProgramresultById?.questions);
    setApplicationId(data?.getNoumProgramresultById?._id);
    setResultJson(data?.getNoumProgramresultById?.resultJSON);
    setStatus(data?.getNoumProgramresultById?.status);
    setParentNoumId(data?.getNoumProgramresultById?.parentNoumId?._id);
  }, [data]);

  return {
    loading,
    questions,
    refetch,
    applicationId,
    resultJson,
    status,
    parentNoumId,
  };
}

export default useRiseQuestions;
