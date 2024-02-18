import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ellipsisText } from '@/common/globalStyles';
import { Icon } from '@/components/Icon';
import { TSpan } from '../Typography';

interface TagLabelProps {
  bgColor: string;
  color: string;
}

interface TopBackgroundProps {
  bgColor: string;
}

const tagText = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  height: 22px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
`;

export const StoriesCnt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin: 0 auto;
  font-family: var(--font-family);
`;

export const StoriesWrapper = styled.div`
  display: flex;
  height: 254px;
`;

export const ChamberWrapper = styled(Link)<{ cursor: 'auto' | 'pointer' }>`
  position: relative;
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 8px 16px;
  height: 272px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: ${({ cursor }) => cursor};
  text-decoration: none;
`;

export const TopBackground = styled.div<TopBackgroundProps>`
  height: 56px;
  background: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  box-sizing: content-box;
  position: relative;
`;

export const FavouriteIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const AvatarBackground = styled.div<{ archived?: boolean }>`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-badge-neutral-alt-default) 4px solid;
  border-radius: 14px;
  background-color: var(--bg-body-neutral-alt-default);
  ${(props) => props.archived && 'filter: grayscale(100%);'}
  z-index: 1;
`;

export const TagLabel = styled.div<TagLabelProps>`
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-weight: var(--font-body-small-bold-weight);
  font-family: var(--font-footnote-bold-font);
  font-size: 12px;
  text-align: center;
  border: solid var(--border-badge-neutral-alt-default) 2px;
  z-index: 2;
`;

export const HeaderTitle = styled.div<{
  archived?: boolean;
  isMemberNoLocation: boolean;
  isEllipsis?: boolean;
}>`
  font-style: normal;
  font-weight: var(--font-body-large-bold-weight);
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: var(--text-card-header-neutral-highlighted);
  font-family: var(--font-body-large-bold-font);
  ${ellipsisText};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${(props) =>
    props.isEllipsis ? 'white-space: nowrap;' : 'white-space: normal;'}
  word-wrap: break-word;
  ${(props) =>
    props.archived && 'color: var(--text-card-header-neutral-default);'}
  ${(props) => props.isMemberNoLocation && 'margin-top: -85px;'}
`;

export const MemberTitle = styled.span`
  ${ellipsisText}
`;

export const OwnedBy = styled.div<{ archived?: boolean }>`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: var(--text-card-header-neutral-default);
  font-family: var(--font-body-medium-regular-font);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  ${ellipsisText}
  ${(props) =>
    props.archived &&
    css`
      & :first-child {
        background-color: var(--bg-tag-neutral-default);
        padding: 0 8px;
        ${tagText} {
          height: 24px;
          font-size: 14px;
          color: var(--text-tag-neutral-default);
        }
      }
      & :nth-child(2) {
        margin: 0 4px 0 8px;
        padding-bottom: 8px;
      }
    `}
`;

export const OwnedByBold = styled.span`
  font-weight: var(--font-body-small-bold-weight);
  font-family: var(--font-body-medium-bold-font);
  color: var(--text-card-neutral-default);
  ${ellipsisText};
`;

export const UnpublishedNote = styled(TSpan)`
  text-align: center;
  width: 100%;
  display: block;
  margin: auto;
`;

export const BodySection = styled.div`
  padding-top: 52px;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;
export const FooterSection = styled.div<{ hide: boolean }>`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

export const Underline = styled.div`
  min-width: 90%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;
