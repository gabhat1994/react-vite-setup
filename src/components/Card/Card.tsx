import { forwardRef, type Ref } from 'react';
import * as Styles from './styles';
import { type ICard } from './types';

export const Card = forwardRef(
  (
    { children, bgImageUrl = '', bgImagePosition = '', ...rest }: ICard,
    ref: Ref<HTMLDivElement>,
  ) => (
    <Styles.CardStyled
      ref={ref}
      data-testid="card"
      bgImageUrl={bgImageUrl}
      bgImagePosition={bgImagePosition}
      {...rest}
    >
      {children}
    </Styles.CardStyled>
  ),
);

export default Card;
