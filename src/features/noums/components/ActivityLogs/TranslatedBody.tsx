import { Trans } from 'react-i18next';
import S from './styles';

interface TranslatedBodyProps {
  i18nKey: string;
  values?: Record<string, string | number | boolean | undefined | null>;
}

export function TranslatedBody({ i18nKey, values }: TranslatedBodyProps) {
  return (
    <Trans
      i18nKey={i18nKey}
      values={values}
      components={{
        b: <S.BodyHighlighted />,
      }}
    />
  );
}
