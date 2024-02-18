import styled from 'styled-components';
import { FieldWrapper } from './FieldWrapper';

export const EventFieldRow = styled(FieldWrapper)<{
  gap?: number;
}>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : `8px`)};
`;
