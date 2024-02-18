import { Button, TSpan } from '@/components';
import { Main, Footer, Body } from '@/layout/NewAuthLayout/childrenStyles';
import { useBreakpoints } from '@/hooks';
import { t } from 'i18next';
import { type InvalidLinkPops } from './accessTypes';
import { OutlineBox } from './stylesv2';

export const InValidLink = ({ onGoToLogin }: InvalidLinkPops) => {
  const { isMobile } = useBreakpoints();
  return (
    <Main justify="center">
      <OutlineBox>
        <Body>
          <TSpan
            font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}
            textAlign="center"
            colorToken="--text-modal-header-neutral-default"
          >
            {t('noumena.invalid.link')}
          </TSpan>
          <TSpan
            font="body-l"
            textAlign="center"
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.invalid.link.helper.text')}
          </TSpan>
        </Body>
        <Footer>
          <Button size="full" primary onClick={onGoToLogin}>
            {t('noumena.login.button.text')}
          </Button>
        </Footer>
      </OutlineBox>
    </Main>
  );
};
