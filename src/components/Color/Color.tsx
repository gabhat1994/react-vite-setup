import * as Styles from './styles';
import { type ColorProps } from './types';

export const Color = ({ color }: ColorProps) => (
  <span>
    <Styles.Color color={color} />
    <Styles.ColorName>{color}</Styles.ColorName>
  </span>
);
