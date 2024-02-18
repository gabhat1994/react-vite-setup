import styled from 'styled-components';
import { Stack } from '@/layout';

const DateFieldsContainer = styled(Stack)`
  padding: 16px;
  border-bottom: 1px solid var(--border-card-neutral-default);
`;

const CaptionNavigation = styled(Stack)`
  color: var(--text-datepicker-neutral-highlighted);
  padding: 8px 0;
`;
export default {
  DateFieldsContainer,
  CaptionNavigation,
};
