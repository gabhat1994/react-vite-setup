import { t } from 'i18next';

import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useSocialHallContext } from '@/providers';
import { Container, Content, IconContainer } from './styles';

export const BrowserSupport = () => {
  const { setShowBrowserSupportBanner, showBrowserSupportBanner } =
    useSocialHallContext();

  return (
    <Container isVisible={!!showBrowserSupportBanner}>
      <Content>
        <IconContainer>
          <Icon
            name="alert_xs"
            size={10}
            color="--icon-button-neutral-alt-default"
          />
        </IconContainer>
        <Spacer width={8} />
        <TSpan font="body-m" colorToken="--text-infobox-neutral-default">
          {t('noumena.social_hall.browser_not_support')}
        </TSpan>
      </Content>
      <Icon
        name="close_m"
        size={16}
        onClick={() => setShowBrowserSupportBanner(false)}
        color="--icon-infobox-brand-primary-default"
      />
    </Container>
  );
};
