import styled from 'styled-components';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';
import Typography, { TSpan } from '@/components/Typography';
import { CardStyled } from '@/components/Card/styles';

export const Container = styled.div`
  position: relative;
  min-width: 352px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 572px;

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

  @media (max-width: ${sizes.TABLET}) {
    min-width: 343px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
`;

export const TabSectionHead = styled(Stack)<{ autoWidth?: boolean }>`
  ${Typography.bodyTypography.bodyMedium};
  width: 100%;
  form {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    padding-bottom: 16px;
  }
  form div {
    ${({ autoWidth }) => (autoWidth ? `width: auto;` : `flex: 1;`)};
  }
  label div {
    text-align: center;
    ${({ autoWidth }) => autoWidth && `padding: 9px 12px;`};
  }
`;

export const TextOnlySpan = styled(TSpan)`
  padding: 12px;
`;

export const TabHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex-direction: column;
  }
`;

export const TabsContainer = styled.div``;

export const DateRangeContainer = styled.div`
  width: 250px;
`;
