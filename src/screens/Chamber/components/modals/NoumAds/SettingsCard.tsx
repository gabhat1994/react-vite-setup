import { TSpan } from '@/components/Typography';
import * as S from './styles';

import { type SettingsCardProps } from './types';

export function SettingsCard({ title, content }: SettingsCardProps) {
  return (
    <S.SettingsCard>
      <TSpan
        font="body-xl-bold"
        colorToken="--text-card-header-neutral-highlighted"
      >
        {title}
      </TSpan>
      {content}
    </S.SettingsCard>
  );
}
