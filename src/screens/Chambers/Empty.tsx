import { type FC } from 'react';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack/Spacer';
import { EmptyCardContainer, PlantContainer } from './styles';
import { getEmptyDescription, getEmptyHeading } from './helper';

interface IEmpty {
  tab?: string;
}

const Empty: FC<IEmpty> = ({ tab }: IEmpty) => (
  <EmptyCardContainer>
    <Card>
      <PlantContainer>
        <Spacer height={16} />
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {getEmptyHeading(tab)}
        </TSpan>
        <TSpan font="footnote" colorToken="--text-card-neutral-default">
          {getEmptyDescription(tab)}
        </TSpan>
      </PlantContainer>
    </Card>
  </EmptyCardContainer>
);

export default Empty;
