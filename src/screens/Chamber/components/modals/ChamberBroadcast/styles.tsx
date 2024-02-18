import styled from 'styled-components';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';

export const ModalDescription = styled(TSpan)`
  white-space: pre-line;
`;

export const NoCampaign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 16px;
`;

export const EmptyCampaignsContainer = styled.div`
  width: 343px;
`;

export const NoCampaignDescription = styled(TSpan)`
  text-align: center;
  white-space: pre-line;
`;

export const ButtonWrapper = styled.div<{
  justifyCenter?: boolean;
  flexDirection?: 'row' | 'column';
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyCenter ? 'center' : 'space-between'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  gap: 16px;
  width: 100%;
  @media (min-width: ${mediaSizes.MOBILE_L_MAX}) {
    margin-top: 16px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    margin-bottom: 24px;
  }
`;
export const ModalButton = styled(Button)<{ flex?: boolean }>`
  flex: 1;
`;

export const MainOptionWrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const MainOptionSeparator = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--bg-separator-neutral-default);
`;
export const OptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const OptionDescription = styled(ModalDescription)``;
