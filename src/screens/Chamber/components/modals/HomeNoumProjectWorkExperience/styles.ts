import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { noScrollBar } from '@/common/globalStyles';
import { Button } from '@/components/Button';

export const ImageWrapper = styled.div`
  margin: 0 auto;
`;

export const FormElements = styled.div<{
  isAddedOption?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${({ isAddedOption }) =>
    !isAddedOption && 'height: 553px; justify-content: center;'}
  ${noScrollBar}
`;

export const StyledHeaderWrapper = styled.div`
  width: 100%;
  text-align: center;
  div {
    margin: auto;
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    div {
      margin: 0;
    }
  }
`;

export const AddExpButtonWrapper = styled.div`
  display: inline-flex;
  width: 100%;

  button {
    @media (max-width: ${sizes.TABLET_L}) {
      width: 100%;
      button {
        z-index: 1001;
      }
    }
  }
  justify-content: center;
`;

export const StyledTitle = styled(TSpan)`
  margin-left: auto;
  margin-right: auto;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    float: left;
  }
`;

export const AddNewListItemButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`;
