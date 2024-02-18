import { DatePickerWrapper } from '@/components/DatePicker/styles';
import { sizes } from '@/constants/devices';
import styled from 'styled-components';

export const StyledTabWrapper = styled.div<{
  fullWidth?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-top: 0;
  }
`;

export const DatePickerContainer = styled(DatePickerWrapper)`
  width: 100%;
  position: relative;
  background-color: var(--bg-datepicker-neutral-alt-default);
  overflow: hidden;

  &:hover {
    background-color: var(--bg-datepicker-neutral-alt-default);
  }

  & > div {
    margin: 0;
  }
`;
