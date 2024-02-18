import { Avatar } from '@/components/Avatar/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar/types';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

import { type NoumContactFragment } from '@/apollo/graphql';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { getCountryByCode } from '@/utils/country';
import { UserUtil } from '@/utils/user';
import S from './styles';

type AccountDetailsProps = {
  contact: NoumContactFragment;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({ contact }) => (
  <>
    <Stack align="center" gap={8} padding="8px 0">
      <Avatar
        url={UserUtil.getProfilePicture(contact?.userId)}
        size={AvatarSize.M}
      />
      <TSpan
        font="body-m-bold"
        colorToken="--text-tablecell-header-neutral-highlighted"
      >
        {contact.displayName}
      </TSpan>
    </Stack>

    <S.AccountDetailsColumn padding="8px 0">
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        Account Information
      </TSpan>

      <Stack vertical>
        <S.AccountDetailsValueText>
          {contact.displayName}
        </S.AccountDetailsValueText>
        <S.AccountDetailsValueText>
          {ContactDetailsUtils.formatCompanyAndTitle(contact)}
        </S.AccountDetailsValueText>
        <S.AccountDetailsValueText>
          {contact.userId.email}
        </S.AccountDetailsValueText>
      </Stack>
    </S.AccountDetailsColumn>

    <S.AccountDetailsColumn padding="8px 0">
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        Billing Details
      </TSpan>

      <Stack vertical>
        <S.AccountDetailsValueText>
          {contact.apartmentNo} {contact.street}
        </S.AccountDetailsValueText>
        <S.AccountDetailsValueText>{contact.city}</S.AccountDetailsValueText>
        <S.AccountDetailsValueText>
          {contact.state}, {contact.zipCode}
        </S.AccountDetailsValueText>
        <S.AccountDetailsValueText>
          {getCountryByCode(contact.country)?.name ?? contact.country ?? '--'}
        </S.AccountDetailsValueText>
      </Stack>
    </S.AccountDetailsColumn>
  </>
);

export default AccountDetails;
