import { generatePath, useNavigate } from 'react-router';
import { type CampaignBasicFragment } from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';

import ROUTES from '@/constants/routes';
import { cleanList } from '@/utils/list';
import { Utils } from '../utils';

enum Action {
  VIEW = 'VIEW',
  DOWNLOAD = 'DOWNLOAD',
  DELETE = 'DELETE',
}

type ActionMenuProps = {
  campaign: CampaignBasicFragment;
  onDelete: (campaign: { id: string; title: string }) => void;
};

export function ActionMenu({ campaign, onDelete }: ActionMenuProps) {
  const navigate = useNavigate();

  const handleMenuClick = (action: Action) => {
    switch (action) {
      case Action.VIEW:
        navigate(
          generatePath(ROUTES.CAMPAIGN_SUMMARY, { id: campaign._id || '' }),
        );
        break;
      case Action.DELETE:
        onDelete({ id: campaign._id ?? '', title: campaign.title ?? '' });
        break;
      case Action.DOWNLOAD:
        break;
    }
  };

  return (
    <DataGrid.ActionsMenu<Action>
      onClick={handleMenuClick}
      menuOptions={cleanList([
        {
          key: 'view-campaign',
          value: Action.VIEW,
          label: 'See Details',
          iconName: 'eye_on_m',
        },
        Utils.canDelete(campaign?.status ?? '')
          ? {
              key: 'delete-campaign',
              value: Action.DELETE,
              label: 'Delete',
              iconName: 'delete_m',
              intent: 'danger',
            }
          : undefined,
      ])}
    />
  );
}
