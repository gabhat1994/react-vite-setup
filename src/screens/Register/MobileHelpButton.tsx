import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { breakpoints } from '@/constants/devices';
import {
  defaultStyles,
  resetHelpStyles,
  setCSSStyles,
} from '@/features/help/utils';
import { useWindowDimensions } from '@/hooks';
import { Icon } from '@/components/Icon';
import { LogoutContainer } from '@/components/Header/styles';
import { Button } from '@/components/Button';
import { useHelpPanel } from '@/hooks/helpPanel';

const MobileHelpButton = () => {
  const { width } = useWindowDimensions();
  const help = document.querySelector<HTMLIFrameElement>('#launcher-frame');
  const isMobile = width <= breakpoints.MOBILE_MAX;
  const location = useLocation();
  const { toggleHelpPanel } = useHelpPanel();

  useEffect(() => {
    if (!isMobile) return resetHelpStyles('block');
    setTimeout(() => {
      setCSSStyles(help, {
        ...defaultStyles,
        opacity: '0',
        bottom: `unset`,
        top: `4px`,
        transform: 'translateX(120px)',
        'max-width': '156px',
        'z-index': '1000001',
        width: 'unset',
        left: { value: 'unset', priority: 'important' },
        right: { value: '120px', priority: 'important' },
      });
    }, 200);

    return () => resetHelpStyles('none');
  }, [isMobile, width, location.key, help]);

  const handleClick = () => {
    toggleHelpPanel();
  };

  if (!isMobile) return null;
  return (
    <LogoutContainer data-id="mobile-help-button">
      <Button
        textOnly
        size="small"
        onClick={handleClick}
        rightIcon={
          <Icon
            color="--icon-button-brand-primary-default"
            name="question"
            size={24}
          />
        }
      >
        Help
      </Button>
    </LogoutContainer>
  );
};
export default MobileHelpButton;
