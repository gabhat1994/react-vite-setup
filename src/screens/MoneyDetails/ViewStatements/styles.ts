import { TSpan } from '@/components';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const WhiteCard = styled.div<{
  isMobile?: boolean;
  isTablet?: boolean;
  gap?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => (props.gap ? props.gap : '10px')};
  height: 100%;
  width: 100%;
  background-color: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  order: 0;
  flex-grow: 0;
  box-sizing: border-box;
  padding: ${(props) =>
    props.isMobile ? '8px' : props.isTablet ? '16px' : '24px'};
`;

export const Row = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
  align-items: ${(props) => (props.isMobile ? 'center' : 'flex-start')};
  gap: ${(props) => (props.isMobile ? '10px' : '0px')};
  justify-content: space-between;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  padding-bottom: 10px;
  padding-left: 8px;
  padding-right: 8px;
`;

export const FooterRow = styled.div`
  font-family: var(--font-family);
  font-weight: var(--font-link-medium-weight);
  font-size: var(--font-link-medium-size);
  padding-top: 2.6px;
`;

export const NoRecordRow = styled.div<{ isMobile?: boolean }>`
  align-self: center;
  font-style: normal;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  font-family: var(--font-family);
  line-height: 150%;
  color: var(--text-placeholder-neutral-default);
  height: 24px;
  flex: none;
  flex-grow: 0;
  padding-bottom: 24px;
  padding-left: 8px;
  padding-right: 8px;
`;

export const ReadMeRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  line-height: 19.2px;
  height: fit-content;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  font-family: var(--font-family);
  padding-bottom: 10px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 250px;
  width: 250px;
  justify-content: center;
  align-self: center;
`;

export const DescriptionText = styled(TSpan)`
  padding: 10px 24px 0px;
`;
