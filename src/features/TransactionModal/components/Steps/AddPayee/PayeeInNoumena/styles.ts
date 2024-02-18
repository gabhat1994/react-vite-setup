import styled from 'styled-components';
import { defaultScrollBar } from '@/common/globalStyles';
import { Icon } from '@/components/Icon';
import { sizes } from '@/constants/devices';

export const Payee = styled.div`
  width: 390px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }
`;
export const Avatar = styled.img`
  width: 24px;
  height: 24px;
`;
export const Account = styled.div`
  width: 75%;
`;
export const Details = styled.div`
  width: 100%;
  text-align: left;
`;

export const List = styled.div`
  width: 100%;
  height: 155px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    height: 100%;
  }
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  ${defaultScrollBar};
`;

export const Close = styled(Icon)`
  cursor: pointer;
`;
