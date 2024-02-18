import styled from 'styled-components';
import { Button } from '@/components';
import { Stack } from '@/layout';
import { Separator } from '@/components/Separator/Separator';

export const StyledBottomSheetHeader = styled(Stack)`
  justify-content: center;
`;

export const StyledBottomSheetCloseButton = styled(Button)`
  position: absolute;
`;

export const StyledSeparator = styled(Separator)`
  height: 5px;
  margin: 21px auto -8px;
  width: 134px;
  background: var(--bg-overlay-neutral-dark);
  border-radius: 100px;
`;
