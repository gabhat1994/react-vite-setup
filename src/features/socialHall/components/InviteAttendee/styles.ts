import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';

export const SearchWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const SearchField = styled(TextField)``;

export const SelectedUserWrapper = styled.div`
  padding: 16px 16px 0 16px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 16px;
`;

export const SelectedSpan = styled(TSpan)`
  margin-bottom: 16px;
`;

export const ListWrapper = styled.div`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding-top: 16px;
`;

export const InfiniteObserver = styled.div`
  width: 100%;
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
  padding-right: 16px;
`;

export const UserCategory = styled(TSpan)``;

export const PickedInviteStatus = styled(TSpan)`
  margin-right: 12px;
`;

export const ModalButton = styled(Button)`
  flex: 1;
`;

export const NothingFound = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 65px;
  border-bottom: 1px solid var(--bg-separator-neutral-default); ;
`;
