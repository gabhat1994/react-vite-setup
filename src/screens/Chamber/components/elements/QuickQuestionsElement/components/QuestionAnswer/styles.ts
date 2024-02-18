import styled, { css } from 'styled-components';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

export const Container = styled(Stack)`
  position: relative;
  width: 100%;
  transition: all 0.1s ease-in-out;
  flex-direction: column;
  background: var(--bg-card-neutral-alt-default);
  padding: 0;
  vertical-align: middle;
`;

export const SubConatiner = styled(Stack)`
  box-sizing: border-box;
  position: relative;
`;

export const QuestionBodyWrapper = styled.div<{
  isMobile?: boolean;
}>`
  max-width: ${({ isMobile }) => (isMobile ? '95%' : 'none')};
`;

export const SendButton = styled(Button)`
  position: relative;
  :disabled,
  :hover:disabled,
  :active {
    background-color: transparent;
  }
`;

export const StyleImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

export const StyledTextArea = styled.div<{
  value?: string;
}>`
  width: 100%;

  textarea {
    height: 40px;
    z-index: 1;
    padding: 8px 12px;
    margin: 0px !important;
  }
  label {
    transform: translate(2px, -8px);
    z-index: 1;
    ${(props) =>
      props.value &&
      css`
        transform: translate(12px, -10px);
      `};
  }
  textarea:focus + fieldset + label {
    transform: translate(12px, -10px);
  }
  fieldset {
    z-index: 1;
  }
  textarea:focus + fieldset {
    z-index: 1;
  }
`;

export const AnswerCount = styled(TSpan)<{ isActive?: boolean }>`
  padding-top: 2px;
  ${(p) => p.isActive && 'cursor: pointer;'}
`;

export const StyledForm = styled.form<{ disabled?: boolean }>`
  width: 100%;
  position: relative;
  display: inline-flex;
  ${(props) =>
    props.disabled &&
    css`
      button[disabled]:hover {
        background-color: transparent;
      }
    `};
`;

export const ClosesText = styled(TSpan)`
  padding-top: 2px;
`;
