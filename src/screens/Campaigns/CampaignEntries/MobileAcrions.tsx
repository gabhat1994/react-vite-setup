import { Button } from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { ActionContainer, ActionFilter } from './styles';

type MobileActionsProps = {
  onToggleFilter: () => void;
  onNewCampaign: () => void;
};

export function MobileActions({
  onToggleFilter,
  onNewCampaign,
}: MobileActionsProps) {
  return (
    <ActionContainer>
      <ActionFilter>
        <Button
          size="large"
          neutral
          onClick={onToggleFilter}
          data-testid="campaign-filtering"
          rightIcon={
            <Icon
              name="align_center_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
        />
      </ActionFilter>
      <Button
        size="large"
        primary
        data-testid="create-chamber"
        onClick={onNewCampaign}
        leftIcon={
          <Icon
            name="plus_m"
            size={24}
            color="--icon-button-neutral-alt-default"
          />
        }
      />
    </ActionContainer>
  );
}
