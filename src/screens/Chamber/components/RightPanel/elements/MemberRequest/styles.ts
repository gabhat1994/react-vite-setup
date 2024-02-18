import styled, { css } from 'styled-components';
import { bodyTypography, TSpan } from '@/components/Typography';
import {
  buttonTypography,
  footnote,
  footnoteBold,
} from '@/components/Typography/Typography';
import { ButtonText } from '@/components/Button/styles';
import { ResolvingAnimationState } from '@/screens/Chamber/components/RightPanel/elements/MemberRequest/MemberRequest';
import { singleLineEllipisText } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';

interface TagLabelProps {
  bgColor: string;
  color: string;
}

const fadeOutAnimation = css`
  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  animation: fadeOut 0.25s ease;
`;

const fadeInAnimation = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation: fadeIn 0.25s ease;
`;

const rowFlexDiraction = css`
  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.TABLET_L}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const MemberRequestContainer = styled.div<{ isModal?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  ${({ isModal }) => !isModal && rowFlexDiraction}
`;

export const MemberRequestName = styled(TSpan)<{
  isHomeType: boolean | undefined;
}>`
  color: var(--text-card-header-neutral-default);
  ${singleLineEllipisText}
  ${footnote}
  ${(p) =>
    !p.isHomeType &&
    css`
      span {
        ${footnoteBold}
      }
    `}
`;

export const TagLabel = styled.div<TagLabelProps>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  ${footnote}
`;

export const MemberRequestHead = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${bodyTypography.bodyMedium}
`;

export const MemberRequestDataHead = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const MemberRequestDataBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RequestResolvedMessageSection = styled.span<{
  animationState: ResolvingAnimationState;
}>`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 40px;
  font-weight: 600;
  justify-content: center;
  ${(props) =>
    props.animationState === ResolvingAnimationState.FadeIn
      ? fadeInAnimation
      : undefined}

  span {
    padding: 12px 0px;
    color: var(--text-card-neutral-default);
    font-family: var(--font-button-medium-font);
  }
`;

export const ButtonSection = styled.span<{
  animationState: ResolvingAnimationState;
}>`
  display: flex;
  gap: 8px;
  width: 100%;

  button {
    width: 100%;
    padding: 12px 0px;
  }

  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.TABLET_L}) {
    width: auto;
    button {
      min-width: 121px;
    }
  }

  ${ButtonText} {
    ${buttonTypography.buttonMedium};
  }

  ${(props) =>
    props.animationState === ResolvingAnimationState.FadeOut
      ? fadeOutAnimation
      : undefined}
`;

export const AvatarClickableWrapper = styled.span<{ isClickable: boolean }>`
  ${({ isClickable }) => (isClickable ? 'cursor: pointer;' : undefined)}
`;

export const MemberRequestTitle = styled.span<{ isClickable: boolean }>`
  display: flex;
  flex-direction: column;
  color: var(--text-tablecell-header-neutral-highlighted);
  ${singleLineEllipisText}
  ${bodyTypography.bodyMediumBold};
  ${({ isClickable }) => (isClickable ? 'cursor: pointer;' : undefined)}
`;

export const CustomMessage = styled.span`
  ${singleLineEllipisText}
  -webkit-line-clamp: 3;
`;

export const StyledSeeMoreButton = styled(TSpan)`
  font-size: var(--font-link-small-size);
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
  width: 100%;
`;

export const StyledEventDescription = styled(TSpan)`
  word-break: break-all;
  ${bodyTypography.bodyMedium}
  color: var(--link-notification-tile-neutral-default);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const SpinnerContainer = styled.div`
  position: relative;
`;
