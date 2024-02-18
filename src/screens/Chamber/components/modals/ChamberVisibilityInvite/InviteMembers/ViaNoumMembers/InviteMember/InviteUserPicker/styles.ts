import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SearchContainer = styled.div<{ focused?: boolean }>`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  min-height: 56px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  transition: border 0.2s linear;
  background-color: var(--bg-input-neutral-default);
  border-color: ${({ focused }) =>
    focused ? `var(--border-input-brand-primary-default);` : `transparent`};
`;

export const InputWrapper = styled.div`
  flex: 1;
  min-width: 50px;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-family);
  color: var(--text-input-neutral-default);
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  padding: 0 !important;
  -webkit-text-fill-color: var(--text-input-neutral-filled);
  ::placeholder {
    font-family: var(--font-input-medium-regular-font);
    color: var(--text-input-neutral-default);
    -webkit-text-fill-color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }
`;

export const SelectedUser = styled.div`
  padding: 2px;
  align-items: center;
  display: flex;
`;

export const AvatarWrapper = styled.div``;
