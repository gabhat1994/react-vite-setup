import styled from 'styled-components';

import { Button } from '@/components';
import { devices } from '@/constants/devices';
import { inputTypography } from '@/components/Typography';

export const SearchUsersActionButton = styled(Button)`
  background-color: transparent !important;
  min-width: unset;
  min-height: unset;
  padding: 0;
`;

export const SearchUsersContainer = styled.div<{
  focused?: boolean;
  isOpened?: boolean;
}>`
  width: ${({ isOpened }) => (isOpened ? `calc(100% - 32px)` : `100%`)};
  margin: ${({ isOpened }) => (isOpened ? `0 16px` : `0`)};
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  padding: 8px;
  transition: border 0.2s linear;
  background-color: var(--bg-input-neutral-default);
  border-color: ${({ focused }) =>
    focused ? `var(--border-input-brand-primary-default);` : `transparent`};

  @media ${devices.TABLET} {
    margin: 0;
    width: 100%;
  }
`;

export const SearchUsersHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 24px 16px;

  @media ${devices.TABLET} {
    display: none;
  }
`;

export const SearchUsersModalTitle = styled.div`
  width: 100%;
  padding-top: 20px;
  color: var(--text-modal-header-neutral-default);
  font-family: var(--font-family);
  font-size: var(--font-header-xsmall-size);
  line-height: var(--font-header-xsmall-lineheight);
  font-weight: var(--font-header-xsmall-bold-weight);
`;

export const SearchUsersWrapper = styled.div<{ isOpened?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ isOpened }) => (isOpened ? `column` : 'row')};
  padding-bottom: 16px;

  @media ${devices.TABLET} {
    padding-bottom: 0;
    flex-direction: row;
  }
`;

export const SearchInputWrapper = styled.div<{
  focused?: boolean;
  hasSelectedOption: boolean;
}>`
  flex: 1;
  padding: ${({ hasSelectedOption }) =>
    hasSelectedOption ? `6px 8px` : `6px 12px`};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 34px;

  ${({ focused }) => (focused ? `min-width: 50px;` : `width: 0px;`)}
`;

export const SearchInputField = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background-color: transparent;
  color: var(--text-input-neutral-filled);
  ::placeholder {
    color: var(--text-input-neutral-default);
    -webkit-text-fill-color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }
  ${inputTypography.inputMedium}
`;

export const CancelSearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  display: none;

  @media ${devices.TABLET} {
    display: flex;
  }
`;

export const SearchIconWrapper = styled.div`
  margin: 0 -4px 0 12px;
`;
