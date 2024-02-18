import { type FC, forwardRef, type Ref } from 'react';
import styled, { css } from 'styled-components';
import {
  type ButtonProps,
  type CommonButtonProps,
  type GetColorProps,
} from './types';
import * as Styles from './styles';
import { Spinner } from '../Spinner';
import { footnoteTypography } from '../Typography';

const getColor = (props: GetColorProps) => {
  let color = 'var(--icon-button-neutral-default)';

  if (props.tertiary) {
    color = 'var(--icon-button-neutral-default)';
  } else if (props.disabled) {
    color = 'var(--icon-button-neutral-disabled)';
  } else if (props.intent === 'positive' && props.primary) {
    color = 'var(--icon-button-neutral-alt-default)';
  } else if (props.intent === 'negative' && props.primary) {
    color = 'var(--icon-button-neutral-alt-default)';
  } else if (props.primary) {
    color = 'var(--icon-button-neutral-alt-default)';
  } else if (props.intent === 'positive' && props.secondary) {
    color = 'var(--icon-button-brand-secondary-default)';
  } else if (props.intent === 'negative' && props.secondary) {
    color = 'var(--icon/button/danger-secondary/default)';
  } else if (props.secondary) {
    color = 'var(--icon-button-brand-secondary-default)';
  } else if (props.textOnly) {
    color = 'var(--icon-button-brand-secondary-default)';
  }

  return color;
};

const tooltipCss = css<Pick<CommonButtonProps, 'tooltipPosition'>>`
  &[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    width: max-content;
    bottom: ${(props) =>
      props.tooltipPosition?.startsWith('bottom') ? '-40px' : 'unset'};
    top: ${(props) =>
      props.tooltipPosition?.startsWith('top') ? '-40px' : 'unset'};
    left: ${(props) =>
      ['bottom-right', 'top-right'].includes(props.tooltipPosition ?? '')
        ? 0
        : ['top-center', 'bottom-center'].includes(props.tooltipPosition ?? '')
        ? '50%'
        : 'unset'};

    right: ${(props) =>
      ['bottom-left', 'top-left'].includes(props.tooltipPosition ?? '')
        ? 0
        : 'unset'};

    transform: ${(props) =>
      ['top-center', 'bottom-center'].includes(props.tooltipPosition ?? '')
        ? 'translateX(-50%)'
        : 'none'};

    ${footnoteTypography.footnote};
    z-index: 100;
  }
`;

const ButtonStyled = styled.button<
  Omit<CommonButtonProps, 'loading'> & {
    isLoading?: boolean;
  }
>`
  ${Styles.buttonBaseCss}
  ${({ leftIcon, rightIcon, icon }) =>
    (leftIcon || rightIcon || icon) && Styles.inlineBtn}
  ${(props) => props.size === 'full' && Styles.buttonFull}
  ${(props) => props.grow && 'flex-grow: 1;'}
  ${(props) => props.size === 'large' && Styles.buttonLarge}
  ${(props) => props.size === 'small' && Styles.buttonSmall}
  ${(props) => props.size === 'small' && props.icon && Styles.buttonSmallIcon}
  ${(props) => props.size === 'full_small' && Styles.buttonFullSmall}
  ${(props) => props.primary && Styles.buttonPrimary}
  ${(props) => props.secondary && Styles.buttonSecondary}
  ${(props) => props.intent === 'positive' && Styles.buttonPositive}
  ${(props) =>
    props.intent === 'positive' &&
    props.secondary &&
    Styles.buttonPositiveSecondary}
  ${(props) => props.intent === 'negative' && Styles.buttonNegative}
  ${(props) =>
    props.intent === 'negative' &&
    props.secondary &&
    Styles.buttonNegativeSecondary}
  ${(props) => props.tertiary && Styles.buttonTertiary}
  ${(props) => props.isLoading && Styles.buttonLoading}
  ${(props) =>
    props.isLoading && props.size === 'small' && Styles.buttonLoadingSmall}
  ${(props) => props.neutral && Styles.buttonNeutral}
  ${(props) => props.disabled && Styles.buttonDisabled}
  ${(props) => props.softDisabled && Styles.buttonSoftDisabled}
  ${(props) => props.textOnly && Styles.buttonTextOnly}
  ${(props) => props.tooltipText && tooltipCss}
`;

export const ButtonStyledComponent: FC<ButtonProps> = ({
  children,
  ...rest
}) => <ButtonStyled {...rest}>{children}</ButtonStyled>;

export const Button = forwardRef(
  (
    {
      children,
      icon,
      rightIcon,
      leftIcon,
      textOnly,
      loading,
      disabled,
      intent,
      softDisabled,
      spinnerColor,
      testId,
      textTestId = 'button_text',
      tooltipText,
      tooltipPosition,
      ...rest
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <ButtonStyled
      data-testid={testId || 'button'}
      type="button"
      ref={ref}
      disabled={disabled}
      softDisabled={softDisabled}
      textOnly={!!textOnly}
      primary={!!rest.primary}
      secondary={!!rest.secondary}
      tertiary={!!rest.tertiary}
      intent={intent}
      isLoading={loading}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      icon={icon}
      tooltipText={tooltipText}
      data-tooltip={tooltipText}
      tooltipPosition={tooltipPosition}
      {...rest}
    >
      {loading ? (
        <Spinner
          color={
            spinnerColor ||
            getColor({
              textOnly,
              primary: rest.primary,
              secondary: rest.secondary,
              tertiary: rest.tertiary,
              intent,
              disabled,
              softDisabled,
              loading,
            })
          }
        />
      ) : (
        <>
          {icon}
          {leftIcon}
          {!loading && children && (
            <Styles.ButtonText data-testid={textTestId}>
              {children}
            </Styles.ButtonText>
          )}
          {rightIcon}
        </>
      )}
    </ButtonStyled>
  ),
);
