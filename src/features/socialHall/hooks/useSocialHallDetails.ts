import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  useSocialHallByIdLazyQuery,
  useSocialHallByNameLazyQuery,
} from '@/apollo/graphql';
import { usePersonalSHId } from './usePersonalSHId';

export const useSocialHallDetails = () => {
  const { id = '' } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const socialHallId = query.get('calendar') || id;

  const personalSocialHallId = usePersonalSHId();

  const [
    getSocialHallByName,
    { data: socialHallByNameData, loading: socialHallByNameLoading },
  ] = useSocialHallByNameLazyQuery();

  const [
    getSocialHallById,
    { data: socialHallByIdData, loading: socialHallByIdLoading },
  ] = useSocialHallByIdLazyQuery();

  const fetchSocialHallData = useCallback(() => {
    if (personalSocialHallId) {
      getSocialHallByName({
        variables: {
          name: socialHallId,
        },
      });
    } else {
      getSocialHallById({
        variables: {
          id: socialHallId,
        },
      });
    }
  }, [
    socialHallId,
    getSocialHallById,
    getSocialHallByName,
    personalSocialHallId,
  ]);

  useEffect(() => {
    if (socialHallId) {
      fetchSocialHallData();
    }
  }, [fetchSocialHallData, socialHallId]);

  const currentData = personalSocialHallId
    ? socialHallByNameData?.socialHallByName
    : socialHallByIdData?.socialHallById;
  const currentLoading = personalSocialHallId
    ? socialHallByNameLoading
    : socialHallByIdLoading;

  return {
    data: currentData,
    isLoading: currentLoading,
  };
};
