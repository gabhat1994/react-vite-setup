import { t } from 'i18next';
import { capitalize } from 'lodash';
import { TSpan } from '@/components/Typography';
import { Spinner } from '@/components/Spinner';
import { SpinnerContainer } from '@/common/globalStyles';
import { ResultContainer as ResultStack } from '../styles';
import { type ResultContainerProps } from './types';

const ResultContainer: React.FC<ResultContainerProps> = ({
  connections,
  followers,
  selectedNoums,
  loading,
}) => (
  <ResultStack>
    <TSpan
      colorToken="--text-tablecell-header-neutral-highlighted"
      font="body-l-bold"
    >
      {t(`noumena.result`, {
        punctuation: ':',
      })}
    </TSpan>
    {loading ? (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    ) : (
      <TSpan colorToken="--text-tablecell-body-neutral-default" font="body-m">
        {`${selectedNoums} ${t(
          'noumena.link_noums.linked_noums',
        )} (${connections} ${capitalize(
          t('noumena.connections'),
        )}, ${followers} ${capitalize(t('noumena.followers'))})`}
      </TSpan>
    )}
  </ResultStack>
);

export default ResultContainer;
