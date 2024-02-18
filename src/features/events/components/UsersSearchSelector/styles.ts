import styled from 'styled-components';

import { Stack } from '@/layout';
import { devices } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { DropdownContainer } from '@/components/Dropdown';

export const UsersSearchSelectorWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${DropdownContainer} {
    box-shadow: none;
  }
`;

export const AvatarWrapper = styled.div``;

export const UsersOptionRendererContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 98vh;
  width: inherit;

  @media ${devices.TABLET} {
    height: max-content;
  }
`;

export const UsersOptionsContainer = styled(Stack)`
  position: relative;
  align-items: stretch;
  @media ${devices.TABLET} {
    max-height: 300px;
    flex: none;
  }
`;

export const ItemGroupName = styled(TSpan)`
  margin: 8px 12.5px 0;
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 24px !important;
  position: relative;
`;

export const SelectedUserWrapper = styled.div<{ multiselect?: boolean }>`
  padding: 2px;
  & > span {
    background-color: ${({ multiselect }) =>
      multiselect
        ? `var(--bg-tag-neutral-alt-default) !important;`
        : `transparent !important;`};
  }
`;

export const EventUsersViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

export const EventUsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserOptionContainer = styled(Stack)<{
  isMobile: boolean;
  hasContent: boolean;
}>`
  ${({ isMobile, hasContent }) =>
    isMobile &&
    `
height: ${hasContent ? 'calc(100vh - 270px)' : '20px'};
overflow: auto;
`}
`;
