import styled from 'styled-components';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { devices, mediaSizes, sizes } from '@/constants/devices';
import { Card } from '@/components/Card';
import { cssVar, rgba } from 'polished';
import { HIDE_SIDE_ELEMENTS } from '@/common/globalStyles';

export const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  position: relative;

  @media ${devices.TABLET} {
    padding: 16px 40px;
  }
`;

export const Body = styled.div`
  flex-grow: 1;
  align-self: center;
  max-width: 1360px;
  min-height: 0;
  width: 100%;
  padding: 16px 40px;

  * {
    box-sizing: border-box;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  right: 16px;

  @media ${devices.TABLET} {
    right: 40px;
  }
`;

export const Title = styled(TSpan).attrs(() => ({ font: 'body-xl-bold' }))``;

export const BulkActionsCard = styled(Card)`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
  gap: 32px;
  align-items: center;
  padding: 12px 16px;
  overflow: visible;
  z-index: 3;
  width: max-content;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    transform: none;
    flex-direction: column;
    align-items: normal;
  }

  border-radius: 8px;
  background: var(--bg-card-neutral-alt-default);
  box-shadow: 0px 4px 32px 0px rgba(32, 17, 62, 0.08);
`;

export const BulkActionButtons = styled.div`
  display: flex;
  gap: 16px;
  span {
    font-weight: var(--font-body-medium-bold-weight) !important;
  }
`;

export const MobileBottomActionsContainer = styled.div<{
  isSelectedRow: boolean;
}>`
  box-sizing: border-box;
  display: none;
  justify-content: end;
  button {
    border-radius: 16px;
    box-shadow: 0 2px 16px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 16px;
  }

  @media (max-width: ${HIDE_SIDE_ELEMENTS}) {
    position: absolute;
    width: 100%;
    bottom: 20px;
    display: flex;
    flex-direction: row;
  }

  @media (max-width: ${mediaSizes.LAPTOP_MAX}) {
    position: fixed;
    padding: 0 4%;
    right: 0;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    bottom: ${(props) => (props.isSelectedRow ? '82px' : '32px')};
  }
  z-index: 2;
`;
