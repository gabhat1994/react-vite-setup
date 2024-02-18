import { type FC } from 'react';
import { useWindowDimensions } from '@/hooks/dimensions';
import { breakpoints } from '@/constants/devices';
import MobileHelpButton from '@/screens/Register/MobileHelpButton';
import Logo from '@/components/Logo';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { type NextAppSignUpLayoutProps } from './types';
import {
  Root,
  MainContainer,
  LayoutStyles,
  HeaderStack,
  ButtonWrapper,
} from './styles';
import { Stack } from '../Stack';

const NextAppSignUpLayout: FC<NextAppSignUpLayoutProps> = ({
  children,
  dynamicHeight,
  dynamicWidth,
  overflow,
  onBackClick,
  showBackButton,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;
  const { t } = useTranslation();

  return (
    <Root dynamicHeight={dynamicHeight} dynamicWidth={dynamicWidth}>
      <MainContainer vertical overflow={overflow}>
        <HeaderStack
          justify={isMobile ? 'space-between' : undefined}
          fullWidth={isMobile}
        >
          <Logo />
          <MobileHelpButton />
        </HeaderStack>
        {showBackButton && (
          <ButtonWrapper>
            <Button
              size="small"
              tertiary
              leftIcon={<Icon name="arrow_left_m" size={22} />}
              onClick={onBackClick}
            >
              {t('noumena.back.text')}
            </Button>
          </ButtonWrapper>
        )}
        <Stack style={LayoutStyles}>{children}</Stack>
      </MainContainer>
    </Root>
  );
};

export default NextAppSignUpLayout;
