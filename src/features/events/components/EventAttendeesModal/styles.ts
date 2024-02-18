import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
`;

export const ListWrapper = styled.div`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
`;

export const NoBlockedWrapper = styled.div`
  padding-top: 24px;
`;

export const NoBlockedTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding-top: 21.5px;
  padding-bottom: 21.5px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  height: 84px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding-left: 16px;
  box-sizing: border-box;
  background: var(--bg-tablecell-neutral-alt-default);
`;

export const UserBody = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;

export const UserName = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin-left: 10px;
`;

export const UserCategory = styled(TSpan)``;

export const PickedInviteStatus = styled(TSpan)`
  margin-right: 12px;
`;

export const LoadingWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  z-index: -1;
  background: transparent;
  transition: all 0.2s linear;

  ${({ visible }) =>
    visible &&
    `
      z-index: 1;
      background: #ffffff90;
    `}
`;

export const NameSpan = styled(TSpan)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const ActionBtnContainer = styled(NameSpan)``;

export const IconButton = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: var(--bg-button-neutral-default);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropdownContainer = styled.div`
  [data-testid='dropdown-container'] {
    width: 100px;
  }
`;
