import { useCallback, useMemo, useState } from 'react';

import { Spacer, Stack } from '@/layout';
import { Separator } from '@/components/Separator/Separator';
import { TSpan } from '@/components/Typography';
import { Infobox } from '@/components/Infobox';
import { TextField } from '@/components/TextField';
import CountryPicker from '@/components/CounteryPicker/CountryPicker';
import { LanguagePicker } from '@/components/LanguagePicker/LanguagePicker';

import { type Language } from '@/components/LanguagePicker/type';
import S from '../styles';
import { useCampaignContext } from '../../hooks/useCampaignForm';
import { constants } from '../../constants';

export function CampaignAudience({ isMobile }: { isMobile?: boolean }) {
  const {
    updateCampaign,
    campaign,
    error: { isAudienceRangeExceeded },
  } = useCampaignContext();

  const [audience, setAudience] = useState('');

  const audienceValue = useMemo(
    () => audience || campaign?.audience?.category?.join(','),
    [campaign?.audience?.category, audience],
  );

  const handleAudience = ($audience: string) => {
    setAudience($audience);
    updateCampaign(($campaign) => ({
      ...$campaign,
      audience: {
        ...$campaign.audience,
        category: $audience.length ? $audience.split(',') : [''],
      },
    }));
  };

  const handleCountry = useCallback(
    (country: string | undefined, code?: string) => {
      if (!country || !code) return;
      updateCampaign(($campaign) => ({
        ...$campaign,
        audience: {
          ...$campaign.audience,
          targetLocation: [`${code}-${country.split('(')[0]?.trim()}`], // prepend country code for mapping for flag icon
        },
      }));
    },
    [updateCampaign],
  );

  const handleLanguage = useCallback(
    (language: Language) => {
      updateCampaign(($campaign) => ({
        ...$campaign,
        audience: {
          ...$campaign.audience,
          targetLanguage: [language.name],
        },
      }));
    },
    [updateCampaign],
  );

  return (
    <S.Container>
      <S.FormTitle>Audience</S.FormTitle>
      <Spacer height={14} />
      <Separator fullWidth size="thin" />
      <Spacer height={14} />
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        The target audience of an advertisement refers to the specific group of
        people that the ad is designed to reach and appeal to. Please describe
        the certain characteristics, interests, or behaviors in common that make
        them likely to respond positively to the ad.
      </TSpan>
      <Spacer height={16} />
      <Infobox type="tertiary">
        <TSpan font="body-m" colorToken="--text-card-neutral-default">
          e.g. male, a 27-year-old tech enthusiasts, graphic designer,
          self-employed.
        </TSpan>
      </Infobox>
      <Spacer height={24} />
      <TextField
        label="Tell us more about your audience"
        value={audienceValue}
        onChange={(e) => handleAudience(e.target.value)}
        error={isAudienceRangeExceeded}
        maxLength={
          !isAudienceRangeExceeded
            ? constants.MAX_AUDIENCE_CHARACTERS
            : undefined
        }
        helperText={
          isAudienceRangeExceeded
            ? `Audience should not exceed ${constants.MAX_AUDIENCE_CHARACTERS} characters`
            : ''
        }
      />
      <Spacer height={24} />
      <Stack gap={24} fullWidth vertical={isMobile}>
        {/* Country Picker */}
        <S.FullWidthDiv>
          <S.InputLabel>Target Audience Location</S.InputLabel>
          <Spacer height={10} />
          <CountryPicker
            placement="top"
            containerHeight={isMobile ? undefined : '300px'}
            onCountryCodeChange={handleCountry}
            value={
              campaign?.audience?.targetLocation?.[0]?.split('-')?.[0] ?? ''
            }
          />
        </S.FullWidthDiv>

        {/* Language Picker */}
        <S.FullWidthDiv>
          <S.InputLabel>Languages</S.InputLabel>
          <Spacer height={10} />
          <LanguagePicker
            placement="top"
            containerHeight={isMobile ? undefined : '300px'}
            onOptionSelect={handleLanguage}
            value={campaign?.audience?.targetLanguage?.[0] ?? 'English (US)'}
          />
        </S.FullWidthDiv>
      </Stack>
    </S.Container>
  );
}
