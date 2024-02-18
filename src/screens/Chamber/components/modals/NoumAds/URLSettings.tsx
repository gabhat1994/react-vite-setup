/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { type ChangeEvent, useCallback } from 'react';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Infobox } from '@/components/Infobox';
import { Icon } from '@/components/Icon';
import { t } from 'i18next';
import { URLWrapper, Label } from './styles';
import { URLValidator } from './URLValidator';

import { type URLSettingsProps } from './types';

export function URLSettings({
  url,
  updateUrl,
  isSlugAvailable,
  isSlugChecked,
  loading,
  showInfoBox,
  showInfoState,
  updateInfoBoxState,
}: URLSettingsProps) {
  const device = useBreakpoints();

  const handleUrl = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      updateUrl(value);
    },
    [updateUrl],
  );

  const error = isSlugChecked && !isSlugAvailable;

  return (
    <>
      <Spacer height={16} />
      <TSpan font="body-m" colorToken="--text-body-neutral-default">
        {t('noumena.chamber_edit.noum_ads.url_setting.heading')}
      </TSpan>
      <Spacer height={16} />
      {showInfoBox && showInfoState && (
        <>
          <Infobox type="tertiary">
            <Stack justify="space-between" align="center">
              <div>
                {t('noumena.chamber_edit.noum_ads.url_setting.infobox_text')}
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => updateInfoBoxState(false)}
              >
                <Icon name="close_s" size={20} color="--color-base-gray-60" />
              </div>
            </Stack>
          </Infobox>
          <Spacer height={16} />
        </>
      )}
      <Stack
        fullWidth
        vertical={device.isMobile}
        justify={device.isMobile ? 'center' : 'space-between'}
        align="center"
      >
        <URLWrapper
          color={
            error
              ? '--text-input-danger-primary-default'
              : '--text-input-neutral-filled'
          }
        >
          <TSpan font="input-m" colorToken="--text-input-neutral-default">
            {`{noumena-app-domain}/`}
          </TSpan>

          <input autoFocus value={url} onChange={handleUrl} />
        </URLWrapper>

        {(!isSlugChecked || loading) && !device.isMobile && (
          <URLValidator
            intent="disabled"
            label={
              <Label colorToken="--text-tablecell-header-neutral-disabled">
                {t('noumena.chamber_edit.noum_ads.url_setting.available')}
              </Label>
            }
          />
        )}

        {isSlugChecked && !loading && !device.isMobile && (
          <URLValidator
            intent={isSlugAvailable ? 'success' : 'danger'}
            label={
              <Label
                colorToken={
                  isSlugAvailable
                    ? '--color-base-success-30'
                    : '--bg-button-danger-primary-default'
                }
              >
                {isSlugAvailable ? 'Available' : 'Taken'}
              </Label>
            }
          />
        )}
      </Stack>

      <Spacer height={4} />

      <TSpan
        font="footnote"
        colorToken={
          error
            ? '--bg-button-danger-primary-default'
            : '--text-body-neutral-default'
        }
      >
        {t('noumena.chamber_edit.noum_ads.url_setting.second_description')}
      </TSpan>

      {device.isMobile && (
        <>
          <Spacer height={16} />
          <Stack fullWidth justify="center" align="center">
            {(!isSlugChecked || loading) && (
              <URLValidator
                intent="disabled"
                label={
                  <Label colorToken="--text-tablecell-header-neutral-disabled">
                    {t('noumena.chamber_edit.noum_ads.url_setting.available')}
                  </Label>
                }
              />
            )}

            {isSlugChecked && !loading && (
              <URLValidator
                intent={isSlugAvailable ? 'success' : 'danger'}
                label={
                  <Label
                    colorToken={
                      isSlugAvailable
                        ? '--color-base-success-30'
                        : '--bg-button-danger-primary-default'
                    }
                  >
                    {isSlugAvailable ? 'Available' : 'Taken'}
                  </Label>
                }
              />
            )}
          </Stack>
        </>
      )}
    </>
  );
}
