import styled from 'styled-components';
import { Header } from '@/components/Header';
import { StatusWrapperCss } from '@/components/Header/styles';

export const CustomPreviewTopNavbar = styled(Header).attrs({
  isBorderRadius: false,
})`
  padding: 0px;
`;

export const StatusWrapper = styled.div`
  ${StatusWrapperCss}
  position:relative;
`;

export const StyledTSpan = styled.span`
  font-weight: 600;
`;
