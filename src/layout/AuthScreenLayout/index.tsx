import { type FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useWindowDimensions } from '@/hooks/dimensions';
import loginBG from '@/assets/images/login-bg.png';
import loginBG2X from '@/assets/images/login-bg-2x.png';
import signupBG from '@/assets/images/signup-bg.png';
import confirmBG from '@/assets/images/register-bg.png';
import intialSignUpBG from '@/assets/images/initial_signup_bg.png';
import { breakpoints } from '@/constants/devices';
import { type RootObject } from '@/screens/Register/Steps/StepOne/types';
import * as Storyblok from '@/services/rest/storyblok';
import { IdentityServices } from '@/services/rest/identity';
import MobileHelpButton from '@/screens/Register/MobileHelpButton';
import Logo from '@/components/Logo';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { type AuthScreenLayoutProps } from './types';
import { SideImage, Root, MainContainer, LayoutStyles } from './styles';
import { Stack } from '../Stack';
import { ButtonWrapper } from '../NextAppSignUpLayout/styles';

const background = {
  login: loginBG,
  login2x: loginBG2X,
  signup: signupBG,
  confirm: confirmBG,
  onboarding: intialSignUpBG,
};

const AuthScreenLayout: FC<AuthScreenLayoutProps> = ({
  type,
  children,
  dynamicHeight,
  dynamicWidth,
  overflow,
  showBackButton = false,
  onBackClick,
}) => {
  const { height, width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;
  const styles =
    height < 600 && type !== 'onboarding'
      ? { ...LayoutStyles, minHeight: '500px' }
      : LayoutStyles;
  const componentMounted = useRef(true);
  const [backgroundImage, setBackgroundImage] = useState<string>();

  const [searchParams] = useSearchParams();
  const referralCodeParam = searchParams.get('referral-code') || '';
  const referralCode = referralCodeParam.replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    async function getContent() {
      const res = await IdentityServices.serviceValidateReferralCode(
        referralCode,
      );
      const isValidReferralCode = !!(!res.errorMessage && res.isValid);
      if (isValidReferralCode && componentMounted?.current) {
        try {
          const { data }: { data: RootObject } =
            await Storyblok.getSignUpPageData(referralCode);
          setBackgroundImage(data?.story?.content?.Image);
        } catch (error) {
          /* empty */
        }
      }
    }
    if (referralCode) {
      getContent();
    }

    return () => {
      componentMounted.current = false;
    };
  }, [referralCode]);

  return (
    <Root dynamicHeight={dynamicHeight} dynamicWidth={dynamicWidth}>
      <MainContainer vertical overflow={overflow}>
        <Stack
          justify={isMobile ? 'space-between' : undefined}
          fullWidth={isMobile}
        >
          <Logo />
          <MobileHelpButton />
        </Stack>
        {showBackButton && (
          <ButtonWrapper>
            <Button
              size="small"
              tertiary
              leftIcon={<Icon name="arrow_left_m" size={22} />}
              onClick={onBackClick}
            >
              Back
            </Button>
          </ButtonWrapper>
        )}
        <Stack justify="center" align="center" style={styles}>
          {children}
        </Stack>
      </MainContainer>
      <SideImage background={backgroundImage || background[type]} />
    </Root>
  );
};

export default AuthScreenLayout;
