import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { devices } from '@/constants/devices';

const MoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;
export default MoneyWrapper;

export const FormHelperText = styled(TSpan)`
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: var(--text-card-neutral-default);
  line-height: 28.8px;
  width: 100%;
  font-family: var(--font-family);
  font-style: normal;
`;

export const Container = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
`;
export const LeftItem = styled.div<{ isMobile: boolean }>`
  align-self: ${(props) => (props.isMobile ? 'center' : 'flex-start')};
`;

export const RightItem = styled.div<{ isMobile: boolean }>`
  padding-top: ${(props) => (props.isMobile ? '16px' : '0px')};
  margin-left: ${(props) => (props.isMobile ? '0px' : 'auto')};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding-bottom: 16px;
`;
export const CardInformation = styled(TSpan)`
  text-align: center;
  font-family: var(--font-family);
  width: auto;
`;

export const DropdownPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const SubHeaderContainer = styled.div`
  display: flex;
  align-items: left;
  flex: 1;
  margin: auto;
  width: 100%;
  @media ${devices.TABLET} {
    max-width: 912px;
  }

  @media ${devices.MOBILE_L} {
    max-width: 100%;
  }
`;
