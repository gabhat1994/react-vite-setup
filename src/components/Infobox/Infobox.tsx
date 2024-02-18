import S from './styles';
import { type InfoboxSize, type InfoboxType } from './types';

interface InfoboxProps {
  children: React.ReactNode;
  size?: InfoboxSize;
  type: InfoboxType;
}

export function Infobox({ children, type, size = 'default' }: InfoboxProps) {
  return (
    <S.Container $type={type} $size={size}>
      {children}
    </S.Container>
  );
}
