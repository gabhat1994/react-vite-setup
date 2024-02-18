import styled from 'styled-components';
import { EventItemWrapper } from '../../components/EventItem/styles';

export const EventItemContainer = styled.div`
  width: 100%;
  ${EventItemWrapper} {
    padding: 24px 16px;
    border-radius: 8px;
    border: 1px solid var(--border-card-neutral-highlighted);
  }
`;
