import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { Infinite } from '@/components/Infinite';
import { Campaign } from '@/features/noumCampaigns/components';
import { useCampaigns } from '@/features/noums/hooks/noums';
import { useBreakpoints } from '@/hooks';
import { Spacer } from '@/layout';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteChamberBroadcastModal } from '../DeleteBroadcast';
import * as S from '../styles';
import { type BroadcastModalProps } from '../types';

export const ViewBroadcastModal = ({
  isOpen,
  onClose,
  onCampaign,
}: BroadcastModalProps) => {
  const { t } = useTranslation();
  const [currentSelectBroadcast, setCurrentSelectBroadcast] =
    useState<string>('');
  const [showDeleteBroadcastModal, setShowDeleteBroadcastModal] =
    useState(false);
  const { isMobile, isDesktop } = useBreakpoints();
  const { space } = useEditChamberState();

  const {
    loading: campaignsLoading,
    campaigns,
    infiniteState,
    fetchMoreCampaigns,
    refetchCampaigns,
  } = useCampaigns(space?._id ?? '', true, 10);

  const onCampaignClick = () => {
    onClose();
    onCampaign();
  };

  const toggleShowDeleteBroadcastModal = () => {
    setShowDeleteBroadcastModal(!showDeleteBroadcastModal);
  };

  return (
    <>
      <Modal
        isFullScreen={!isDesktop}
        enableCloseButton
        testId="chamber-broadcast-modal"
        open={isOpen}
        onClose={onClose}
        size={ModalSize.XL}
        disableBackdropClick
      >
        <ModalHeader
          action={
            campaigns.length ? (
              <Button
                style={{
                  marginLeft: !isDesktop ? 'auto' : 'none',
                }}
                secondary
                size="small"
                onClick={onCampaignClick}
                testId="chamber-broadcast-create-campaign-btn"
              >
                {t(`noumena.chamber_edit.broadcasting.start_action_small`)}
              </Button>
            ) : undefined
          }
          isFullScreen={!isDesktop}
          flexDirection={isDesktop ? 'row-reverse' : 'row'}
          justifyContent={isDesktop ? 'space-between' : 'initial'}
          rightMobileContainer
        >
          {t(`noumena.chamber_edit.broadcasting`)}
        </ModalHeader>
        <S.ModalDescription
          colorToken="--text-modal-neutral-default"
          font="body-l"
          style={{
            alignSelf: 'center',
          }}
        >
          {t(`noumena.chamber_edit.broadcasting.description`)}
        </S.ModalDescription>
        <Spacer height="16px" />
        <ModalBody
          isFullScreen={isMobile}
          style={{ paddingRight: 0, paddingLeft: isMobile ? 0 : 12 }}
          noFooter
        >
          {!campaignsLoading && campaigns?.length ? (
            <Infinite
              onFetchMore={fetchMoreCampaigns}
              status={infiniteState}
              testId="campaigns-container"
              paddingBottom="15px"
              style={{
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : undefined,
                width: '100%',
                overflow: 'unset',
                flexDirection: 'row',
                gap: 14,
              }}
            >
              {campaigns.map((data) => (
                <Campaign
                  {...data}
                  key={data.id}
                  onDelete={toggleShowDeleteBroadcastModal}
                  selectBroadcast={setCurrentSelectBroadcast}
                />
              ))}
              {campaigns.length === 1 && isDesktop && (
                <S.EmptyCampaignsContainer />
              )}
            </Infinite>
          ) : (
            <>
              <S.NoCampaign data-testid="chamber-broadcast-no-broadcast">
                <Icon
                  name="megaphone_xxxl"
                  size={80}
                  color="--icon-placeholder-neutral-default"
                />
                <S.NoCampaignDescription
                  font="body-l"
                  colorToken="--text-placeholder-neutral-default"
                >
                  {t(`noumena.chamber_edit.broadcasting.no_campaign.para_1`)}
                  {t(`noumena.chamber_edit.broadcasting.no_campaign.para_2`)}
                </S.NoCampaignDescription>
                <S.ModalButton
                  secondary
                  size="small"
                  onClick={onCampaignClick}
                  testId="chamber-broadcast-create-btn"
                >
                  {t(`noumena.chamber_edit.broadcasting.start_action`)}
                </S.ModalButton>
              </S.NoCampaign>
            </>
          )}
        </ModalBody>
      </Modal>
      <DeleteChamberBroadcastModal
        onRefetchCampaigns={refetchCampaigns}
        campaignId={currentSelectBroadcast}
        isOpen={showDeleteBroadcastModal}
        onClose={toggleShowDeleteBroadcastModal}
      />
    </>
  );
};

export default ViewBroadcastModal;
