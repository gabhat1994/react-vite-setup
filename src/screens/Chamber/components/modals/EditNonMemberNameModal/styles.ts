import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const StyledForm = styled.form`
  width: 100%;
  label {
    width: fit-content;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    display: flex;
    flex-direction: column;
  }
`;
