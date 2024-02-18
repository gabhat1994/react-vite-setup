import { t } from 'i18next';
import { TSpan } from '@/components';
import { Spacer, Stack } from '@/layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import {
  PasswordHelperWrapper,
  PasswordCheck,
  CheckIconStyled,
  Label,
} from './styles';
import { type PasswordStrength as PasswordCheckType } from '../types';

type PasswordHelperProps = {
  passwordStates: PasswordCheckType;
  hideUndeerline?: boolean;
};

type PasswordTextVariantProps = {
  isPasswordWeak: boolean;
};

const CheckIcon = () => (
  <>
    <CheckIconStyled
      name="check_xs"
      size={16}
      color="--icon-button-success-secondary-default"
    />
  </>
);

const PasswordTextVariant = ({ isPasswordWeak }: PasswordTextVariantProps) => (
  <TSpan
    font="footnote"
    colorToken={
      isPasswordWeak
        ? '--bg-button-danger-primary-default'
        : '--text-button-success-secondary-default'
    }
  >
    {isPasswordWeak ? t('noumena.password.weak') : t('noumena.password.strong')}
  </TSpan>
);

export const PasswordHelper = ({
  passwordStates,
  hideUndeerline,
}: PasswordHelperProps) => {
  const isPasswordWeak = Object.values(passwordStates).some((state) => !state);

  const devices = useBreakpoints();

  const {
    hasLowerCaseCharacter,
    hasNumber,
    hasSixCharacters,
    hasSpecialCharacter,
    hasUpperCaseCharacter,
  } = passwordStates;
  return (
    <>
      {!devices.isSmallerThanLaptop && (
        <Stack vertical borderBottom={!hideUndeerline} gap={8}>
          <Label>
            {t('noumena.password.passwordStrength')}
            <PasswordTextVariant isPasswordWeak={isPasswordWeak} />
          </Label>
        </Stack>
      )}
      {!devices.isSmallerThanLaptop && <Spacer height={16} />}
      <PasswordHelperWrapper>
        {devices.isSmallerThanLaptop && (
          <TSpan font="footnote" colorToken="--text-body-neutral-default">
            {t('noumena.password.passwordStrength')}
            <PasswordTextVariant isPasswordWeak={isPasswordWeak} />
          </TSpan>
        )}
        <PasswordCheck successful={hasSixCharacters}>
          {hasSixCharacters && <CheckIcon />}
          {t('noumena.password.hint.six.characters')}
        </PasswordCheck>
        <PasswordCheck successful={hasLowerCaseCharacter}>
          {hasLowerCaseCharacter && <CheckIcon />}
          {t('noumena.password.hint.lowercase.character')}
        </PasswordCheck>
        <PasswordCheck successful={hasUpperCaseCharacter}>
          {hasUpperCaseCharacter && <CheckIcon />}
          {t('noumena.password.hint.uppercase.character')}
        </PasswordCheck>
        <PasswordCheck successful={hasSpecialCharacter}>
          {hasSpecialCharacter && <CheckIcon />}
          {t('noumena.password.hint.special.character')}
        </PasswordCheck>
        <PasswordCheck successful={hasNumber}>
          {hasNumber && <CheckIcon />}
          {t('noumena.password.hint.one.number')}
        </PasswordCheck>
      </PasswordHelperWrapper>
    </>
  );
};
