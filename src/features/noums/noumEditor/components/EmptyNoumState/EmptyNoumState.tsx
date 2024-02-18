import styled from 'styled-components';
import { useState } from 'react';
import { Stack } from '@/layout/Stack';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { PopoverWrapper } from '../PopoverWrapper';
import { SectionLayoutPicker } from '../SectionLayoutPicker';

type EmptyNoumStateProps = {
  title: string;
  description: string;
};

const EmptyNoumContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--color-base-gray-80);
  border-radius: 16px;
  padding: 68px 0;
  cursor: pointer;
  :hover {
    border-color: var(--border-add-section-neutral-hover);
    background-color: var(--bg-add-section-neutral-hover);
    path {
      fill: var(--icon-add-content-brand-primary-default);
    }
    & .section-header {
      color: var(--text-add-section-header-neutral-hover);
    }
  }
`;

export const EmptyNoumState = (props: EmptyNoumStateProps) => {
  const { title, description } = props;
  const [isPopover, setIsPopover] = useState(false);

  return (
    <PopoverWrapper
      isOpen={isPopover}
      onClose={() => setIsPopover(false)}
      offsetY={71}
      renderPopoverContent={() => (
        <SectionLayoutPicker position={1} setIsPopover={setIsPopover} />
      )}
      renderTargetContent={() => (
        <EmptyNoumContainer onClick={() => setIsPopover(true)}>
          <Stack
            gap={9}
            vertical
            align="center"
            onClick={() => setIsPopover((prv) => !prv)}
          >
            <Icon name="plus_icon" size={16} />
            <TSpan font="body-l-bold" className="section-header">
              {title}
            </TSpan>
            <TSpan
              font="systemInfo-s"
              colorToken="--text-add-section-neutral-default"
            >
              {description}
            </TSpan>
          </Stack>
        </EmptyNoumContainer>
      )}
    />
  );
};
export default EmptyNoumState;
