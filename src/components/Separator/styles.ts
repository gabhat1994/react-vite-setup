import styled, { css } from 'styled-components';

const StyledHr = styled.hr<{
  sizeStyle?: string;
  fullWidth?: boolean;
  noMargin?: boolean;
  isWithText?: boolean;
  colorToken?: string;
}>`
  border-width: ${(props) => props.sizeStyle}px 0 0 0;
  border-style: solid;
  border-color: ${(props) => `var(${props.colorToken})`};

  ${(props) => (props.fullWidth ? 'width: 100%;' : '')}
  ${({ isWithText }) => (isWithText ? withTextCss : 'margin:16px 0;')}
      ${(props) => (props.noMargin ? 'margin: 0;' : '')}
`;

const withTextCss = css`
  position: relative;
  height: 22px;
  border: none;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  &:before {
    content: '';
    background: var(--bg-separator-neutral-default);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    font-size: var(--font-body-medium-bold-size);
    font-weight: var(--font-body-medium-bold-weight);
    position: relative;
    display: inline-block;
    padding: 0 12px;
    line-height: 1.6;
    color: var(--text-card-neutral-default);
    background: var(--bg-card-neutral-alt-default);
  }
`;

export default StyledHr;
