import { memo, useState } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { useBreakpoints } from '@/hooks';
import { DescriptionText, FooterRow, ReadMeRow, WhiteCard } from './styles';

export const StatementFooter = memo(() => {
  const [showReadMe, setShowReadMe] = useState<boolean>(false);
  const { isTablet, isMobile } = useBreakpoints();

  return (
    <WhiteCard
      isMobile={isMobile}
      isTablet={isTablet}
      style={{
        alignItems: 'center',
        padding: isMobile ? '8px' : isTablet ? '16px' : '24px',
      }}
    >
      <div
        style={{
          width: isMobile ? '95%' : '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FooterRow>
          {showReadMe
            ? t('noumena.money.view-statements.footer-heading1')
            : t('noumena.money.view-statements.footer-heading')}
        </FooterRow>
        <Button
          textOnly
          rightIcon={
            showReadMe ? (
              <Icon
                name="chevron_up_m"
                size={12}
                color="--icon-tablecell-neutral-highlighted"
              />
            ) : (
              <Icon
                name="chevron_down_m"
                size={12}
                color="--icon-tablecell-neutral-highlighted"
              />
            )
          }
          style={{ minHeight: '24px', height: '24px' }}
          size="small"
          onClick={() => {
            setShowReadMe(!showReadMe);
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3px',
            }}
          >
            {showReadMe ? '' : t('noumena.money.view-statements.readmore')}
          </div>
        </Button>
      </div>
      {showReadMe && (
        <ReadMeRow>
          <ul>
            <li>
              <TSpan
                font="footnote"
                colorToken="--text-card-neutral-highlighted"
              >
                {t('noumena.money.view-statements.subhelpertext2')}
              </TSpan>
            </li>
          </ul>
          <DescriptionText
            font="footnote"
            colorToken="--text-card-neutral-highlighted"
          >
            {t('noumena.money.view-statements.footer-helpertext')}
          </DescriptionText>
          <ol style={{ padding: '6px 31px 10px' }}>
            {t('noumena.money.view-statements.subhelpertext')
              .split(';')
              .map((line) => (
                <li key={line}>
                  <TSpan
                    font="footnote"
                    colorToken="--text-card-neutral-highlighted"
                  >
                    {line}
                  </TSpan>
                </li>
              ))}
          </ol>
          <TSpan font="footnote" colorToken="--text-card-neutral-highlighted">
            {t('noumena.money.view-statements.noreInfotest')}{' '}
            <TSpan
              font="link-s"
              colorToken="--link-card-brand-primary-default"
              cursor="pointer"
              onClick={() =>
                window.open('https://www.noumena.pro/terms-conditions', 'blank')
              }
            >
              {t('noumena.view-statement.terms_service')}
            </TSpan>
            .
          </TSpan>
        </ReadMeRow>
      )}
    </WhiteCard>
  );
});
