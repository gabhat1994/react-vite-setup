import styled from 'styled-components';

export const PinedFrameWarpper = styled.div`
  border-radius: 8px;
  box-sizing: border-box;
`;

export const SpeakerWarpper = styled.div<{ isFullScreen?: boolean }>`
  min-height: 115px;
  width: 100%;
  overflow: ${({ isFullScreen }) => (isFullScreen ? `visible` : `hidden`)};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .carousel-root {
    width: 98%;
    overflow: hidden;
    ${({ isFullScreen }) =>
      isFullScreen
        ? ` overflow-x: clip; overflow-y: visible;`
        : 'overflow: hidden'};
  }
`;

export const SpeakerWarpperChlid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
`;
