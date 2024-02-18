import { useToggle } from '@/hooks';

import { type CampaignBasicFragment } from '@/apollo/graphql';
import {
  CollapsibleCampaignBase,
  CampaignHeader,
  Left,
  Right,
  CollapseIcon,
  CampaignBody,
  CampaignItem,
  CampaignValue,
  CampaignRow,
  ListCampaignTitle,
} from './styles';

import { Badge, type Props as BadgeProps } from '../components/Badge';
import { ActionMenu } from './ActionMenu';
import { Utils } from '../utils';

type Props = {
  noumName: string;
  campaignName: string;
  campaignStartDate: string;
  campaignEndData: string;
  campaignStatus: BadgeProps['status'];
  campaign: CampaignBasicFragment;
  onDelete: (campaign: { id: string; title: string }) => void;
};

export function CampaignsCollapsibleItem({
  campaignName,
  noumName,
  campaignStartDate,
  campaignEndData,
  campaignStatus,
  campaign,
  onDelete,
}: Props) {
  const [isCollapsed, toggleCollapse] = useToggle(true);

  return (
    <CollapsibleCampaignBase>
      <CampaignHeader>
        <Left>
          <ListCampaignTitle>
            {Utils.truncateString(campaignName, 20)}
          </ListCampaignTitle>
          <Badge status={campaignStatus} />
        </Left>
        <Right>
          <ActionMenu campaign={campaign} onDelete={onDelete} />
          <CollapseIcon
            onClick={toggleCollapse}
            name={isCollapsed ? 'chevron_down_m' : 'chevron_up_m'}
            size={12}
          />
        </Right>
      </CampaignHeader>
      {!isCollapsed && (
        <CampaignBody fullWidth vertical gap={8}>
          <CampaignRow>
            <CampaignItem>Noum</CampaignItem>
            <CampaignValue>{noumName}</CampaignValue>
          </CampaignRow>
          <CampaignRow>
            <CampaignItem>Start Date</CampaignItem>
            <CampaignValue>{campaignStartDate}</CampaignValue>
          </CampaignRow>
          <CampaignRow>
            <CampaignItem>End Date</CampaignItem>
            <CampaignValue>{campaignEndData}</CampaignValue>
          </CampaignRow>
        </CampaignBody>
      )}
    </CollapsibleCampaignBase>
  );
}
