import { Icon, TSpan } from '@/components';
import { Stack } from '@/layout';
import DefaultImage from '@/assets/images/chamber_default.png';
import {
  Dropdown,
  DropdownPicker,
  type DropdownValueType,
  type DropdownTargetProps,
} from '@/components/Dropdown';
import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { NoumCard, Image, DropdownItemWrapper } from './styles';
import { type ICard } from './types';
import { RemoveNoumFromPlanModal } from '../RemoveNoumFromPlanModal';

type ModalType = 'remove-noum';

export const Card = ({
  noumName,
  noumId,
  profileImage,
  subscriptionId,
  onRemoveNoum,
}: ICard) => {
  const navigate = useNavigate();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();
  const options: DropdownValueType<string>[] = [
    {
      key: 'view_noum',
      label: (
        <DropdownItemWrapper>
          <Icon name="eye_on_m" size={24} />
          <TSpan
            font="body-m-bold"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            Go To Noum
          </TSpan>
        </DropdownItemWrapper>
      ),
      type: 'value',
      value: 'view_noum',
    },
    {
      key: 'remove_noum',
      label: (
        <DropdownItemWrapper>
          <Icon
            name="unlink_m"
            size={24}
            color="--text-card-neutral-highlighted"
          />
          <Stack vertical fullWidth>
            <TSpan
              font="body-m-bold"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              Remove from this Plan
            </TSpan>
            <TSpan
              font="footnote"
              colorToken="--text-tablecell-body-neutral-default"
            >
              This Noum will be archived
            </TSpan>
          </Stack>
        </DropdownItemWrapper>
      ),
      type: 'value',
      value: 'remove_noum',
    },
  ];

  const handleSelction = useCallback(
    (e: DropdownValueType<string>) => {
      if (e.key === 'view_noum') {
        if (noumId) {
          navigate(generatePath(ROUTES.NOUM, { id: noumId }));
        }
      } else {
        openModal('remove-noum');
      }
    },
    [navigate, noumId, openModal],
  );

  return (
    <>
      <NoumCard>
        <Stack gap={12} fullWidth>
          <Image src={profileImage || DefaultImage} alt="noum image" />
          <TSpan
            font="body-m-bold"
            colorToken="--text-card-neutral-highlighted"
          >
            {noumName}
          </TSpan>
        </Stack>
        <Dropdown
          hideIcons
          options={options}
          usePortal={true}
          containerWidth="230px"
          onSelectOption={handleSelction}
          placement="auto-start"
          calRefTop={false}
          usePopStyle={true}
        >
          {({
            targetProps,
            targetRef,
            toggle,
          }: DropdownTargetProps<HTMLDivElement>) => (
            <>
              <DropdownPicker ref={targetRef} {...targetProps} onClick={toggle}>
                <Icon
                  name="more_m"
                  color="--icon-button-neutral-default"
                  size={24}
                />
              </DropdownPicker>
            </>
          )}
        </Dropdown>
      </NoumCard>
      <RemoveNoumFromPlanModal
        open={modalType === 'remove-noum'}
        onClose={closeModal}
        noumId={noumId}
        subscriptionId={subscriptionId}
        onRemoveNoum={onRemoveNoum}
      />
    </>
  );
};
