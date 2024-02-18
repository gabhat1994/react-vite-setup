import { Icon, TSpan } from '@/components';
import { HoverTooltip } from '@/components/HoverTooltip/HoverTooltip';
import { Stack } from '@/layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import S from './styles';
import { type GeniusAssistButtonType } from './types';
import { GeniusUtils } from '../../utils';

export type GeniusAssistTagProps = {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  type?: GeniusAssistButtonType;
  tooltipEnabled?: boolean;
  iconSize?: number;
};

export const GeniusAssistTag: React.FC<GeniusAssistTagProps> = ({
  onClick,
  tooltipEnabled,
  type = 'default',
  iconSize = 16,
}) => {
  const { t } = useTranslation();
  const label = GeniusUtils.getAssistTagLabel(type);

  return (
    <HoverTooltip
      text={t('noumena.genius.assist')}
      position="bottom-center"
      visible={tooltipEnabled}
      delay={200}
    >
      <S.Container onClick={onClick} type="button">
        <Stack fullWidth align="center" gap={4}>
          <Icon
            color="--color-base-warning-50"
            name="genius_m"
            size={iconSize}
          />
          {label && (
            <TSpan font="footnote-bold" colorToken="--text-tag-neutral-default">
              {label}
            </TSpan>
          )}
        </Stack>
      </S.Container>
    </HoverTooltip>
  );
};
