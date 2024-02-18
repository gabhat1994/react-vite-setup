import * as S from './styles';
import { type OverlayProps } from './types';

const Overlay = ({ zIndex, type }: OverlayProps) => (
  <S.Overlay $zIndex={zIndex} $type={type} />
);

export default Overlay;
