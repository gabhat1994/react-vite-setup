import { Button, Icon, Spinner, TSpan } from '@/components';
import { Stack } from '@/layout';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useGeniusContext } from '../contexts/GeniusContextProvider';
import S from './styles';

type ProcessLoadingProps = {
  loadingMessage: string;
};

export const ProcessLoading: React.FC<ProcessLoadingProps> = ({
  loadingMessage,
}) => {
  const { t } = useTranslation();
  const { cancel } = useGeniusContext();

  return (
    <S.StyledMotion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Stack fullWidth vertical gap={32}>
        <S.LoadingContainer>
          <Stack fullWidth align="center">
            <S.SpinnerContainer>
              <Spinner />
            </S.SpinnerContainer>
            <Stack grow>
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {loadingMessage}
              </TSpan>
            </Stack>

            <Button
              size="small"
              neutral
              leftIcon={<Icon name="close_m" size={24} />}
              onClick={cancel}
            >
              {t('noumena.genius.generating.stop')}
            </Button>
          </Stack>
        </S.LoadingContainer>
      </Stack>
    </S.StyledMotion>
  );
};
