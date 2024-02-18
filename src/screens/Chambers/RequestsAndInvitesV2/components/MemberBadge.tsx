import { t } from 'i18next';
import { TSpan } from '@/components';
import { Chips } from '@/components/Chips/Chips';

const MemberBadge = () => (
  <Chips primary size="medium" borderRadius="8px">
    <TSpan font="footnote-bold" colorToken="--text-badge-noums-member-highligt">
      {t('noumena.member')}
    </TSpan>
  </Chips>
);

export default MemberBadge;
