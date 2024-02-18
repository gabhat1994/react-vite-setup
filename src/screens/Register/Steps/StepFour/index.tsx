import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { useAuth } from '@/features/auth/contexts';
import { type SignUpFormProps } from './types';
import { ButtonContainer, PageStyled } from './styles';

const SignFour: FC<SignUpFormProps> = ({ userInfo, userOutput }) => {
  const { signUp } = useAuth();
  const buttonHandler = () => {
    if (userOutput) {
      signUp();
    }
  };
  const { t } = useTranslation();

  return (
    <PageStyled data-testid="stepFourContainer">
      <Spacer height={138} />
      <TSpan
        colorToken="--text-body-header-neutral-default"
        font="heading-l-bold"
        $fill
      >
        {t(`noumena.sign_up.success_page.title`)}, {userInfo?.firstName}!
      </TSpan>
      <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
        {t(`noumena.register.success_page.sub_title`)}
      </TSpan>
      <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
        {t(`noumena.register.success_page.description`)}
      </TSpan>
      <ButtonContainer>
        <Button
          data-testid="stepFourButton"
          primary
          size="full"
          onClick={buttonHandler}
        >
          {t(`noumena.continue_to_noumena`)}
        </Button>
      </ButtonContainer>
    </PageStyled>
  );
};

export default SignFour;
