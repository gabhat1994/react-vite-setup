import MobileHelpButton from '@/screens/Register/MobileHelpButton';
import Logo from '@/components/Logo';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks';
import { t } from 'i18next';
import routes from '@/constants/routes';
import { type NewAuthLayoutProps } from './types';
import {
  Root,
  MainContainer,
  ChildrenStack,
  HeaderStack,
  ButtonWrapper,
} from './styles';
import { Stack } from '../Stack';

const NewAuthLayout = ({
  children,
  dynamicHeight,
  dynamicWidth,
  overflow,
  onBackClick,
  showBackButton,
  align = 'center',
  disableBackButton,
  fullHeightChildren = true,
  minHeightChildren,
}: NewAuthLayoutProps) => {
  const device = useBreakpoints();
  const navigate = useNavigate();
  return (
    <Root dynamicHeight={dynamicHeight} dynamicWidth={dynamicWidth}>
      <MainContainer vertical overflow={overflow}>
        <HeaderStack
          vertical={!device.isMobile}
          gap={!device.isMobile ? 30 : undefined}
          justify={device.isMobile ? 'space-between' : undefined}
          fullWidth={device.isMobile}
          reverse={device.isMobile}
          align="center"
        >
          <MobileHelpButton />
          <Stack
            gap={16}
            reverse={device.isMobile}
            align="center"
            vertical={!device.isMobile}
          >
            <Logo handleLogoClick={() => navigate(routes.LOGIN)} />
            {showBackButton && (
              <ButtonWrapper>
                <Button
                  size="small"
                  tertiary
                  leftIcon={<Icon name="arrow_left_m" size={22} />}
                  onClick={onBackClick}
                  disabled={disableBackButton}
                >
                  {device.isMobile ? '' : t('noumena.back.text')}
                </Button>
              </ButtonWrapper>
            )}
          </Stack>
        </HeaderStack>
        <ChildrenStack
          justify={align}
          fullHeight={fullHeightChildren}
          minHeight={minHeightChildren}
        >
          {children}
        </ChildrenStack>
      </MainContainer>
    </Root>
  );
};

export default NewAuthLayout;
