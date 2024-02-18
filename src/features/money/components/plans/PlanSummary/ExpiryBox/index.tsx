import { memo } from 'react';
import { TSpan } from '@/components/Typography';
import { Container, ValueBox } from './styles';

interface IExpiryBox {
  name: string;
  value: string;
}

export const ExpiryBox = memo(({ name, value }: IExpiryBox) => (
  <Container>
    <ValueBox>
      <TSpan font="footnote" colorToken="--text-card-neutral-default">
        {name}
      </TSpan>
      <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
        {value}
      </TSpan>
    </ValueBox>
  </Container>
));

export default ExpiryBox;
