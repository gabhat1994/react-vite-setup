import styled from 'styled-components';
import { defaultScrollBar } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';

export const IconContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 28px;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 8px 0;
  @media (min-width: ${sizes.TABLET}) {
    margin: 16px 0;
  }
  position: relative;
`;

export const UnlinkContainer = styled.div`
  width: 100%;
  height: 336px;
`;

export const UnlinkOptionContainer = styled.div`
  max-height: 488px;
  min-height: 288px;
  overflow: auto;
  ${defaultScrollBar};
  @media (min-width: ${sizes.TABLET}) {
    max-height: 288px;
  }
`;

export const UnlinkContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 13px;
`;

export const AlignTSpan = styled(TSpan)`
  align-self: center;
`;

export const ButtonFlex = styled(Button)<{ flex?: number }>`
  flex: ${({ flex }) => flex && flex};
`;
