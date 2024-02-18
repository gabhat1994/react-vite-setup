import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { useToast } from '@/hooks';
import { Checkbox } from '@/components/Checkbox';
import { useCreateProjectNoumCampaignMutation } from '@/apollo/graphql';
import { CampaignAudienceTarget } from '@/apollo/generated/types';
import { useCampaigns } from '@/features/noums/hooks/noums';
import { type NewBroadcastModalProps } from '../types';
import * as S from '../styles';
import { campaignOptions } from './data';

export const CreateBroadcastModal = ({
  isOpen,
  onClose,
  noumId,
  noumType,
}: NewBroadcastModalProps) => {
  const { addToast } = useToast();
  const { t } = useTranslation();

  const { refetchCampaigns } = useCampaigns(noumId, true, 10);

  const isIPhone = !!window?.navigator.userAgent.match(/iPhone/i);
  const [createProjectNoumCampaignMutation, { loading }] =
    useCreateProjectNoumCampaignMutation({
      onCompleted: (response) => {
        if (response.createProjectNoumCampaign) {
          onClose();
          refetchCampaigns();
          addToast(
            'success',
            'icon',
            t('noumena.chamber_edit.new_broadcasting.started'),
          );
        }
      },
      onError: (err) => {
        addToast('error', 'none', err.message);
      },
    });

  const [optionChecked, setOptionChecked] = useState(
    campaignOptions.map((item) => ({
      ...item,
      checked: false,
      show: false,
    })),
  );

  useEffect(() => {
    const newOptions = optionChecked.map((item) => ({
      ...item,
      show: !(
        noumType === 'SECRET' &&
        item.id === CampaignAudienceTarget.EntireCommunity
      ),
    }));
    setOptionChecked(newOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noumType]);

  const disableOtherOptions = useMemo(() => {
    const foundEntireCommunity = optionChecked.find(
      (item) => item.id === CampaignAudienceTarget.EntireCommunity,
    );
    return foundEntireCommunity && foundEntireCommunity.checked;
  }, [optionChecked]);
  const softDisabled = useMemo(
    () => optionChecked.every((item) => !item.checked),
    [optionChecked],
  );

  const toggleOption = (id: CampaignAudienceTarget) => () => {
    if (disableOtherOptions && id !== CampaignAudienceTarget.EntireCommunity)
      return;

    let filteredCheckOption = [...optionChecked];
    const foundEntireCommunityIdx = filteredCheckOption.findIndex(
      (item) => item.id === CampaignAudienceTarget.EntireCommunity,
    );
    const foundEntireCommunity = filteredCheckOption[foundEntireCommunityIdx];
    if (id === CampaignAudienceTarget.EntireCommunity) {
      filteredCheckOption = filteredCheckOption.map((item) => ({
        ...item,
        checked: false,
      }));
      filteredCheckOption.splice(foundEntireCommunityIdx, 1, {
        ...foundEntireCommunity,
        checked: !foundEntireCommunity.checked,
      });
    } else {
      filteredCheckOption.splice(foundEntireCommunityIdx, 1, {
        ...foundEntireCommunity,
        checked: false,
      });
      const foundIdx = filteredCheckOption.findIndex((item) => item.id === id);
      if (foundIdx > -1) {
        filteredCheckOption.splice(foundIdx, 1, {
          ...filteredCheckOption[foundIdx],
          id,
          checked: !filteredCheckOption[foundIdx].checked,
        });
      }
    }
    setOptionChecked(filteredCheckOption);
  };

  const onSubmit = () => {
    createProjectNoumCampaignMutation({
      variables: {
        spaceId: noumId,
        targets: optionChecked
          .filter((item) => item.checked)
          .map((item) => item.id) as CampaignAudienceTarget[],
      },
    });
  };

  return (
    <Modal
      testId="chamber-campaign-create-modal"
      open={isOpen}
      onClose={onClose}
      size={ModalSize.XL}
      hasBackButton
      disableBackdropClick
      closeButtonStyles={{
        enforceLeft: true,
      }}
    >
      <ModalHeader>
        {t(`noumena.chamber_edit.new_broadcasting.title`)}
      </ModalHeader>
      <ModalBody
        loading={loading}
        loadingDescription={t(
          'noumena.chamber_edit.new_broadcasting.loading_description',
        )}
      >
        <S.ModalDescription
          colorToken="--text-modal-neutral-default"
          font="body-l"
          textAlign="left"
        >
          {t(`noumena.chamber_edit.new_broadcasting.description`)}
        </S.ModalDescription>
        {optionChecked.map(({ heading, description, id, checked, show }, idx) =>
          show ? (
            <React.Fragment key={id}>
              <S.MainOptionWrapper>
                <S.OptionWrapper onClick={toggleOption(id)}>
                  <TSpan
                    font="body-l-bold"
                    colorToken="--text-tablecell-header-neutral-highlighted"
                  >
                    {t(heading)}
                  </TSpan>
                  <S.OptionDescription
                    colorToken="--text-tablecell-body-neutral-default"
                    font="body-m"
                  >
                    {t(description)}
                  </S.OptionDescription>
                </S.OptionWrapper>
                <Checkbox
                  disableClick={
                    id !== CampaignAudienceTarget.EntireCommunity
                      ? disableOtherOptions
                      : undefined
                  }
                  onChange={toggleOption(id)}
                  icon={
                    <Icon
                      name="tick_m"
                      size={checked ? 24 : 0}
                      color="--icon-checkbox-neutral-alt-default"
                    />
                  }
                  isChecked={checked}
                />
              </S.MainOptionWrapper>
              {idx !== optionChecked.length - 1 && <S.MainOptionSeparator />}
            </React.Fragment>
          ) : undefined,
        )}
      </ModalBody>
      <ModalFooter loading={loading}>
        <S.ButtonWrapper>
          <S.ModalButton
            tertiary
            testId="chamber-campaign-cancel-action"
            onClick={onClose}
          >
            {t(`noumena.chamber_edit.new_broadcasting.cancel_action`)}
          </S.ModalButton>
          <S.ModalButton
            testId="chamber-campaign-create-action"
            primary
            softDisabled={softDisabled}
            onClick={onSubmit}
          >
            {t(`noumena.chamber_edit.new_broadcasting.complete_action`)}
          </S.ModalButton>
        </S.ButtonWrapper>
        {isIPhone ? <Spacer height={16} /> : undefined}
      </ModalFooter>
    </Modal>
  );
};

export default CreateBroadcastModal;
