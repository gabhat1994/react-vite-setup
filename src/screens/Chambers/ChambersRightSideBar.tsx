import { type FC } from 'react';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import ReceivedRequests from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import MyPlans from '@/screens/Money/Payments/MyPlans';
import EllipsisMenu from './EllipsisMenu';
import { rightSideMenuOptions } from './constants';
import { SideBarContainer, CreateChamberButton } from './styles';
import ReceivedRequestsV2 from '../Chamber/components/RightPanel/elements/ReceivedRequests/ReceivedRequestsV2';

interface Props {
  onContactManagerClick: () => void;
  onContractManagerClick: () => void;
  onInvoiceManagerClick: () => void;
  onToggleCreate: () => void;
  onToggleLinkNoum: () => void;
  onToggleManageMembers: () => void;
  onCampaginManagerClick: () => void;
}

const ChambersRightSideBar: FC<Props> = ({
  onContactManagerClick,
  onContractManagerClick,
  onInvoiceManagerClick,
  onToggleCreate,
  onToggleLinkNoum,
  onToggleManageMembers,
  onCampaginManagerClick,
}) => {
  const {
    flags: {
      contractTool,
      paymentSubscriptions,
      invoiceTool,
      contacts,
      campaigns,
      elementPermission,
    },
  } = useLaunchDarkly();
  const { isActive: access, masterId: mainSpaceId } = useAuth();

  const handleEllipsisClick = (e?: string) => {
    if (e === t(`noumena.noum_link.link_noums`)) {
      onToggleLinkNoum();
    }
    if (e === 'manage_members') {
      onToggleManageMembers();
    }
  };

  return (
    <SideBarContainer>
      <CreateChamberButton>
        <Button
          onClick={onToggleCreate}
          softDisabled={!access}
          primary
          size="full"
          data-testid="create-chamber"
          icon={
            <Icon
              name="plus_m"
              size={24}
              color={!access ? '--icon-button-neutral-alt-default' : ''}
            />
          }
        >
          {t('noumena.noum_create_new.text')}
        </Button>
        <div className="ellipsis-menu">
          <EllipsisMenu
            menuOptions={rightSideMenuOptions.filter((option) => {
              if (option.value === 'manage_members') {
                return elementPermission;
              }
              return true;
            })}
            size="full"
            onClick={handleEllipsisClick}
            containerWidth="147"
          />
        </div>
      </CreateChamberButton>
      {access && contractTool && (
        <Button
          secondary
          size="full"
          data-testid="contract_manager"
          onClick={onContractManagerClick}
        >
          {t('noumena.contract_manager.contract_manager')}
        </Button>
      )}
      {access && invoiceTool && (
        <Button
          secondary
          size="full"
          data-testid="invoice_manager"
          onClick={onInvoiceManagerClick}
        >
          Invoice Manager
        </Button>
      )}
      {access && contacts && (
        <Button
          secondary
          size="full"
          data-testid="contact_manager"
          onClick={onContactManagerClick}
        >
          {t('noumena.contact_manager.contact_manager')}
        </Button>
      )}
      {access && campaigns && (
        <Button
          secondary
          size="full"
          data-testid="campaigns_manager"
          onClick={onCampaginManagerClick}
        >
          {t('noumena.campaigns')}
        </Button>
      )}
      {elementPermission ? (
        <ReceivedRequestsV2 />
      ) : (
        <ReceivedRequests noumId={mainSpaceId} isChambersScreen />
      )}

      {/* TODO: Remove MyPlans from here and place into new Side bar which is for tablet and mobile when dev is complete. See designs under NOUM-4693 */}
      {paymentSubscriptions && access && <MyPlans />}
    </SideBarContainer>
  );
};

export default ChambersRightSideBar;
