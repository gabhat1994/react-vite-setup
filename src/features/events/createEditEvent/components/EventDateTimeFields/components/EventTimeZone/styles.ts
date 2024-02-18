import styled from 'styled-components';

import { TextField } from '@/components/TextField';
import { EventFieldRow } from '@/features/events/styles';

export const Container = styled(EventFieldRow)`
  padding: 0;
  border: none;
`;

export const Label = styled(TextField)`
  cursor: pointer;
`;
