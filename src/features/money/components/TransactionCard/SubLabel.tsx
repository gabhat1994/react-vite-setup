import { Trans } from 'react-i18next';
import { TSpanFootnote } from '../styles';

type MainLabelProps = {
  i18nKey: string;
  name: string;
};

export const SubLabel = ({ i18nKey, name }: MainLabelProps) => (
  <TSpanFootnote>
    <Trans
      i18nKey={i18nKey}
      components={{ b: <TSpanFootnote /> }}
      values={{ name }}
    />
  </TSpanFootnote>
);
