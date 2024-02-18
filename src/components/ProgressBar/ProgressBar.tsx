import { type FC } from 'react';
import { Container, Filler, Label } from './styles';

import { type ProgressBarProps } from './types';

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { percentage, isLabel } = props;

  return (
    <Container
      data-testid="pb-container"
      backgroundColor={props.backgroudColor}
    >
      <Filler data-testid="pb-filler" {...props}>
        {isLabel ? (
          <Label data-testid="pb-label">{percentage}%</Label>
        ) : undefined}
      </Filler>
    </Container>
  );
};
