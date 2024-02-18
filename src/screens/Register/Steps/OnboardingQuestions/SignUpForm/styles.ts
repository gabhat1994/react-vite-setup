import styled, { css } from 'styled-components';
import { Stack } from '@/layout';
import { mediaSizes } from '@/constants/devices';

export const FormStyledV2 = styled.div`
  min-height: 80vh;
  max-width: 450px;
  @media (max-width: ${mediaSizes.LAPTOP_L_MAX}) {
    padding-bottom: 125px;
  }
`;
export const FormStyled = styled(FormStyledV2)`
  width: 100%;
  max-width: 100%;
`;

export const Form = styled.form`
  width: 100%;
`;

export const QuestionWrapper = styled.div<{ applyNewSignUpStyles: boolean }>`
  ${({ applyNewSignUpStyles }) =>
    applyNewSignUpStyles &&
    css`
      padding: 24px;
      border-radius: 16px;
      border: 1px solid var(--bg-separator-neutral-default);
      @media (max-width: ${mediaSizes.MOBILE_M_MAX}) {
        padding: 0px;
        border-radius: 0px;
        border: none;
      }
    `}
`;

export const FootnoteStack = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'center',
})`
  padding: 0 24px;
`;
