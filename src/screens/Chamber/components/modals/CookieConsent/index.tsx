import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import styled from 'styled-components';
import { useBreakpoints } from '@/hooks';
import { useCookieConsent } from '@/providers/CookieProvider/context';

const Container = styled(Stack)<{ isDesktop: boolean; isTablet: boolean }>`
  border-radius: 16px;
  bottom: 40px;
  width: ${(props) => (props.isDesktop ? '736px' : 'auto')};
  left: ${(props) => (props.isDesktop ? '25%' : '0%')};
  background: var(--bg-card-neutral-alt-default);
  box-shadow: 0px 4px 32px 0px rgba(32, 17, 62, 0.08);
  z-index: 2147483647;
  position: absolute;
  margin-left: ${(props) => (props.isTablet ? '16px' : 'unset')};
  margin-right: ${(props) => (props.isTablet ? '16px' : 'unset')};
`;

const CookieConsentComponent = () => {
  const { t } = useTranslation();
  const { isDesktop, isTablet } = useBreakpoints();
  const { accept, onMoreInfoClick } = useCookieConsent();

  return (
    <Container
      isDesktop={isDesktop}
      isTablet={isTablet}
      vertical
      gap={16}
      padding={16}
      justify="center"
      align="start"
    >
      <Stack vertical gap={8}>
        <TSpan font="body-xl-bold" colorToken="--text-card-neutral-highlighted">
          {t('noumena.cookie-consent-modal.header')}
        </TSpan>
        <TSpan
          font="body-m"
          colorToken="--text-card-neutral-default"
          textAlign="justify"
        >
          {t('noumena.cookie-consent-modal.body')}
        </TSpan>
      </Stack>
      <Stack gap={12} align="start">
        <Button size="small" secondary onClick={onMoreInfoClick}>
          {t('noumena.cookie-consent-modal.moreinfo-btn')}
        </Button>
        <Button size="small" primary onClick={accept}>
          {t('noumena.cookie-consent-modal.accept-btn')}
        </Button>
      </Stack>
    </Container>
  );
};

export default CookieConsentComponent;
