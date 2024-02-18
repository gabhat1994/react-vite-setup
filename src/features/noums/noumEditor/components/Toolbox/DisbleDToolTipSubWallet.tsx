import { type FC } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { SubWalletDisabledToolTip } from './styles';

const DisbledToolTipSubWallet: FC = () => (
  <SubWalletDisabledToolTip>
    <TSpan font="footnote" colorToken="--text-tooltip-neutral-alt-default">
      {t('noumena.noumEditorv2.subwallet.cannot_be_created_text1')}{' '}
    </TSpan>
    <TSpan font="footnote-bold" colorToken="--text-tooltip-neutral-alt-default">
      {t('noumena.noumEditorv2.subwallet.cannot_be_created_text2')}{' '}
    </TSpan>
    <TSpan font="footnote" colorToken="--text-tooltip-neutral-alt-default">
      {t('noumena.noumEditorv2.subwallet.cannot_be_created_text3')}{' '}
    </TSpan>
    <TSpan font="footnote-bold" colorToken="--text-tooltip-neutral-alt-default">
      {t('noumena.noumEditorv2.subwallet.cannot_be_created_text4')}{' '}
    </TSpan>
    <TSpan font="footnote" colorToken="--text-tooltip-neutral-alt-default">
      {t('noumena.noumEditorv2.subwallet.cannot_be_created_text5')}
    </TSpan>
  </SubWalletDisabledToolTip>
);

export default DisbledToolTipSubWallet;
