import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

const Container = styled(Stack).attrs<{ hasInputs: boolean }>(() => ({
  shrink: 0,
  grow: 0,
}))<{ hasInputs: boolean }>`
  padding: ${({ hasInputs }) => (hasInputs ? `8px 0 0` : `0px`)};
  width: 32px;
`;

interface LineNumberProps {
  index: number;
  hasInputs: boolean;
}

export function LineNumber({ index, hasInputs }: LineNumberProps) {
  return (
    <Container hasInputs={hasInputs}>
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        #{index + 1}
      </TSpan>
    </Container>
  );
}
