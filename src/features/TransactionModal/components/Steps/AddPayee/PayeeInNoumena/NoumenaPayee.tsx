import { type FC } from 'react';
import { TSpan } from '@/components/Typography';
import { Radiobox } from '@/components/Radiobox';
import { Icon } from '@/components/Icon';
import logo from '@/assets/images/noumena-filled-logo.svg';
import { Payee, Avatar, Details, Account } from './styles';
import { type TSearchedPayee } from './types';

interface NoumenaPayeeProps {
  payee: TSearchedPayee;
  handleSelect: (val: TSearchedPayee | null) => void;
  isSelected: boolean;
}

const NoumenaPayee: FC<NoumenaPayeeProps> = ({
  payee,
  handleSelect,
  isSelected,
}) => {
  const handleRadioChange = (val: boolean) => {
    handleSelect(val ? payee : null);
  };
  return (
    <Payee>
      <Avatar src={logo} alt="avatar" />
      <Account>
        <Details>
          <TSpan
            font="body-m-bold"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {payee.customerName}
          </TSpan>
        </Details>
        <Details>
          <TSpan
            font="footnote"
            colorToken="--text-tablecell-body-neutral-default"
          >
            {payee.accountType === 'BANK'
              ? `****${payee.maskAccountNumber}`
              : payee.walletName}
          </TSpan>
        </Details>
      </Account>
      <Radiobox
        isChecked={isSelected}
        onChange={handleRadioChange}
        icon={
          <Icon
            name="flag_pl_m"
            size={12}
            color={
              isSelected
                ? '--icon-radiobutton-brand-primary-default'
                : '--bg-radiobutton-neutral-alt-default'
            }
          />
        }
      />
    </Payee>
  );
};

export default NoumenaPayee;
