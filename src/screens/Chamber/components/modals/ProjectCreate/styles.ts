import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Button } from '@/components/Button';

export const ProfileImage = styled.div<{
  isUpdateMode?: boolean;
}>`
  display: ${({ isUpdateMode }) => (isUpdateMode ? 'block' : 'flex')};
  width: ${({ isUpdateMode }) => (isUpdateMode ? '40%' : '100%')};
  justify-content: center;
  @media (max-width: ${sizes.TABLET_L}) {
    width: 100%;
  }
`;

export const StyledButton = styled(Button)<{ isUpdateMode?: boolean }>`
  ${({ isUpdateMode }) => (isUpdateMode ? 'width: 117px' : 'flex: 1')};
  @media (max-width: ${sizes.TABLET_L}) {
    ${({ isUpdateMode }) => (isUpdateMode ? 'width: 100%' : 'flex: 1')};
  }
`;

export const StyledDropDownWrapper = styled.div`
  width: 100%;
`;

export const FormContainer = styled.div<{
  isUpdateMode?: boolean;
}>`
  display: flex;
  width: ${({ isUpdateMode }) => (isUpdateMode ? '405px' : `100%`)};
  @media (max-width: ${sizes.TABLET_L}) {
    width: 100%;
  }
`;
