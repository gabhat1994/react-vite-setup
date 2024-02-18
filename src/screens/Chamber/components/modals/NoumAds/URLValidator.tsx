import { type ReactNode } from 'react';

import * as S from './styles';

type URLValidatorProps = {
  intent: 'success' | 'disabled' | 'danger';
  label: ReactNode;
};

export function URLValidator({ intent, label }: URLValidatorProps) {
  return (
    <S.URLValidator>
      <S.Indicator intent={intent} />
      {label}
    </S.URLValidator>
  );
}
