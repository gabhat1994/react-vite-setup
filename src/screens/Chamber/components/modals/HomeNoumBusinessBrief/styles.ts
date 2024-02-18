import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';

export const StyledForm = styled.form`
  width: 100%;
  overflow-y: auto;
  flex: 1;
  ${noScrollBar}
  label {
    width: fit-content;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
