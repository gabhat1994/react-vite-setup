import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';

export const NotificationFiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  flex-shrink: 0;

  & > form {
    gap: 12px;

    & > div {
      margin: 0 0 8px;
    }
  }
  ${noScrollBar}
`;
