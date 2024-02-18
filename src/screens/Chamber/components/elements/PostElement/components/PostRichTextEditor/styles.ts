import { sizes } from '@/constants/devices';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div<{ isEdit?: boolean }>`
  ${({ isEdit }) =>
    isEdit &&
    `border: 1px solid var(--border-card-neutral-highlighted) ;
    border-radius: 8px;
    cursor: text;
    `}
  div.DraftEditor-root {
    ${({ isEdit }) =>
      isEdit &&
      `
        @media (min-width: ${sizes.MOBILE_MAX}) {
          max-height: calc(100vh - 500px);
        }
        height: 350px; 
        padding: 16px; 
        overflow-y: auto; 
        overflow-x: hidden;
        @media (max-width: ${sizes.MOBILE_MAX}) {
          height: calc(100vh - 400px);
        }
        @media (max-width: ${sizes.MOBILE_L}) {
          height: calc(100vh - 450px);
        }
        & > .DraftEditor-editorContainer{
          height: 100%;
        }
      `}

    & + div[data-popper-reference-hidden="false"] {
      max-height: 200px;
      overflow: scroll;
    }

    span,
    li::before {
      color: var(--text-input-neutral-filled);
    }

    .header-one > div,
    .header-two > div {
      margin: 4px 0;
    }
  }
`;

export const ToolbarContainer = styled.div<{ isMobile?: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? `8px;` : '16px;')};
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  & > div {
    box-shadow: none;
    border: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > div {
      margin: 0 12px;
      ${({ isMobile }) => isMobile && `margin: 0 4px;`}
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      & > button {
        cursor: pointer;
        background: var(--bg-card-neutral-alt-default);
        font-size: 16px;
        font-weight: bold;
        ${({ isMobile }) => isMobile && `width: 32px; padding: 0px;`}
      }
    }
  }
`;

export const MentionLink = styled(Link)`
  color: var(--text-search-highlight-brand-primary-default);
  background-color: var(--bg-search-highlight-brand-secondary-default);
  text-decoration: none;
  display: inline-block;
`;
