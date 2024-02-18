import styled from 'styled-components';
import { cssVar, rgba } from 'polished';

import { Stack } from '@/layout';
import { Button as BaseButton } from '@/components';

export const Wrapper = styled(Stack)`
  position: absolute;
  left: 16px;
  bottom: 16px;
  background: var(--bg-card-neutral-alt-default);
  padding: 24px;
  max-width: 360px;
  box-sizing: content-box;
  border-radius: 8px;
  box-shadow: 0 2px 16px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
`;

export const Button = styled(BaseButton)`
  width: auto;
`;
