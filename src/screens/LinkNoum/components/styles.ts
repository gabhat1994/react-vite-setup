import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { SpinnerContainer } from '@/common/globalStyles';
import { Inner } from '@/components/ExtendedModal/styles';

export const TagLabel = styled.div<{ bgColor: string; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-family: var(--font-family);
  font-weight: var(--font-body-small-bold-weight);
  font-size: 12px;
  text-align: center;
  border: solid var(--bg-card-neutral-alt-default) 2px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  @media (min-width: ${sizes.TABLET_L}) {
    justify-content: center;
  }
`;

export const ButtonWrapper1 = styled(Stack)`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex: 1;
  }
`;
export const ButtonWrapper2 = styled(Stack)`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex: 2;
  }
  @media (min-width: ${sizes.MOBILE_XL}) {
    width: 243px;
  }
`;

export const CustomStyledSpinnerContainer = styled(SpinnerContainer)`
  position: absolute;
  top: 100;
`;

export const StyledInner = styled(Inner)`
  position: absolute;
  z-index: 1;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const SearchField = styled(TextField)``;
