import styled from 'styled-components';

export const Video = styled.video<{ isSquare?: boolean }>`
  ${({ isSquare }) => !isSquare && 'width: 100%;'}
  ${({ isSquare }) =>
    isSquare &&
    `
    width: 124px;
    height: 124px;
    object-fit: cover;
    
  `}
`;

export const PlayButton = styled.button`
  pointer-events: initial;
  word-break: initial;
  box-sizing: inherit;
  text-transform: none;
  text-decoration: none;
  appearance: none;
  font-size: 30px;
  display: block;
  position: absolute;
  padding: 0;
  cursor: pointer;
  opacity: 1;
  border: 0.06666em solid;
  transition: all 0.4s;
  top: calc(50% - 22px);
  left: calc(50% - 18px);
  width: 36px;
  height: 36px;
  background-color: var(--bg-button-brand-primary-default);
  border-color: var(--bg-button-brand-primary-default);
  border-radius: 12px;
  transform: none;
  color: white;

  &:before {
    content: '\f101';
    font-family: VideoJS;
    font-weight: normal;
    font-style: normal;
    color: white;
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const VideoWrapper = styled.div`
  position: relative;
`;
