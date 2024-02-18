import { type ReactElement, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { type SectionVariant } from './types';

interface SectionTitleProps {
  variant: SectionVariant;
  title: Exclude<ReactNode, ReactElement>;
  optional?: boolean;
}

export function SectionTitle({ variant, title, optional }: SectionTitleProps) {
  const { t } = useTranslation();

  const titleFont = variant === 'main' ? 'heading-xs-bold' : 'body-xl-bold';
  const titleOptionalFont = variant === 'main' ? 'heading-xs' : 'body-xl';

  return (
    <TSpan font={titleFont} colorToken="--text-body-header-neutral-default">
      {title}
      {optional && (
        <>
          {' '}
          <TSpan
            font={titleOptionalFont}
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.section.optional')}
          </TSpan>
        </>
      )}
    </TSpan>
  );
}
