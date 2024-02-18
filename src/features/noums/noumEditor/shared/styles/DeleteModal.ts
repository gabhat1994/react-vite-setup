import styled from 'styled-components';
import Typography from '@/components/Typography';

export const DeleteDescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  color: var(--text-modal-neutral-default);
  ${Typography.bodyTypography.bodyLarge}
`;

export const DeleteDescription = styled.div`
  text-align: center;
`;
