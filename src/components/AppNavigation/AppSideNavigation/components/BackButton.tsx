import { Icon } from '@/components/Icon';
import { Tooltip, useTooltip } from '../../Tooltip';
import S from './styles';

interface CreateButtonProps {
  title: string;
  onClick(): void;
}

export function BackButton({ title, onClick }: CreateButtonProps) {
  const tooltip = useTooltip<HTMLButtonElement>({ distance: 16 });

  return (
    <>
      <S.IconButton
        {...tooltip.triggerProps}
        icon={<Icon name="arrow_left_m" size={16} />}
        onClick={onClick}
        aria-label={title}
      />

      <Tooltip {...tooltip.tooltipProps} isOpen={tooltip.tooltipProps.isOpen}>
        {title}
      </Tooltip>
    </>
  );
}
