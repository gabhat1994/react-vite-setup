import { useCallback, useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import {
  useCheckIfSlugExistsLazyQuery,
  useSpaceForNoumAdsQuery,
  useUpdateSpaceMutation,
} from '@/apollo/graphql';

import { useAuth } from '@/features/auth/contexts';
import { useError, useToast } from '@/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { t } from 'i18next';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { useKeywordSuggestions } from './useKeywordSuggestions';

import { type NoumAdsConfigType } from './types';
import { Utils } from './utils';

type UseNoumAds = {
  isOpen: boolean;
  campaignId?: string;
  onSave?: () => void;
};

export function useNoumAds({ isOpen, onSave, campaignId }: UseNoumAds) {
  const { isOpsUser } = useAuth();
  const logger = useError();
  const toast = useToast();
  const devices = useBreakpoints();
  const extract = useKeywordSuggestions();
  const { space } = useEditChamberState();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const isFirstRender = useRef<boolean>(true);
  const [infoBox, setInFoBox] = useState(true);
  const [confirmDisableSeo, setConfirmDisableSeo] = useState(false);

  const { data: spaceForNoumAd, loading: spaceLoading } =
    useSpaceForNoumAdsQuery({
      skip: !isOpsUser || !campaignId,
      variables: {
        campaign: campaignId!,
      },

      onError: (e) => logger.logError(e, 'space-for-noum-ops-admin', true),
    });

  const [SEO, setSEO] = useState<NoumAdsConfigType>(
    Utils.settingValues(
      isOpsUser ? spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId : space,
    ),
  );
  const debouncedSlug = useDebounce(SEO.slug, 600);

  const [isSlugCheckingCalled, setIsSlugCheckingCalled] = useState(false);

  const isSameAsServerSlug = isOpsUser
    ? spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId?.slug === SEO.slug
    : space?.slug === SEO.slug;

  useEffect(() => {
    if (isOpsUser && spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId) {
      setSEO(
        Utils.settingValues(
          spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId,
        ),
      );
    }
  }, [isOpsUser, spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId]);

  const [updateSpace, updateSpaceState] = useUpdateSpaceMutation({
    onCompleted: () => {
      toast.addSuccessIconToast('SEO settings saved successfully');
      onSave?.();
    },

    onError: (error) => {
      logger.logError(error, 'seo-settings-space-update', true);
    },
  });

  const [checkSlug, checkSlugState] = useCheckIfSlugExistsLazyQuery({
    fetchPolicy: 'network-only',
    onError: (error) => {
      logger.logError(error, 'seo-settings-check-slug', true);
    },
  });

  const extractAndSet = useCallback(async () => {
    if (space?.name) {
      const { keywords, phrases } = await extract(space.name);
      setSuggestions((s) => [...s, ...keywords, ...phrases]);
    }

    if (space?.description) {
      const { keywords, phrases } = await extract(space.description);
      setSuggestions((s) => [...s, ...keywords, ...phrases]);
    }
  }, [extract, space?.description, space?.name]);

  useEffect(() => {
    if (isOpen) {
      extractAndSet();
    }
  }, [extractAndSet, isOpen]);

  const toggle = useCallback(
    (enabled: boolean) => {
      if (checkSlugState.loading || updateSpaceState.loading) return;

      // To sync the state, if user in enabling SEO then he is disagreeing to disable it
      if (confirmDisableSeo) {
        setConfirmDisableSeo(false);
      }
      setSEO((s) => ({
        ...s,
        enableNoumAds: enabled,
      }));
    },
    [checkSlugState.loading, confirmDisableSeo, updateSpaceState.loading],
  );

  const updateSlug = useCallback((url: string) => {
    setIsSlugCheckingCalled(false);
    setSEO((s) => ({
      ...s,
      slug: url,
    }));
  }, []);

  const uniqueSuggestions = Utils.unique(suggestions);

  const check = async () => {
    const isValidSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g.test(SEO.slug ?? '');

    if (isSameAsServerSlug) return;

    if (SEO.slug && SEO.slug?.length > 60) {
      toast.addErrorToast('Url should be less than 60 characters');
      return;
    }

    if (SEO.slug && isValidSlug) {
      setIsSlugCheckingCalled(true);
      await checkSlug({
        variables: {
          slug: SEO.slug,
        },
      });
      return;
    }

    toast.addErrorToast(t('noumena.invalid.slug.url'));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (debouncedSlug?.length) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSlug]);

  const add = useCallback((k: string) => {
    setSEO((s) => ({
      ...s,
      keyWords: Utils.unique([...s.keyWords, k]),
    }));
  }, []);

  const remove = useCallback((k: string) => {
    setSEO((s) => ({
      ...s,
      keyWords: Utils.unique([...Utils.filter(s.keyWords, k)]),
    }));
  }, []);

  const update = useCallback(() => {
    if (!isSameAsServerSlug && SEO.slug && SEO.slug?.length > 60) {
      toast.addErrorToast('Url should be less than 60 characters');
      return;
    }

    const isValidSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g.test(SEO.slug ?? '');

    // Don't check slug validity if SEO is off. Other wise it will block the saving
    if (!isValidSlug && SEO.enableNoumAds) {
      toast.addErrorToast(t('noumena.invalid.slug.url'));
      return;
    }

    updateSpace({
      variables: {
        id:
          (isOpsUser
            ? spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId?._id
            : space?._id) || '',
        input: {
          enableAds: SEO.enableNoumAds,
          keywords: SEO.keyWords,
          slug: isSameAsServerSlug
            ? SEO.enableNoumAds
              ? undefined
              : ''
            : SEO.enableNoumAds
            ? SEO.slug
            : '',
        },
      },
    });
  }, [
    isSameAsServerSlug,
    SEO.slug,
    SEO.enableNoumAds,
    SEO.keyWords,
    updateSpace,
    isOpsUser,
    spaceForNoumAd?.getSelectedAdCampaignDetails?.noumId?._id,
    space?._id,
    toast,
  ]);

  const updateInfoBoxState = useCallback((val: boolean) => {
    setInFoBox(val);
  }, []);

  const agreeDisablingSEO = () => {
    setConfirmDisableSeo(true);
  };

  const disagreeDisablingSEO = useCallback(() => {
    setConfirmDisableSeo(false);
    // To sync the state, if user in disagreeing to disable then he is enabling SEO
    toggle(true);
  }, [toggle]);

  const isAvailable = !checkSlugState?.data?.checkIfSlugExists;

  const clearSlug = () => updateSlug(space?.slug ?? '');

  const showInfoBox = !isSameAsServerSlug && isAvailable;

  const isTaken = !isAvailable && isSlugCheckingCalled;

  const showEnabledView = SEO.enableNoumAds;

  const showDisabledView =
    (!SEO.enableNoumAds && !SEO.slug) ||
    (!SEO.enableNoumAds && confirmDisableSeo);

  const showDisableConfirmationView =
    !SEO.enableNoumAds && !confirmDisableSeo && SEO.slug;

  return {
    devices,
    isOpsUser,
    keyword: {
      add,
      remove,
      selected: SEO.keyWords,
      suggestions: uniqueSuggestions,
    },
    setting: {
      ...SEO,
      toggle,
      updateSlug,
      clearSlug,
      agreeDisablingSEO,
      disagreeDisablingSEO,
    },
    space: {
      update,
      isUpdating: updateSpaceState.loading,
      isLoadingFromOps: spaceLoading,
    },
    slug: {
      check,
      isSlugCheckingCalled,
      isAvailable,
      loading: checkSlugState.loading,
      showInfoBox,
      isTaken,
    },
    infoBox: {
      show: infoBox,
      update: updateInfoBoxState,
    },
    view: {
      showDisableConfirmationView,
      showDisabledView,
      showEnabledView,
    },
  };
}
