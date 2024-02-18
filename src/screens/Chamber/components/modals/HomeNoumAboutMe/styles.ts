import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const ImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  div {
    margin: auto;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    text-align: left;
    div {
      margin: 0;
    }
  }
`;

export const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledForm = styled.form`
  width: 100%;
  label {
    width: fit-content;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
