import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Avatar } from '@/components/Avatar/Avatar';
import { Underline } from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/styles';
import { TSpan } from '@/components/Typography';
import {
  InvContainer,
  InvDataBody,
  InvDataHead,
  InvHead,
  InvTitle,
} from './styles';
import { type IInvitesRequest } from './types';

const InvitesRequest = ({ name, profileImage, date }: IInvitesRequest) => {
  const { t } = useTranslation();

  return (
    <>
      <InvContainer>
        <InvHead data-testid="theadSection">
          <InvDataHead>
            <Avatar url={profileImage} />
            <InvDataBody>
              <InvTitle data-testid="tMemberRequestTitle">{name}</InvTitle>
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-body-neutral-default"
              >
                {t(`noumena.myaccount.invitefriends_responded`)}{' '}
                {format(new Date(date), 'MM.dd.yyyy')}
              </TSpan>
            </InvDataBody>
          </InvDataHead>
        </InvHead>
      </InvContainer>
      <Underline />
    </>
  );
};

export default InvitesRequest;
