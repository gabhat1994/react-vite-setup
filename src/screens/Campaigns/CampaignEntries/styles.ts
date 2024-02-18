import styled from 'styled-components';
import { Card } from '@/components/Card';
import { mediaSizes, sizes } from '@/constants/devices';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { type StackProps } from '@/layout/Stack/types';
import { ModalBody } from '@/components/ExtendedModal';

const spaceBetweenAttrs: StackProps = {
  fullWidth: true,
  align: 'center',
  justify: 'space-between',
};

export const Wrapper = styled(Card)`
  width: 100%;
  min-height: 294px;
  padding: 24px;
  @media (max-width: ${mediaSizes.MOBILE_S_MAX}) {
    padding: 0;
    span {
      padding: 12px 24px;
    }
  }
`;

export const CollapsibleCampaignBase = styled.div`
  padding: 16px 12px 16px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid var(--border-card-neutral-default);
`;

export const CampaignHeader = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 22px;
  box-sizing: border-box;
`;

export const Right = styled.div`
  width: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CollapseIcon = styled(Icon)`
  cursor: pointer;
`;

export const CampaignBody = styled(Stack)``;

export const CampaignRow = styled(Stack).attrs(spaceBetweenAttrs)``;

export const CampaignItem = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-default',
  font: 'footnote',
})``;
export const CampaignValue = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-default',
  font: 'footnote',
})``;

export const FilterContainer = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  gap: '16px',
  maxWidth: '580px',
})`
  margin-top: 28px;
`;
export const HeadingContainer = styled(Stack)``;

export const Heading = styled(TSpan).attrs({
  font: 'heading-xs-bold',
})``;

export const Actions = styled(Stack).attrs({
  fullWidth: false,
  gap: '16px',
})`
  max-width: 382px;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    max-width: 100%;
    width: 100%;
  }
`;

export const SubHeading = styled(TSpan).attrs({
  font: 'body-l-bold',
})``;

export const SortingLabel = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-tablecell-header-neutral-highlighted',
})``;

export const SortingRow = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  gap: '16px',
})`
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const ActionContainer = styled.span`
  display: none;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    z-index: 55;
    position: fixed;
    display: flex;
    bottom: calc(100vh - 88vh);
    right: 16px;
    height: 56px;
    box-sizing: border-box;
    gap: 16px;
  }
`;

export const ActionFilter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: var(--bg-button-floating-neutral-alt-default);
`;

export const StyledModalBody = styled(ModalBody)`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    height: calc(100% - 10px);
    max-height: calc(100% - 10px);
  }
`;

export const FilterValue = styled.div`
  font-family: var(--font-footnote-regular-font);
  font-size: var(--font-footnote-regular-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-footnote-regular-lineheight);
  width: 100%;
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--text-tablecell-body-neutral-default);
`;

export const ListCampaignTitle = styled(TSpan).attrs({
  font: 'body-m-bold',
})`
  padding-top: 5px;
  max-width: 60%;
`;
