import { Fragment, useState } from 'react';
import { t } from 'i18next';
import { Separator } from '@/components/Separator/Separator';
import { useToast } from '@/hooks';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { NoumWalletCreateModal } from '@/screens/Chamber/components/modals/NoumWalletCreateModal';
import { useToolbox } from '@/features/noums/hooks/Toolbox';
import { useCheckWalletStatus } from '@/features/money/hooks';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { type ListOfOptionsTypes } from '@/features/noums/components/Toolbox';
import ToolboxItem from './ToolbooxItem';
import { type ToolboxTabContentProps } from './types';
import { ToolboxItemsRow, ToolboxTabContentWrapper } from './styles';
import DisbleDToolTipSubWallet from './DisbleDToolTipSubWallet';

export const ToolboxTabContent = ({
  activeTab,
  handleSelectElementType,
}: ToolboxTabContentProps) => {
  const { addToast } = useToast();
  const { listOfOptionsV2 } = useToolbox(activeTab.group);
  const { hasWalletElement, isOwner } = useEditChamberState();
  const { walletStatus } = useCheckWalletStatus();
  const handleCloseNoumWalletCreateModal = () => {
    setShowNoumWalletCreateModal(false);
  };
  const { hasElementPermission } = useNoumAuthorization();
  const isWalletManager = hasElementPermission(
    PermissibleElementType.Payment,
    'create-wallet',
    isOwner,
  );
  const [showNoumWalletCreateModal, setShowNoumWalletCreateModal] =
    useState<boolean>(false);
  const itemClicked: { [key: string]: boolean } = {};
  const manageItemClicked = (type: string) => {
    itemClicked[type] = true;
    const clickTimeout = setTimeout(() => {
      itemClicked[type] = false;
      clearInterval(clickTimeout);
    }, 3600);
  };
  const handleClick = (element: ListOfOptionsTypes) => {
    if (element.isComingSoon) return;
    if (element.disabled) {
      if (itemClicked[element.type]) return;
      if (element.toolTipText) {
        addToast('primary', 'icon', element.toolTipText);
      }
      manageItemClicked(element.type);
      return;
    }
    if (handleSelectElementType) {
      if (element.type === ElementTypeEnum.Wallet && hasWalletElement) {
        addToast(
          'error',
          'none',
          t('noumena.chambers.toolbox.subwaleet_element_exists'),
        );
        return;
      }
      if (element.type === ElementTypeEnum.Wallet && !hasWalletElement) {
        setShowNoumWalletCreateModal(true);
      } else {
        handleSelectElementType(element.type);
      }
    }
  };
  return (
    <ToolboxTabContentWrapper>
      {listOfOptionsV2.length > 0 && (
        <>
          {listOfOptionsV2.map(
            (list) =>
              list.items.length > 0 && (
                <Fragment key={list.groupName}>
                  <Separator
                    data-content={list.groupName}
                    isWithText={activeTab.group === 'all'}
                  />
                  <ToolboxItemsRow>
                    {list.items.map((el, index) => (
                      <ToolboxItem
                        toolTipText={
                          el.type === ElementTypeEnum.Wallet &&
                          !walletStatus &&
                          // Only the Wallet manager should see the tooltip with instructions on how to set up a wallet.
                          isWalletManager ? (
                            <DisbleDToolTipSubWallet />
                          ) : (
                            el.toolTipText
                          )
                        }
                        key={el.type}
                        name={el.name}
                        size={el.size}
                        text={el.text}
                        isDisabled={el.disabled}
                        isComingSoon={el.isComingSoon}
                        onClick={() => handleClick(el)}
                        childIndex={index}
                      />
                    ))}
                  </ToolboxItemsRow>
                </Fragment>
              ),
          )}
        </>
      )}
      <NoumWalletCreateModal
        isOpen={showNoumWalletCreateModal}
        handleClose={handleCloseNoumWalletCreateModal}
        handleSelectElementType={handleSelectElementType}
      />
    </ToolboxTabContentWrapper>
  );
};
