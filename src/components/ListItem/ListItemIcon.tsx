import { type ListItemIconProps } from './types';
import * as S from './styles';
import { Icon } from '../Icon';

export function ListItemIcon({
  iconName,
  backgroundColor = 'transparent',
}: ListItemIconProps) {
  const backgroundColorValue =
    backgroundColor === 'neutral'
      ? 'var(--bg-button-neutral-default)'
      : 'transparent';

  return (
    <S.IconTile backgroundColor={backgroundColorValue}>
      <Icon name={iconName} size={24} />
    </S.IconTile>
  );
}
