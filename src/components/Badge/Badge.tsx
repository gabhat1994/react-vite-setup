import { forwardRef, type Ref } from 'react';
import styled from 'styled-components';
import { type BadgeProps } from './types';
import * as Styles from './styles';

const StyledBadge = styled.div<{
  sizeStyle?: string;
  isText?: boolean;
  textLength: number;
}>`
  ${Styles.badgeBaseCss}
  ${(props) => props.isText && props.sizeStyle === 'large' && Styles.badgeLarge}
  ${(props) =>
    props.isText && props.sizeStyle === 'medium' && Styles.badgeMedium}
  ${(props) =>
    props.isText &&
    props.textLength === 1 &&
    props.sizeStyle === 'medium' &&
    Styles.badgeMediumTextLengthInitial}
  ${(props) =>
    props.isText &&
    props.textLength > 1 &&
    props.sizeStyle === 'medium' &&
    Styles.badgeMediumTextLengthMoreThanOne}
  ${(props) =>
    props.isText &&
    props.textLength === 1 &&
    props.sizeStyle === 'large' &&
    Styles.badgeLargeTextLengthInitial}
  ${(props) =>
    props.isText &&
    props.textLength > 1 &&
    props.sizeStyle === 'large' &&
    Styles.badgeLargeTextLengthMoreThanOne}
`;

const StyledBadgeText = styled.span<{
  sizeStyle?: string;
  isText?: boolean;
}>`
  ${Styles.badgeTextBaseCss}
  ${(props) =>
    props.isText && props.sizeStyle === 'large' && Styles.badgeTextLarge}
  ${(props) =>
    props.isText && props.sizeStyle === 'medium' && Styles.badgeTextMedium}
`;

export const Badge = forwardRef(
  ({ size = 'medium', text = '' }: BadgeProps, ref: Ref<HTMLDivElement>) => {
    const { length } = text;
    const isText = length > 0 ?? false;
    return (
      <StyledBadge
        data-testid="StyledBadge"
        sizeStyle={size}
        isText={isText}
        textLength={length}
        ref={ref}
      >
        <StyledBadgeText
          data-testid="StyledBadgeText"
          sizeStyle={size}
          isText={isText}
        >
          {text}
        </StyledBadgeText>
      </StyledBadge>
    );
  },
);
