import styled from 'styled-components';

const AnimatedGlassIconWrapper = styled.div<{ $rotate: boolean }>`
  --glass-icon-element: #fff;
  --glass-icon-front-default: #c6c1d1;
  --glass-icon-back-default: #c6c1d1;

  --glass-icon-front-hover-gradient-from: #d4d0dd;
  --glass-icon-front-hover-gradient-to: #aaa5b6;
  // TODO: Use these colors when we figure out how to apply blur properly on "front".
  // --glass-icon-front-hover-gradient-from: #c6c1d0;
  // --glass-icon-front-hover-gradient-to: #c6c1d1;
  --glass-icon-back-hover-gradient-from: #c6c1d2;
  --glass-icon-back-hover-gradient-to: #858091;

  --glass-icon-front-active-gradient-from: #b199ff;
  --glass-icon-front-active-gradient-to: #7747ff;
  // TODO: Use these colors when we figure out how to apply blur properly on "front".
  // --glass-icon-front-active-gradient-from: #ffffff;
  // --glass-icon-front-active-gradient-to: #4000ff;
  --glass-icon-back-active-gradient-from: #b38fff;
  --glass-icon-back-active-gradient-to: #5f27ff;

  display: flex;

  #front,
  #front *,
  #back,
  #back *,
  #element,
  #element * {
    transition: transform 0.3s, opacity 0.3s;
  }

  svg {
    shape-rendering: geometricPrecision;
  }

  &.glass-icon-state-default {
    #front {
      filter: none;
      & > * {
        fill: var(--glass-icon-front-default);
        filter: none !important;
        fill-opacity: 1;
      }
    }
    #back {
      opacity: 0;
      fill: url(#gradient-back-hover);
    }
    ${(props) =>
      props.$rotate &&
      `
      // Rotation and offset differ for path and rect exported by Figma.
      path#back {
        transform: rotate(-15deg) translate(-6px, 5px);
      }
      rect#back {
        transform: rotate(0deg) translate(-5px, 4px);
      }
      `}

    #element {
      filter: drop-shadow(0px 1px 2px rgba(133, 128, 145, 0.35));
      path,
      rect {
        fill: var(--glass-icon-element);
      }
    }
  }

  &.glass-icon-state-hover {
    #front {
      filter: none;
      & > * {
        fill: url(#gradient-front-hover);
        fill-opacity: 1;
      }
    }
    #back {
      fill: url(#gradient-back-hover);
    }
    ${(props) =>
      props.$rotate &&
      `
    rect#back {
      transform-origin: var(--x) var(--y);
      transform: rotate(var(--rotate));
    }
    `}

    #element {
      filter: drop-shadow(0px 1px 2px rgba(133, 128, 145, 0.35));
      path,
      rect {
        fill: var(--glass-icon-element);
      }
    }
  }

  &.glass-icon-state-active {
    --glass-icon-element: #f2e4ff;

    #front {
      & > * {
        fill: url(#gradient-front-active);
        fill-opacity: 1;
      }
    }
    #back {
      fill: url(#gradient-back-active);
    }
    #element {
      filter: none;
      path,
      rect {
        fill: var(--glass-icon-element);
      }
    }
  }
`;

export default {
  AnimatedGlassIconWrapper,
};
