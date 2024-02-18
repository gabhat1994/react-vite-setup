import { useTranslation, Trans } from 'react-i18next';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { ProgressBar } from '@/components/ProgressBar';
import { TSpan } from '@/components/Typography';
import {
  StyledNoumProgressWrapper,
  StyledItem,
  ProgressBarWrapper,
  StyledFrame,
  ProgressItems,
  StyledNoum,
  StyledDiv,
  StyledButtonDiv,
} from './styles';
import { type NoumProgressProps } from './types';

export default function NoumProgressWrapper({
  profileProgressItems,
  profileProgressPercentage,
  onItemClicked,
  isTokensAlloted,
}: NoumProgressProps) {
  const { t } = useTranslation();
  const deviceType = useDeviceType();

  return (
    <StyledNoumProgressWrapper data-testid="noumprogress-testid">
      <StyledNoum>
        <StyledFrame>
          <TSpan
            font="body-l-bold"
            colorToken="--text-profile-completion-header-neutral-alt-default"
          >
            {t('noumena.noumprogress.profile_completenes', {
              completeness: profileProgressPercentage,
            })}
          </TSpan>
          {profileProgressPercentage !== 100 && !isTokensAlloted && (
            <TSpan
              font="body-m-bold"
              colorToken="--text-profile-completion-brand-secondary-default"
            >
              <Trans
                i18nKey="noumena.noumprogress.profile_complete"
                components={{
                  bold: (
                    <TSpan colorToken="--text-profile-completion-neutral-alt-default" />
                  ),
                }}
              />
            </TSpan>
          )}
        </StyledFrame>

        <ProgressBarWrapper>
          <ProgressBar
            percentage={profileProgressPercentage}
            backgroudColor="var(--bg-progressbar-brand-primary-hightlighted)"
            barSize={8}
            color="var(--bg-progressbar-neutral-alt-default)"
          />
        </ProgressBarWrapper>
        <ProgressItems>
          {profileProgressItems.map((item) => (
            <StyledItem key={item.id} onClick={() => onItemClicked(item.id)}>
              <StyledDiv>
                <TSpan
                  font={
                    deviceType === DeviceTypeEnum.MOBILE
                      ? 'body-m-bold'
                      : 'body-l-bold'
                  }
                  colorToken="--text-profile-completion-neutral-alt-default"
                >
                  {item.name}
                </TSpan>
              </StyledDiv>
              <StyledButtonDiv>
                <TSpan
                  font="button-m"
                  colorToken="--text-button-neutral-alt-default"
                >
                  {capitalizeFirstLetter(`${t('noumena.noumprogress.add')} `)}
                </TSpan>
              </StyledButtonDiv>
            </StyledItem>
          ))}
        </ProgressItems>
      </StyledNoum>
    </StyledNoumProgressWrapper>
  );
}
