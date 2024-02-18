import React from 'react';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { type LinkNoumActionFooterProps } from './types';
import { ButtonWrapper, ButtonWrapper1, ButtonWrapper2 } from './styles';

const LinkNoumActionFooter: React.FC<LinkNoumActionFooterProps> = ({
  isDesktop,
  isConfirmScreen,
  setConfirmScreen,
  loading,
  checkedOptions,
  handleConfirmLinkNoums,
  handleGoBack,
  handleLinkNoums,
  parentNoums,
  defaultOptions,
}) => {
  const defaultLength = defaultOptions.length;
  const disableLinkNoumButton =
    (defaultLength === 0
      ? parentNoums <= 1
      : parentNoums - defaultLength < 1) || loading;

  return !isDesktop && isConfirmScreen ? (
    <ButtonWrapper>
      <ButtonWrapper1>
        <Button
          size="full"
          leftIcon={
            <Icon
              name="arrow_left_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
          onClick={() => {
            setConfirmScreen(false);
          }}
          tertiary
          disabled={loading}
        >
          {t('noumena.back.text')}
        </Button>
      </ButtonWrapper1>
      <ButtonWrapper2>
        <Button
          size="full"
          primary
          loading={loading}
          onClick={handleConfirmLinkNoums}
          disabled={loading}
        >
          {t(`noumena.link_noums.footer.button.confirm`, {
            noumsCount: checkedOptions.length,
          })}
        </Button>
      </ButtonWrapper2>
    </ButtonWrapper>
  ) : (
    <ButtonWrapper>
      <ButtonWrapper1>
        <Button size="full" tertiary onClick={handleGoBack} disabled={loading}>
          {t('noumena.cancel')}
        </Button>
      </ButtonWrapper1>
      <ButtonWrapper2>
        <Button
          size="full"
          primary
          disabled={disableLinkNoumButton}
          onClick={handleLinkNoums}
        >
          {t(`noumena.link_noums.link_noums`, {
            linkNo: checkedOptions.length,
          })}
        </Button>
      </ButtonWrapper2>
    </ButtonWrapper>
  );
};

export default LinkNoumActionFooter;
