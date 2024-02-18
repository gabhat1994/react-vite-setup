import { Button, Icon, TSpan } from '@/components';
import { Main, Footer, Body } from '@/layout/NewAuthLayout/childrenStyles';
import { useBreakpoints } from '@/hooks';
import { t } from 'i18next';
import { type SuccessPops } from './accessTypes';
import { OutlineBox } from './stylesv2';

export const Success = ({ onGoToNoumena, loading }: SuccessPops) => {
  const { isMobile } = useBreakpoints();
  return (
    <Main justify="center">
      <OutlineBox>
        <Body>
          <Icon size={144} name="success_cq_xxxl" />
          <TSpan
            font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}
            textAlign="center"
            colorToken="--text-modal-header-neutral-default"
          >
            {t('noumena.account.created')}
          </TSpan>
          <TSpan
            font="body-l"
            textAlign="center"
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.non.member.signup.descruption')}
          </TSpan>
        </Body>
        <Footer>
          <Button
            size="full"
            primary
            onClick={onGoToNoumena}
            loading={loading}
            disabled={loading}
          >
            {t('noumena.go.to.noumena.text')}
          </Button>
        </Footer>
      </OutlineBox>
    </Main>
  );
};
