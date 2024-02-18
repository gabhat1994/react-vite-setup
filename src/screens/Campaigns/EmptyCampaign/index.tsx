import { useNavigate } from 'react-router';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Stack } from '@/layout';
import ROUTES from '@/constants/routes';
import { Wrapper } from './styles';

export const EmptyCampaign = () => {
  const navigate = useNavigate();
  const handleNewCampaign = () => navigate(ROUTES.CAMPAIGN_CREATE);

  return (
    <Wrapper>
      <header>
        <TSpan font="heading-xs-bold">Campaigns</TSpan>
      </header>
      <Stack fullWidth vertical align="center" gap={22}>
        <Icon name="ads_m" size={96} />
        <TSpan font="body-l" colorToken="--text-placeholder-neutral-default">
          You haven’t started any campaigns yet.
        </TSpan>
        <Button
          onClick={handleNewCampaign}
          primary
          size="small"
          leftIcon={<Icon name="add_m" size={24} />}
        >
          New Campaign
        </Button>
      </Stack>
    </Wrapper>
  );
};
