import styled, { css } from 'styled-components';
import { type Property } from 'csstype';
import { singleLineEllipisText } from '@/common/globalStyles';

const fontFamily = css`
  font-family: var(--font-family);
`;

const headingXXLarge = css`
  font-size: var(--font-header-xxlarge-size);
  line-height: var(--font-header-xxlarge-lineheight);
  font-weight: var(--font-header-xxlarge-regular-weight);
  font-family: var(--font-header-xxlarge-regular-font);
`;

const headingXXLargeBold = css`
  ${headingXXLarge}
  font-weight: var(--font-header-xxlarge-bold-weight);
  font-family: var(--font-header-xxlarge-bold-font);
`;

const headingXLarge = css`
  font-size: var(--font-header-xlarge-size);
  line-height: var(--font-header-xlarge-lineheight);
  font-weight: var(--font-header-xlarge-regular-weight);
  font-family: var(--font-header-xlarge-regular-font);
`;

const headingXLargeBold = css`
  ${headingXLarge}
  font-weight: var(--font-header-xlarge-bold-weight);
  font-family: var(--font-header-xlarge-bold-font);
`;

const headingLarge = css`
  font-size: var(--font-header-large-size);
  line-height: var(--font-header-large-lineheight);
  font-weight: var(--font-header-large-regular-weight);
  font-family: var(--font-header-large-regular-font);
`;

const headingLargeBold = css`
  ${headingLarge}
  font-weight: var(--font-header-large-bold-weight);
  font-family: var(--font-header-large-bold-font);
`;

const headingMedium = css`
  font-size: var(--font-header-medium-size);
  line-height: var(--font-header-medium-lineheight);
  font-weight: var(--font-header-medium-regular-weight);
  font-family: var(--font-header-medium-regular-font);
`;

const headingMediumBold = css`
  ${headingMedium}
  font-weight: var(--font-header-medium-bold-weight);
  font-family: var(--font-header-medium-bold-font);
`;

const headingSmall = css`
  font-size: var(--font-header-small-size);
  line-height: var(--font-header-small-lineheight);
  font-weight: var(--font-header-small-regular-weight);
  font-family: var(--font-header-small-regular-font);
`;

const headingSmallBold = css`
  ${headingSmall}
  font-weight: var(--font-header-small-bold-weight);
  font-family: var(--font-header-small-bold-font);
`;

const headingXSmall = css`
  font-size: var(--font-header-xsmall-size);
  line-height: var(--font-header-xsmall-lineheight);
  font-weight: var(--font-header-xsmall-regular-weight);
  font-family: var(--font-header-xsmall-regular-font);
`;

const headingXSmallBold = css`
  ${headingXSmall}
  font-weight: var(--font-header-xsmall-bold-weight);
  font-family: var(--font-header-xsmall-bold-font);
`;

export const headingTypography = {
  headingXXLarge,
  headingXXLargeBold,
  headingXLarge,
  headingXLargeBold,
  headingLarge,
  headingLargeBold,
  headingMedium,
  headingMediumBold,
  headingSmall,
  headingSmallBold,
  headingXSmall,
  headingXSmallBold,
};

const linkXLarge = css`
  font-size: var(--font-link-xlarge-size);
  line-height: var(--font-link-xlarge-lineheight);
  font-weight: var(--font-link-xlarge-weight);
  text-decoration-line: underline;
  font-family: var(--font-link-xlarge-font);
`;

const linkLarge = css`
  font-size: var(--font-link-large-size);
  line-height: var(--font-link-large-lineheight);
  font-weight: var(--font-link-large-weight);
  text-decoration-line: underline;
  font-family: var(--font-link-large-font);
`;

const linkMedium = css`
  font-size: var(--font-link-medium-size);
  line-height: var(--font-link-medium-lineheight);
  font-weight: var(--font-link-medium-weight);
  text-decoration-line: underline;
  font-family: var(--font-link-medium-font);
`;

const linkSmall = css`
  font-size: var(--font-link-small-size);
  line-height: var(--font-link-small-lineheight);
  font-weight: var(--font-link-small-weight);
  text-decoration-line: underline;
  font-family: var(--font-link-small-font);
`;

export const linkTypography = {
  linkXLarge,
  linkLarge,
  linkMedium,
  linkSmall,
};

const inputMedium = css`
  font-size: var(--font-input-medium-size);
  line-height: var(--font-input-medium-lineheight);
  font-weight: var(--font-input-medium-regular-weight);
  font-family: var(--font-input-medium-regular-font);
`;

const inputSmall = css`
  font-size: var(--font-input-small-size);
  line-height: var(--font-input-small-lineheight);
  font-weight: var(--font-input-small-regular-weight);
  font-family: var(--font-input-small-regular-font);
`;

export const inputTypography = {
  inputMedium,
  inputSmall,
};

const buttonMedium = css`
  font-size: var(--font-button-medium-size);
  font-weight: var(--font-button-medium-weight);
  line-height: var(--font-button-medium-lineheight);
  font-family: var(--font-button-medium-font);
`;

const buttonSmall = css`
  font-size: var(--font-button-small-size);
  font-weight: var(--font-button-small-weight);
  line-height: var(--font-button-small-lineheight);
  font-family: var(--font-button-medium-font);
`;

export const buttonTypography = {
  buttonMedium,
  buttonSmall,
};

const bodyMedium = css`
  font-size: var(--font-body-medium-size);
  font-weight: var(--font-body-medium-regular-weight);
  line-height: var(--font-body-medium-lineheight);
  font-family: var(--font-body-medium-regular-font);
`;

const bodyMediumBold = css`
  ${bodyMedium};
  font-weight: var(--font-body-medium-bold-weight);
  font-family: var(--font-body-medium-bold-font);
`;

const bodyLarge = css`
  font-size: var(--font-body-large-size);
  font-weight: var(--font-body-large-regular-weight);
  line-height: var(--font-body-large-lineheight);
  font-family: var(--font-body-large-regular-font);
`;

const bodyLargeBold = css`
  ${bodyLarge};
  font-weight: var(--font-body-large-bold-weight);
  font-family: var(--font-body-large-bold-font);
`;

const bodyXLarge = css`
  font-size: var(--font-body-xlarge-size);
  font-weight: var(--font-body-xlarge-regular-weight);
  line-height: var(--font-body-xlarge-lineheight);
  font-family: var(--font-body-xlarge-regular-font);
`;

const bodyXLargeBold = css`
  ${bodyXLarge};
  font-weight: var(--font-body-xlarge-bold-weight);
  font-family: var(--font-body-xlarge-bold-font);
`;

const bodySmall = css`
  font-size: var(--font-body-small-size);
  font-weight: var(--font-body-small-regular-weight);
  line-height: var(--font-body-small-lineheight);
  font-family: var(--font-body-small-regular-font);
`;

const bodySmallBold = css`
  ${bodySmall};
  font-weight: var(--font-body-small-bold-weight);
  font-family: var(--font-body-small-bold-font);
`;

const bodyXSmall = css`
  font-size: var(--font-body-xsmall-size);
  font-weight: var(--font-body-xsmall-regular-weight);
  line-height: var(--font-body-xsmall-lineheight);
  font-family: var(--font-body-xsmall-regular-font);
`;

const bodyXSmallBold = css`
  ${bodyXSmall};
  font-weight: var(--font-body-xsmall-bold-weight);
  font-family: var(--font-body-xsmall-bold-font);
`;

export const bodyTypography = {
  bodyMedium,
  bodyMediumBold,
  bodyLarge,
  bodyLargeBold,
  bodyXLarge,
  bodyXLargeBold,
  bodySmall,
  bodyXSmall,
  bodyXSmallBold,
  bodySmallBold,
};

export const footnote = css`
  font-family: var(--font-footnote-regular-font);
  font-size: var(--font-footnote-regular-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-footnote-regular-lineheight);
`;

export const footnoteBold = css`
  ${footnote};
  font-family: var(--font-footnote-bold-font);
  font-weight: var(--font-footnote-bold-weight);
`;

export const footnoteTypography = {
  footnote,
  footnoteBold,
};

const otpXLarge = css`
  font-size: var(--font-otp-xlarge-size);
  font-weight: var(--font-otp-xlarge-weight);
  line-height: var(--font-otp-xlarge-lineheight);
  font-family: var(--font-otp-xlarge-font);
`;

export const otpTypography = {
  otpXLarge,
};

const systemInfoSmall = css`
  font-size: var(--font-systeminfo-small-size);
  font-weight: var(--font-systeminfo-small-weight);
  line-height: var(--font-systeminfo-small-lineheight);
  font-family: var(--font-systeminfo-small-font);
`;

const systemInfoMedium = css`
  font-size: var(--font-systeminfo-medium-size);
  font-weight: var(--font-systeminfo-medium-weight);
  line-height: var(--font-systeminfo-medium-lineheight);
  font-family: var(--font-systeminfo-medium-font);
`;

export const systemInfoSmallTypography = {
  systemInfoSmall,
};

const badgeCount = css`
  font-size: var(--font-badge-size);
  font-weight: var(--font-badge-weight);
  line-height: var(--font-badge-lineheight);
  font-family: var(--font-badge-font);
`;

export const badgeCountTypography = {
  badgeCount,
};

export type FontType =
  | 'heading-xxl'
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'heading-xs'
  | 'body-s'
  | 'body-m'
  | 'body-xl'
  | 'body-l'
  | 'heading-xxl-bold'
  | 'heading-xl-bold'
  | 'heading-l-bold'
  | 'heading-m-bold'
  | 'heading-s-bold'
  | 'heading-xs-bold'
  | 'body-s-bold'
  | 'body-xs'
  | 'body-xs-bold'
  | 'body-m-bold'
  | 'body-xl-bold'
  | 'body-l-bold'
  | 'button-m'
  | 'button-s'
  | 'footnote'
  | 'footnote-bold'
  | 'input-m'
  | 'input-s'
  | 'link-m'
  | 'link-s'
  | 'link-xl'
  | 'link-l'
  | 'otp-xl'
  | 'systemInfo-s'
  | 'systemInfo-m'
  | 'badge-count';

export type FontTypeRegular = Exclude<FontType, `${string}-bold`>;

export interface TProps {
  overflow?: Property.TextOverflow;
  flex?: Property.Flex;
  $fill?: boolean;
  opacity?: number;
  background?: Property.Background;
  textAlign?: Property.TextAlign;
  cursor?: Property.Cursor;
  colorToken?: string;
  singleLine?: boolean;
  font?: FontType;
}

export const TSpan = styled('span')<TProps>`
  ${fontFamily}
  text-align: ${(props) => props.textAlign || 'unset'};
  flex: ${(props) => (props.flex ? props.flex : undefined)};
  cursor: ${(props) => props.cursor};
  ${(props) =>
    props.$fill
      ? `
          flex-grow: 1;
        `
      : `
          max-width: max-content;
        `}
  ${(props) =>
    props.overflow
      ? `
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ${props.overflow};
        `
      : undefined}

  ${(props) =>
    props.background ? `background:${props.background};` : 'background:none;'}

  color: ${({ colorToken }) =>
    colorToken
      ? `var(${colorToken});`
      : 'var(--text-card-neutral-highlighted);'}
  ${({ singleLine }) => singleLine && singleLineEllipisText}

  ${({ font }) => font === 'heading-xxl' && headingXXLarge}
  ${({ font }) => font === 'heading-xl' && headingXLarge}
  ${({ font }) => font === 'heading-l' && headingLarge}
  ${({ font }) => font === 'heading-m' && headingMedium}
  ${({ font }) => font === 'heading-s' && headingSmall}
  ${({ font }) => font === 'heading-xs' && headingXSmall}
  ${({ font }) => font === 'heading-xxl-bold' && headingXXLargeBold}
  ${({ font }) => font === 'heading-xl-bold' && headingXLargeBold}
  ${({ font }) => font === 'heading-l-bold' && headingLargeBold}
  ${({ font }) => font === 'heading-m-bold' && headingMediumBold}
  ${({ font }) => font === 'heading-s-bold' && headingSmallBold}
  ${({ font }) => font === 'heading-xs-bold' && headingXSmallBold}
  ${({ font }) => font === 'body-s' && bodySmall}
  ${({ font }) => font === 'body-xs' && bodyXSmall}
  ${({ font }) => font === 'body-m' && bodyMedium}
  ${({ font }) => font === 'body-xl' && bodyXLarge}
  ${({ font }) => font === 'body-l' && bodyLarge}
  ${({ font }) => font === 'body-xs-bold' && bodyXSmallBold}
  ${({ font }) => font === 'body-s-bold' && bodySmallBold}
  ${({ font }) => font === 'body-m-bold' && bodyMediumBold}
  ${({ font }) => font === 'body-xl-bold' && bodyXLargeBold}
  ${({ font }) => font === 'body-l-bold' && bodyLargeBold}
  ${({ font }) => font === 'button-m' && buttonMedium}
  ${({ font }) => font === 'button-s' && buttonSmall}
  ${({ font }) => font === 'link-xl' && linkXLarge}
  ${({ font }) => font === 'link-l' && linkLarge}
  ${({ font }) => font === 'link-m' && linkMedium}
  ${({ font }) => font === 'link-s' && linkSmall}
  ${({ font }) => font === 'footnote' && footnote}
  ${({ font }) => font === 'footnote-bold' && footnoteBold}
  ${({ font }) => font === 'input-m' && inputMedium}
  ${({ font }) => font === 'input-s' && inputSmall}
  ${({ font }) => font === 'otp-xl' && otpXLarge}
  ${({ font }) => font === 'systemInfo-s' && systemInfoSmall}
  ${({ font }) => font === 'systemInfo-m' && systemInfoMedium}
  ${({ font }) => font === 'badge-count' && badgeCount}
`;

export default {
  fontFamily,
  headingTypography,
  buttonTypography,
  bodyTypography,
  linkTypography,
  footnoteTypography,
  inputTypography,
  otpTypography,
  TSpan,
  systemInfoSmallTypography,
  badgeCountTypography,
};
