import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { Button } from '@/components/Button';
import { singleLineEllipisText } from '@/common/globalStyles';

export const NoUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const NoUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${sizes.MOBILE_L}) {
    height: calc(100vh - 225px);
  }
`;

export const NoUserDescription = styled(TSpan)`
  text-align: center;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  min-height: 86px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const UserBody = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
`;
export const UserTitle = styled(TSpan)`
  width: 100%;
  max-width: 100%;
  ${singleLineEllipisText}
  word-break: break-word;
  white-space: break-spaces;
`;
export const DropdownPicker = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const PickedPermission = styled(TSpan)`
  margin-right: 12px;
`;

export const ModalButtons = styled(Button)`
  width: 100%;
`;
