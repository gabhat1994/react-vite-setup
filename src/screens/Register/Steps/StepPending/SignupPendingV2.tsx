import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main, Body, Footer } from '@/layout/NewAuthLayout/childrenStyles';

import { Button, Icon } from '@/components';
import { t } from 'i18next';
import { useBreakpoints } from '@/hooks';
import { Header, OutlineBox, Paragraph } from './stylesv2';

type SignupPendingV2Props = {
  name: string;
  loading: boolean;
  onContinue: () => void;
};

export const SignupPendingV2 = ({
  name,
  loading,
  onContinue,
}: SignupPendingV2Props) => {
  const { isMobile } = useBreakpoints();
  return (
    <NewAuthLayout>
      <Main justify="center">
        <OutlineBox>
          <Icon name="success_cq_xxxl" size={144} />
          <Body>
            <Header font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}>
              {t('noumena.pending_sign_up.thanyou', { name })}
            </Header>
            <Paragraph>
              {t(`noumena.register.step_pending.description`)}
            </Paragraph>
            <Footer>
              <Button
                data-testid="stepPendingButton"
                primary
                size="full"
                loading={loading}
                disabled={loading}
                onClick={onContinue}
              >
                {t(`noumena.continue_to_noumena`)}
              </Button>
            </Footer>
          </Body>
        </OutlineBox>
      </Main>
    </NewAuthLayout>
  );
};
