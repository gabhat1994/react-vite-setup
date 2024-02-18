import { useMemo } from 'react';
import { TSpan } from '@/components/Typography';
import { Tag } from '@/components/Tag';
import { ApplicationResultStatusAdmin } from '@/apollo/generated/types';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import {
  StatusWrapper,
  StatusBox,
  StatusText,
  Helpertext,
  RiseStepWrapperTablet,
} from './styles';
import { type IRiseApplicationStatus } from './types';

const RiseApplicationStatus = ({ status, isOwner }: IRiseApplicationStatus) => {
  const { t } = useTranslation();
  const { isTablet, isMobile, isDesktop } = useBreakpoints();
  const statusObject = useMemo(() => {
    if (status === ApplicationResultStatusAdmin.Approved) {
      return {
        status: t('noumena.rise.status.approved'),
        helperText: t('noumena.rise.status.approved.helper'),
        success: true,
        danger: false,
      };
    }
    if (status === ApplicationResultStatusAdmin.Rejected) {
      return {
        status: t('noumena.rise.status.rejected'),
        helperText: t('noumena.rise.status.rejected.helper'),
        success: false,
        danger: true,
      };
    }
    return {
      status: t('noumena.rise.status.pending'),
      helperText: t('noumena.rise.status.pending.helper'),
      success: false,
      danger: false,
    };
  }, [status, t]);

  if (isMobile) {
    return (
      <RiseStepWrapperTablet
        vertical
        gap={12}
        fullWidth
        align="stretch"
        padding={12}
      >
        <Stack vertical borderBottom={isOwner} gap={8} padding={12}>
          <StatusText
            font="footnote-bold"
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.chamber.rise.application.status')}
          </StatusText>
          <Tag
            tertiary
            success={statusObject.success}
            danger={statusObject.danger}
          >
            {statusObject.status}
          </Tag>
        </Stack>
        {isOwner && (
          <Helpertext isDesktop={isDesktop}>
            <TSpan colorToken="--text-infobox-neutral-default">
              {statusObject.helperText}
            </TSpan>
          </Helpertext>
        )}
      </RiseStepWrapperTablet>
    );
  }

  return (
    <StatusWrapper>
      <StatusBox isOwner={isOwner} isTablet={isTablet}>
        <StatusText
          font="footnote-bold"
          colorToken="--text-body-neutral-default"
        >
          {t('noumena.chamber.rise.application.status')}
        </StatusText>

        <Tag
          tertiary
          success={statusObject.success}
          danger={statusObject.danger}
        >
          {statusObject.status}
        </Tag>
      </StatusBox>

      {isOwner && (
        <Helpertext isDesktop={isDesktop}>
          <TSpan colorToken="--text-infobox-neutral-default">
            {statusObject.helperText}
          </TSpan>
        </Helpertext>
      )}
    </StatusWrapper>
  );
};

export default RiseApplicationStatus;
