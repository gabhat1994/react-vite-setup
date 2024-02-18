import styled, { css } from 'styled-components';
import { Stack } from '@/layout/Stack';
import { Button } from '@/components/Button/Button';
import { mediaSizes } from '@/constants/devices';

const HeaderContainer = styled.div<{ wrap?: boolean }>`
  z-index: 1;
  background-color: var(--bg-card-neutral-alt-default);
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  position: sticky;
  top: 0px;
  margin-top: 2px;
  padding: 16px 40px 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    padding: 16px 16px;
    position: static;
    ${({ wrap }) =>
      wrap &&
      css`
        flex-wrap: wrap;
      `}
  }
`;

const ActionContainer = styled.span<{ updateMargin?: boolean }>`
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    ${({ updateMargin }) =>
      updateMargin &&
      css`
        margin-top: 16px;
      `}
  }
`;

const Left = styled(Stack).attrs({
  fullWidth: false,
  align: 'center',
  gap: '16px',
})<{ unsetMinWidth?: boolean }>`
  min-width: 200px;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    ${({ unsetMinWidth }) =>
      unsetMinWidth &&
      css`
        min-width: auto;
      `};
			${({ unsetMinWidth }) =>
        !unsetMinWidth &&
        css`
          min-width: 200px;
        `};
  }
  }
`;
const Right = styled(Stack).attrs({
  fullWidth: false,
  align: 'center',
  gap: '16px',
})`
  width: auto;
`;

const BackButton = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  box-sizing: border-box;
`;

const StepperContainer = styled(Stack).attrs({
  vertical: true,
  justify: 'center',
  gap: '16px',
  align: 'center',
})`
  width: 400px;
`;

const Steps = styled.div`
  width: 343px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 200px;
  }
`;

const StepName = styled(Stack).attrs({
  fullWidth: false,
  align: 'center',
  justify: 'space-between',
})`
  width: 400px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 270px;
  }
`;
const Action = styled(Stack).attrs({
  fullWidth: false,
  align: 'center',
  gap: '16px',
})`
  width: auto;
`;

export default {
  HeaderContainer,
  Left,
  BackButton,
  Right,
  StepperContainer,
  StepName,
  Steps,
  Action,
  ActionContainer,
};
