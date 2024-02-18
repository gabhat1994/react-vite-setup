import { useTranslation } from 'react-i18next';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { type ContractBasic } from '../../types';
import S from './styles';

interface ContractDetailsProps {
  contract: ContractBasic;
}

export function ContractDetails({ contract }: ContractDetailsProps) {
  const { t } = useTranslation();

  return (
    <S.DetailsContainer>
      <S.DetailsItem>
        <S.DetailsItemLabel>
          {t('noumena.contracts.contract_selector.details.buyer')}
        </S.DetailsItemLabel>
        <S.DetailsItemValue>
          {contract.buyer?.displayName ?? '--'}
        </S.DetailsItemValue>
      </S.DetailsItem>
      <S.DetailsItem>
        <S.DetailsItemLabel>
          {t('noumena.contracts.contract_selector.details.seller')}
        </S.DetailsItemLabel>
        <S.DetailsItemValue>
          {contract.seller?.displayName ?? '--'}
        </S.DetailsItemValue>
      </S.DetailsItem>
      <S.DetailsItem>
        <S.DetailsItemLabel>
          {t('noumena.contracts.contract_selector.details.effective_date')}
        </S.DetailsItemLabel>
        <S.DetailsItemValue>
          {contract.effectiveDate
            ? formatDateString(new Date(contract.effectiveDate))
            : '--'}
        </S.DetailsItemValue>
      </S.DetailsItem>
    </S.DetailsContainer>
  );
}
