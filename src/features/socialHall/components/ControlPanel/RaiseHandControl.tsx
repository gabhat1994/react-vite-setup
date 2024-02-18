import { t } from 'i18next';
import { useMemo } from 'react';
import { useToggle, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { Icon } from '@/components/Icon';
import { useSocialHallCallContext } from '@/providers';
import { HandsUpModal } from '../EventModals/HandsUpModal';
import { ControlPanelIcon } from './styles';

export const RaiseHandControl = () => {
  const { width } = useWindowDimensions();
  const [isOpen, toggle] = useToggle(false);
  const isMobile = useMemo(() => width < breakpoints.MOBILE_MAX, [width]);
  const { showRaiseHand, onToggleRaiseHand } = useSocialHallCallContext();

  return (
    <>
      <ControlPanelIcon
        cursorAllowed
        onClick={onToggleRaiseHand}
        bgColor={
          showRaiseHand
            ? isMobile
              ? 'var(--bg-button-brand-secondary-default)'
              : 'var(--bg-button-brand-primary-default)'
            : undefined
        }
        data-title={
          showRaiseHand
            ? t('noumena.social_hall.Control_panel.hand_rasied')
            : t('noumena.social_hall.Control_panel.raise_hand')
        }
        hoverColor={
          showRaiseHand ? 'var(--bg-button-brand-primary-hover)' : undefined
        }
      >
        <Icon size={24} imageIconName="raise_hand_m" />
      </ControlPanelIcon>
      <HandsUpModal
        isOpen={isOpen}
        onClose={toggle}
        onConfirm={onToggleRaiseHand}
      />
    </>
  );
};
