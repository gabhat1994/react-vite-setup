import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { TSpan } from '@/components';
import { Spacer, Stack } from '@/layout';
import { DropDownIcon } from '@/features/events/styles/DropDownIcon';
import { AddMemberBtn } from '../AddMemberBtn';
import { Wrapper, EventFieldLabel } from './styles';
import type { AddMemberHeaderProps } from './types';

export const AddMemberHeader = ({
  count,
  toggle,
  isExpand,
  onExpand,
  headingLabel,
  expandBtnLabel,
}: AddMemberHeaderProps) => {
  const onToggleHandler = () => {
    if (count) {
      toggle();
    }
  };

  return (
    <Stack
      align="center"
      justify="space-between"
      fullWidth
      data-testid="event-hosts-header"
    >
      <Wrapper
        isDisabled={!count}
        align="center"
        onClick={onToggleHandler}
        data-testid="event-hosts-label"
      >
        <DropDownIcon
          name="chevron_down_m"
          isOpen={isExpand}
          size={16}
          color={
            count
              ? '--icon-tablecell-neutral-highlighted'
              : '--icon-tablecell-neutral-disabled'
          }
        />
        <Spacer width={8} />
        <EventFieldLabel
          font="body-l-bold"
          colorToken="--text-body-header-neutral-default"
        >
          <Trans
            i18nKey={headingLabel}
            values={{ count }}
            components={{
              count: (
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-modal-neutral-default"
                />
              ),
              spacer: <Spacer width={8} />,
            }}
          />
        </EventFieldLabel>
      </Wrapper>

      <AddMemberBtn label={t(expandBtnLabel)} onClick={onExpand} />
    </Stack>
  );
};
