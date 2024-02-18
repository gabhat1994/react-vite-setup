import { type FC } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { Option, OptionName } from './style';
import EAddPayeeStates from '../types';

interface SelectPayeeProps {
  handleStateChange: (state: EAddPayeeStates) => void;
}

const SelectPayee: FC<SelectPayeeProps> = ({ handleStateChange }) => (
  <Stack fullWidth vertical align="center" justify="center">
    <Spacer height={50} />
    <Option onClick={() => handleStateChange(EAddPayeeStates.PAYEE_NOUMENA)}>
      <OptionName>
        <TSpan
          font="body-l"
          colorToken="--text-tablecell-body-neutral-highlighted"
        >
          {t('noumena.money.addPayee.option.one')}
        </TSpan>
      </OptionName>
      <Icon
        name="chevron_right_m"
        size={12}
        color="--icon-tablecell-neutral-default"
      />
    </Option>
    <Spacer height={16} />
    <Option
      onClick={() => handleStateChange(EAddPayeeStates.PAYEE_OUTSIDE_NOUMENA)}
    >
      <OptionName>
        <TSpan
          font="body-l"
          colorToken="--text-tablecell-body-neutral-highlighted"
        >
          {t('noumena.money.addPayee.option.two')}
        </TSpan>
      </OptionName>
      <Icon
        name="chevron_right_m"
        size={12}
        color="--icon-tablecell-neutral-default"
      />
    </Option>
  </Stack>
);

export default SelectPayee;
