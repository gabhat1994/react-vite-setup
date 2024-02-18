import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const MiniContainer = styled.div`
  width: 100%;
`;

export const SelectBoxContainer = styled.div`
  display: flex;
  padding: 15.5px 0;
  width: 100%;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const SelectBoxText = styled(TSpan)`
  margin-left: 16px;
`;

export const ModalSubHeading = styled.div`
  margin-bottom: 8px;
`;
