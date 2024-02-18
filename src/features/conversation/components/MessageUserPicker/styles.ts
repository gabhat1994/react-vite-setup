import styled, { css } from 'styled-components';
import { TSpan } from '@/components/Typography';

export const Container = styled.div`
  width: 100%;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TagLabel = styled.div`
  background-color: var(--bg-tag-brand-primary-default);
  color: var(--text-tag-neutral-alt-default);
  border-radius: 8px;
  padding: 0 8px;
  font-weight: var(--font-body-small-bold-weight);
  font-family: var(--font-footnote-bold-font);
  font-size: 12px;
  text-align: center;
  border: solid var(--border-badge-neutral-alt-default) 2px;
`;

export const SearchContainer = styled.div<{ focused?: boolean }>`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  transition: border 0.2s linear;
  ${({ focused }) =>
    focused
      ? css`
          background-color: var(--bg-input-brand-primary-hover);
          border-color: var(--border-input-brand-primary-default);
        `
      : css`
          background-color: var(--bg-input-neutral-default);
          border-color: transparent;
        `}
`;

export const InputWrapper = styled.div<{ focused?: boolean }>`
  flex: 1;

  display: flex;
  align-items: center;
  min-height: 34px;
  padding-left: 12px;

  ${(props) =>
    props.focused
      ? `
          min-width: 50px;
        `
      : `
          width: 0px;
        `}
`;

export const InputField = styled.input`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-input-medium-regular-font);
  font-weight: var(--font-body-medium-regular-weight);
  color: var(--text-input-neutral-filled);
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background-color: transparent;

  ::placeholder {
    color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--text-input-neutral-default);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--text-input-neutral-default);
  }
`;

export const SelectedUser = styled.div<{ multiselect?: boolean }>`
  padding: 2px;
  & > span {
    background-color: ${({ multiselect }) =>
      multiselect
        ? `var(--bg-tag-neutral-alt-default) !important;`
        : `transparent !important;`};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const OptionRendererWrapper = styled.div`
  overflow-y: auto;
`;

export const AvatarWrapper = styled.div``;

export const UserSearchDropDownInfobox = styled(TSpan)`
  margin: 8px 16px;
`;
