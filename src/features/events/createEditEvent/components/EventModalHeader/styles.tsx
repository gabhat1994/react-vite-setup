import styled from 'styled-components';
import {
  ModalTitleWrapper,
  ModalHeader as ModalHeaderStyled,
} from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';

export const ModalHeader = styled(ModalHeaderStyled)`
  padding-top: 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: flex-start;
  ${ModalTitleWrapper} {
    max-width: inherit;
    align-items: center;
    margin: 0;
    flex-grow: 1;
    @media (min-width: ${sizes.LAPTOP}) {
      flex-direction: row-reverse;
    }
  }
`;

export const HeaderContent = styled(Stack)`
  max-width: inherit;
  margin: 0;
  button {
    position: absolute;
  }
  @media (min-width: ${sizes.LAPTOP}) {
    flex-direction: row-reverse;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    margin-top: -56px;
  }
`;

export const LabelContainer = styled(Stack)`
  height: 40px;
`;
