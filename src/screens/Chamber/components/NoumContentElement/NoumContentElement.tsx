import { t } from 'i18next';
import { type FC, useMemo, useState } from 'react';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout/Stack';
import { Icon } from '@/components/Icon';

import {
  PopoverWrapper,
  Toolbox,
} from '@/features/noums/noumEditor/components';
import { NoumContentElementWrapper } from './styles';
import { type DroppableAreaProps } from '../SectionElementRearrange/types';
import { useEditChamberState } from '../../EditChamber/provider';

export const NoumContentElement: FC<DroppableAreaProps> = (props) => {
  const { spaceId, columnId, col } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { sectionSideBarOptions } = useEditChamberState();

  const isColumn = useMemo(
    () => col?._id === sectionSideBarOptions?.selectedLayout?.id,
    [col?._id, sectionSideBarOptions?.selectedLayout?.id],
  );

  return (
    <PopoverWrapper
      isOpen={isPopoverOpen}
      width={500}
      offsetY={10}
      onClose={() => setIsPopoverOpen(false)}
      renderPopoverContent={() => (
        <Toolbox
          spaceId={spaceId || ''}
          handleSelectElementType={() => setIsPopoverOpen(false)}
          columnId={columnId || ''}
        />
      )}
      renderTargetContent={() => (
        <NoumContentElementWrapper
          isColumnBackground={
            isColumn
              ? sectionSideBarOptions?.columnBackground?.background
              : col?.background
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsPopoverOpen(true);
          }}
        >
          <Stack gap={9} align="center">
            <Icon
              name="plus_icon"
              size={16}
              color="--icon-add-content-brand-primary-default"
            />
            <TSpan
              aria-label="add_content"
              font="body-m"
              colorToken="--text-add-content-brand-primary-default"
            >
              {t('noumena.noum_editor.column_content')}
            </TSpan>
          </Stack>
        </NoumContentElementWrapper>
      )}
    />
  );
};

export default NoumContentElement;
