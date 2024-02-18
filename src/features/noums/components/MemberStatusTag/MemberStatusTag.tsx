import { type NoumMemberBasicFragment } from '@/apollo/graphql/fragments';
import { useTranslation } from 'react-i18next';
import { StyledTag } from './styles';

interface MemberStatusTagProps {
  member: NoumMemberBasicFragment;
}

export function MemberStatusTag({ member }: MemberStatusTagProps) {
  const { t } = useTranslation();

  switch (member.status) {
    case 'CONNECTED':
      return (
        <StyledTag success>
          {t('noumena.chamber.members.status.connected')}
        </StyledTag>
      );
    case 'INVITED':
      return (
        <StyledTag tertiary>
          {t('noumena.chamber.members.status.invited')}
        </StyledTag>
      );
    case 'REQUESTED':
      return (
        <StyledTag secondary>
          {t('noumena.chamber.members.status.requested')}
        </StyledTag>
      );
    default:
      return <StyledTag>{member.status}</StyledTag>;
  }
}
