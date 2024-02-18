import styled, { css, keyframes } from 'styled-components';

const dropInAnimation = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const dropOutAnimation = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const Container = styled.div<{ isVisible: boolean }>`
  z-index: 1000;
  background-color: var(--bg-infobox-brand-primary-default);
  width: 100%;
  border-color: var(--border-infobox-brand-secondary-default);
  border-width: 1px;
  display: flex;
  height: 46px;
  padding: 0 16px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  ${(props) =>
    props.isVisible
      ? css`
          animation-name: ${dropInAnimation};
        `
      : css`
          animation-name: ${dropOutAnimation};
        `}
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  background-color: var(--icon-infobox-brand-primary-default);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
