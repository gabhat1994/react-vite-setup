import { TSpan } from '@/components/Typography';
import DefaultImage from '@/assets/images/chamber_default.png';

import { Stack } from '@/layout/Stack';
import { type CampaignOfferFragment } from '@/apollo/graphql';
import { Card } from './Card/Card';
import { Layout } from './Layout/Layout';
import S from '../CampaignOffer/styles';

type ExpertMessageProps = { campaignCreatedBy: string } & Required<
  Pick<CampaignOfferFragment, 'createdBy' | 'message'>
>;

const DefaultMessage = ({
  campaignCreatedBy,
}: {
  campaignCreatedBy: string;
}) => (
  <TSpan font="body-m">
    Dear {campaignCreatedBy},
    <br /> <br /> I am pleased to present to you our comprehensive advertising
    campaign proposal, tailored specifically to meet the unique needs and goals
    of your business.
    <br /> <br />
    Our team of experts have conducted thorough research and analysis to develop
    an effective strategy that leverages the latest industry trends and
    technologies to achieve your desired outcomes. Our proposal includes a
    detailed plan for executing targeted campaigns across multiple channels,
    including social media, search engine advertising, and display advertising.
    <br /> <br />
    We believe that this campaign will not only increase your brand visibility
    and reach, but also drive significant returns on investment. Our estimated
    budget and timeline are outlined in the attached proposal, and we would be
    happy to discuss any questions or concerns you may have.
    <br /> <br />
    Please let us know if you would like to schedule a call to discuss further.
    We look forward to the opportunity to partner with you and drive success for
    your business. <br /> <br />
  </TSpan>
);

export function ExpertMessage({
  createdBy,
  message,
  campaignCreatedBy,
}: ExpertMessageProps) {
  return (
    <Layout.Card>
      <Card.Title>Message From Our Expert</Card.Title>
      <Card.Divider />

      <S.MessageContainer>
        <div style={{ width: '548px' }}>
          <Layout.Card>
            {message ? (
              <>
                <TSpan font="body-m"> Dear {campaignCreatedBy},</TSpan>
                <br />
                <TSpan font="body-m">{message}</TSpan>
              </>
            ) : (
              <DefaultMessage campaignCreatedBy={campaignCreatedBy} />
            )}
            <br />
            <TSpan colorToken="--text-input-neutral-default">
              Best regards,
            </TSpan>
            <S.NOUMCard>
              <S.Img
                src={createdBy?.profile?.profilePicture || DefaultImage}
                alt="profile-photo"
              />
              <Stack vertical>
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-neutral-highlighted"
                >
                  {`${createdBy?.firstName} ${createdBy?.lastName}`}
                </TSpan>
                <TSpan font="footnote" colorToken="--text-card-neutral-default">
                  SEO Specialist
                </TSpan>
              </Stack>
            </S.NOUMCard>
          </Layout.Card>
        </div>
      </S.MessageContainer>
    </Layout.Card>
  );
}
