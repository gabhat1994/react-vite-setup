import { t } from 'i18next';
import { Button, Icon, TSpan } from '@/components';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks';
import * as S from '../stylesv2';

type SuccessProps = {
  onLogin: () => void;
};

export const Success = ({ onLogin }: SuccessProps) => {
  const { isMobile } = useBreakpoints();
  return (
    <S.Container>
      <S.Form>
        <S.Body gap={16} align="center" fullWidth>
          <Stack vertical gap={16} align="center">
            <Icon name="success_cq_xxxl" size={134} />
            <TSpan
              font="heading-m-bold"
              colorToken="--text-modal-header-neutral-default"
              textAlign="center"
            >
              {t('noumena.reset.password.success.heading')}
            </TSpan>
            <TSpan
              font="body-l"
              colorToken="--text-body-neutral-default"
              textAlign="center"
            >
              {t('noumena.reset.password.success.sub.heading')}
            </TSpan>
          </Stack>

          {!isMobile && (
            <Button onClick={onLogin} size="full" primary>
              {t('noumena.reset_password.success.login')}
            </Button>
          )}
        </S.Body>
      </S.Form>
      {isMobile && (
        <S.Footer>
          <Button onClick={onLogin} size="full" primary>
            {t('noumena.reset_password.success.login')}
          </Button>
        </S.Footer>
      )}
    </S.Container>
  );
};
