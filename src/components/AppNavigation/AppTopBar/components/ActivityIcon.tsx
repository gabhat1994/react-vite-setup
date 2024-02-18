import { AnimatedGlassIcon, type GlassIconName } from '@/components/GlassIcon';
import { Tooltip, useTooltip } from '../../Tooltip';
import * as S from '../styles';

interface TopBarActivityIconProps {
  name: GlassIconName;
  label: string;
  isActive?: boolean;
  showDot?: boolean;
  onClick?(): void;
}

export function TopBarActivityIcon({
  name,
  label,
  isActive = false,
  showDot = false,
  onClick,
}: TopBarActivityIconProps) {
  const tooltip = useTooltip<HTMLButtonElement>({
    placement: 'bottom',
    distance: 8,
  });

  return (
    <AnimatedGlassIcon.Provider isActive={isActive}>
      {(iconTriggerProps) => (
        <S.TopBarActivityIconContainer>
          <S.TopBarActivityIconButton
            {...tooltip.triggerProps}
            aria-label={label}
            data-unread={showDot}
            onMouseEnter={(e) => {
              tooltip.triggerProps.onMouseEnter();
              iconTriggerProps.onMouseEnter(e);
            }}
            onMouseLeave={(e) => {
              tooltip.triggerProps.onMouseLeave();
              iconTriggerProps.onMouseLeave(e);
            }}
            icon={<AnimatedGlassIcon.AnimatedIcon name={name} size={28} />}
            onClick={onClick}
          />
          {showDot && <S.TopBarActivityIconDot />}
          <Tooltip {...tooltip.tooltipProps}>{label}</Tooltip>
        </S.TopBarActivityIconContainer>
      )}
    </AnimatedGlassIcon.Provider>
  );
}
