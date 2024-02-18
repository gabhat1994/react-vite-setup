import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import { useListBlockedCountriesQuery } from '@/apollo/graphql';
import * as S from '../../styles';

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const BlockedCountriesListModal = ({ isOpen, onClose }: TModalProps) => {
  const { t } = useTranslation();
  const windowSize = useWindowDimensions();
  const isMobile = useMemo(() => windowSize.width < 768, [windowSize]);
  const pageSize = isMobile ? 30 : 20;

  const { data, fetchMore, networkStatus } = useListBlockedCountriesQuery({
    variables: {
      offset: 0,
      limit: pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  const countries = data?.listBlockedCountries?.data || [];
  const count = countries.length;
  const infiniteStatus = getBottomStatusFromQuery({
    networkStatus,
    currentCount: countries.length,
    totalCount: data?.listBlockedCountries?.count ?? 0,
  });

  const onFetchMore = useCallback(async () => {
    await fetchMore({
      variables: { offset: count },
    });
  }, [count, fetchMore]);

  return (
    <Modal
      testId="chamber-blocked-countries-modal"
      open={isOpen}
      onClose={onClose}
      enableAnimation
      size={ModalSize.L}
      enableCloseButton
      closeButtonStyles={{ enforceLeft: true }}
      hasBackButton
      spacingMode="gap-content"
    >
      <ModalHeader>
        {t(`noumena.chamber_edit.visibility.global_availability`)}
      </ModalHeader>
      <ModalBody noFooter gap={16}>
        <S.CountryDescription>
          <TSpan colorToken="--text-modal-neutral-default" font="body-m">
            {t(`noumena.chamber_edit.visibility.except_countries`)}
          </TSpan>
        </S.CountryDescription>
        {countries.length ? (
          <Infinite
            onFetchMore={onFetchMore}
            status={infiniteStatus}
            width="100%"
          >
            {countries.map((country) =>
              country?.name ? (
                <S.Container key={country.code}>
                  <S.CountryName>
                    <TSpan
                      colorToken="--text-modal-neutral-default"
                      font="body-m"
                    >
                      • {country.name}
                    </TSpan>
                  </S.CountryName>
                </S.Container>
              ) : null,
            )}
          </Infinite>
        ) : (
          <TSpan colorToken="--text-modal-neutral-default">
            no blocked countries
          </TSpan>
        )}
      </ModalBody>
    </Modal>
  );
};

export default BlockedCountriesListModal;
