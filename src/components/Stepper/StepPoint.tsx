import { type FC } from 'react';
import { Container, Point, PointBackground } from './styles';
import { type StepProps } from './types';

export const StepPoint: FC<StepProps> = (props) => {
  const { pointNum, onClick } = props;

  return (
    <Container>
      <PointBackground
        {...props}
        data-testid="steppoint-container"
        onClick={() => onClick(pointNum)}
      >
        <Point data-testid="steppoint-point" />
      </PointBackground>
    </Container>
  );
};
