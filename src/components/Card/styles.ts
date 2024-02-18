import styled from 'styled-components';
import { bodyTypography } from '../Typography';

export const CardStyled = styled.div<{
  bgImageUrl?: string;
  bgImagePosition?: string;
  hasError?: boolean;
  fullWidth?: boolean;
}>`
  position: relative;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  cursor: default;
  padding: 12px 24px;
  vertical-align: middle;
  overflow: hidden;
  background: var(--bg-card-neutral-alt-default);
  background-size: cover;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  ${bodyTypography.bodyMedium}

  border: ${(props) =>
    props.hasError
      ? '1px solid var(--border-card-danger-primary-default)'
      : 'none'};

  ${(props) =>
    props.bgImageUrl && `background-image: url(${props.bgImageUrl})`};
  ${(props) =>
    props.bgImagePosition && `background-position: ${props.bgImagePosition}`};

  box-sizing: border-box;
`;
