import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCapitalquotientLazyQuery } from '@/apollo/graphql/queries/getCQDetails.generated';
import { useGetNoumenaScoreByNoumIdLazyQuery } from '@/apollo/graphql/queries/getNoumenaScoreByNoumId.generated';

export const useCQ = (spaceId?: string, isVisitor?: boolean) => {
  const [state, setState] = useState<{
    fetching: boolean;
    status: string;
    visibility: string;
    score: string;
    noumId: string | null | undefined;
  }>({ fetching: true, status: '', visibility: '', score: '', noumId: '' });

  const { t } = useTranslation();
  const [gqlCQDetails] = useCapitalquotientLazyQuery();
  const [getCapitalQuotientByNoum] = useGetNoumenaScoreByNoumIdLazyQuery();

  const fetchData = useCallback(async () => {
    const newState = { ...state };
    newState.fetching = false;
    if (isVisitor && spaceId) {
      const visitorCqData = await getCapitalQuotientByNoum({
        variables: { noumId: spaceId },
      });
      newState.noumId =
        visitorCqData?.data?.capitalquotient?.getNoumenaScoreByNoumId?.noumId;
      newState.visibility =
        visitorCqData?.data?.capitalquotient?.getNoumenaScoreByNoumId
          ?.capitalQuotient === null
          ? 'Private'
          : 'Public';
      newState.score =
        visitorCqData?.data?.capitalquotient?.getNoumenaScoreByNoumId
          ?.capitalQuotient || '';
    } else {
      const res = await gqlCQDetails({});
      newState.status = generateText(
        res.data?.capitalquotient?.getNoumenaScore?.status,
      );
      newState.noumId =
        (res?.data?.getSpaceByType &&
          res?.data.getSpaceByType.length &&
          res?.data.getSpaceByType[0]?._id) ||
        '';
      newState.visibility = convertText(
        res.data?.capitalquotient?.getNoumenaScore?.visibility,
      );
      newState.score =
        res?.data?.capitalquotient?.getNoumenaScore?.capitalQuotient || '';
    }
    setState(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gqlCQDetails]);

  const generateText = (str: string | null | undefined) => {
    if (!str) return '';
    if (str === 'IN_COMPLETE') {
      return t(`noumena.money.cq.incomplete`);
    }
    return t(`noumena.money.cq.complete`);
  };

  const convertText = (str: string | null | undefined) => {
    if (!str) return '';
    if (str === 'PRIVATE') {
      return t(`noumena.money.cq.private`);
    }
    return t(`noumena.money.cq.public`);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { cqData: state };
};
