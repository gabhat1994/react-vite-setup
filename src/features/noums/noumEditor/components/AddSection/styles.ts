import styled from 'styled-components';
import { systemInfoSmallTypography } from '@/components/Typography';

export const AddSectionComponentWrapper = styled.div`
  height: 24px;
  border-radius: 8px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed var(--border-add-section-neutral-default);
  background: var(--bg-add-section-neutral-default);
  width: 100%;

  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    top: -20px;
    z-index: 999999999;
    ${systemInfoSmallTypography.systemInfoSmall};
  }

  :hover {
    border-color: var(--border-add-section-neutral-hover);
    background-color: var(--bg-add-section-neutral-hover);
    path {
      fill: var(--icon-add-content-brand-primary-default);
    }
  }
`;

export const CenterIcon = styled.div`
  margin: 0 auto;
`;
