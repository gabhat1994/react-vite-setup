import styled, { css } from 'styled-components';
import { bodyTypography } from '@/components/Typography/index';
import { ellipsisText } from '@/common/globalStyles';
import { type CommonChipsProps } from './types';

export const ChipsText = styled.span`
  user-select: none;
  color: var(--text-skillbadge-brand-primary-selected);
  ${bodyTypography.bodyLarge};
`;

const chipsLarge = css`
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 24px;
  min-width: 40px;
  height: 23px;
  max-height: 39px;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${ChipsText} {
    ${bodyTypography.bodyLarge};
    :first-child {
      padding-left: 12px;
    }
    :last-child {
      padding-right: 12px;
    }
  }
`;

const chipsMedium = css`
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 24px;
  min-width: 20px;
  height: 22px;
  max-height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${ChipsText} {
    ${bodyTypography.bodyMedium};
    :first-child {
      padding-left: 8px;
    }
    :last-child {
      padding-right: 8px;
    }
  }
`;

const ChipsPrimary = css`
  background-color: var(--bg-skillbadge-brand-secondary-selected);

  path {
    fill: var(--text-skillbadge-brand-primary-selected);
  }

  ${ChipsText} {
    color: var(--text-skillbadge-brand-primary-selected);
  }
`;

const ChipsSecondary = css`
  background-color: var(--bg-skillbadge-neutral-default);

  path {
    fill: var(--text-skillbadge-neutral-default);
  }

  ${ChipsText} {
    color: var(--text-skillbadge-neutral-default);
  }
`;

const ChipsTextOnly = css`
  background-color: transparent;
  border: none;

  ${ChipsText} {
    ${bodyTypography.bodyLarge};
    color: var(--text-skillbadge-brand-primary-selected);
  }
`;

const chipsBaseCss = css`
  position: relative;
  display: inline-flex;
  border: none;
  cursor: pointer;
  vertical-align: middle;
  height: 30px;
  max-height: 30px;
  min-width: 52px;
  align-items: center;
  ${chipsMedium}

  ${ChipsText} {
    flex: 0 1 auto;
    ${ellipsisText}
    color: var(--text-skillbadge-neutral-default);
  }
`;

export const ChipsLeftIconStyled = styled.span<CommonChipsProps>`
  padding-left: 8px;
  padding-right: 4px;
`;

export const ChipsRightIconStyled = styled.span<CommonChipsProps>`
  padding-right: 8px;
  padding-left: 4px;
`;

export const StyledWrapper = styled.span<CommonChipsProps>`
  display: flex;
`;

export const ChipsStyled = styled.span<CommonChipsProps>`
  ${chipsBaseCss}
  ${ChipsPrimary}
  ${(props) => props.size === 'large' && chipsLarge}
  ${(props) => props.size === 'medium' && chipsMedium}
  ${(props) => props.secondary && ChipsSecondary}
  ${(props) => props.textOnly && ChipsTextOnly}
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}`}
`;
