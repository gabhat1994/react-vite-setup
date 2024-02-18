import { t } from 'i18next';

import { Spacer } from '@/layout';
import { useBreakpoints } from '@/hooks';
import { Button, Icon, TSpan } from '@/components';

import type { EventModalHeaderProps } from './types';
import { ModalHeader, LabelContainer, HeaderContent } from './styles';

export const EventModalHeader = ({
  isEditing,
  onCancelModal,
}: EventModalHeaderProps) => {
  const { isMobile } = useBreakpoints();
  const { isLaptop } = useBreakpoints();
  return (
    <ModalHeader flexDirection="column">
      <HeaderContent
        grow={1}
        data-testid="header-content"
        vertical={isMobile}
        align={isMobile ? 'start' : 'center'}
      >
        <Button
          textOnly={!isLaptop}
          onClick={onCancelModal}
          icon={<Icon name="close_m" size={24} />}
          size="small"
        />
        <Spacer height={24} />
        <LabelContainer align="center" justify="center" grow={1}>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-modal-header-neutral-default"
          >
            {isEditing
              ? t('noumena.event.edit.modal.title_v2')
              : t('noumena.event.create.modal.title')}
          </TSpan>
        </LabelContainer>
      </HeaderContent>
    </ModalHeader>
  );
};
