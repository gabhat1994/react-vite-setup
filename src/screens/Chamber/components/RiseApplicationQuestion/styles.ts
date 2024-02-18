import styled from 'styled-components';
import { Button } from '@/components/Button';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';

export const CharacterWrapper = styled.div`
display : flex;
flex-direction row;
gap : 10px;
padding: 8px;
align-self: end;
`;

export const StyledSaveButton = styled(Button)`
  margin-left: auto;
  padding: 16px 32px;
  font-size: var(--font-input-medium-size);
  font-family: var(--font-button-medium-font);
`;

export const StyledSaveButtonTableMobile = styled(Button)`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-button-medium-font);
  margin-left: 12px;
`;

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
