import styled, { css } from 'styled-components';
import { CardStyled } from '@/components/Card/styles';
import { Stack } from '@/layout';
import Typography, { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { singleLineEllipisText } from '@/common/globalStyles';
import { ResolvingAnimationState } from './types';

export const MyRequestContainer = styled(Stack)<{
  animationState: ResolvingAnimationState;
}>`
  ${(props) =>
    props.animationState === ResolvingAnimationState.FadeOut &&
    css`
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      animation: fadeOut 0.25s ease;
    `}
`;

export const Container = styled.div`
  position: relative;
  min-width: 352px;
  padding-bottom: 16px;
  ${CardStyled} {
    min-width: 100vw;
    padding: 24px;
  }

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }

  width: 100%;
`;

export const TabsContainer = styled.div`
  position: relative;
  min-width: 352px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 16px;
  padding-bottom: 16px;

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }

  width: 100%;

  @media (max-width: ${sizes.TABLET}) {
    min-width: 343px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const TabSection = styled.div`
  margin: 0px -6px 8px -6px;
  ${Typography.bodyTypography.bodyMedium};
  form {
    overflow-x: inherit;
  }
  form div {
    width: auto;
  }
  label div {
    padding: 9px 16px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    label div {
      padding: 8px 12px;
    }
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    label div {
      padding: 8px;
    }
  }
`;

export const TSpanWithOverFlowText = styled(TSpan)`
  ${singleLineEllipisText}
`;

export const NoResultsContainer = styled.div<{ isModal?: boolean }>`
  ${({ isModal }) => isModal && `height: 400px;`}

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTSpan = styled(TSpan)`
  padding-top: 24px;
  width: 100%;
  max-width: 100%;
`;
