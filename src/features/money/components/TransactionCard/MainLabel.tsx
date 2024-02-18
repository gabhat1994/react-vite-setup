import { Trans } from 'react-i18next';
import { TSpan } from '@/components';
import { TSpanBold } from '../styles';

type MainLabelProps = {
  i18nKey: string;
  name: string;
};

export const MainLabel = ({ i18nKey, name }: MainLabelProps) => (
  <TSpan colorToken="--text-tablecell-header-neutral-highlighted">
    <Trans
      i18nKey={i18nKey}
      components={{ b: <TSpanBold /> }}
      values={{ name }}
    />
  </TSpan>
);
