import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import Typography from '@/components/Typography';
import { Stack } from '@/layout';

interface TagLabelProps {
  bgColor: string;
  color: string;
}

export const ChartTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 54px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex-direction: column;
    height: auto;
    gap: 24px;
  }
`;
export const KPIContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const KPIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 6px;
  padding-right: 12px;
  border-right: 1px solid var(--bg-separator-neutral-default);
  &:last-child {
    border: none;
  }
`;

export const PeriodicityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 6px;
  gap: 16px;
`;

export const DropdownWrapper = styled.div`
  width: 128px;
`;

export const ContentContainer = styled.div<{ unregistered: boolean }>`
  padding: 12px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    ${({ unregistered }) =>
      !unregistered &&
      'background: var(--bg-tablecell-neutral-pressed); cursor: pointer;'}
  }
`;

export const UserDetailStack = styled(Stack)`
  flex: 1;
`;

export const LinkedTagLabel = styled.div<TagLabelProps>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 6px;
  height: 22px;
  ${Typography.footnoteTypography.footnoteBold}
`;

export const LinkUnderline = styled.div`
  min-width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 296px;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    height: calc(100vh - 452px);
  }
`;
