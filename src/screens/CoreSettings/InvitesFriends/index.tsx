import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Spacer } from '@/layout';
import { useToast } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { useUserReferralEntryQuery } from '@/apollo/graphql';
import { Spinner } from '@/components/Spinner';
import { UserUtil } from '@/utils/user';
import { getFullName } from '@/utils/fullName';
import * as Storyblok from '@/services/rest/storyblok';
import InvitesRequest from './InvitesRequest';
import {
  InvitesWrapper,
  TextWrapper,
  HeaderWrapper,
  InviteFriendsWrapper,
  LeftContent,
  ReferralCodeHead,
} from './styles';
import { type Content, type RootObject } from './types';

const InvitesFriends = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [content, setContent] = useState<Content>();
  const componentMounted = useRef(true);

  useEffect(() => {
    async function getReferralPageContent() {
      const { data }: { data: RootObject } =
        await Storyblok.getReferralPageContent();
      if (componentMounted.current) {
        setContent(data?.story?.content);
      }
    }

    getReferralPageContent();
  }, []);

  const { data, loading } = useUserReferralEntryQuery({
    variables: {
      productKey: 'NOUMENATI',
    },
  });

  const referralData = useMemo(
    () => data?.userReferralEntry,
    [data?.userReferralEntry],
  );

  const [isReferralUsed, referralUsedBy] = useMemo(() => {
    const usedBy =
      data?.userReferralEntry?.usedBy?.filter((u) => UserUtil.isActive(u)) ||
      [];

    return [usedBy.length > 0, usedBy];
  }, [data?.userReferralEntry?.usedBy]);

  const remainingInvites = useMemo(() => {
    const maxCount = referralData?.maxAllowedCount ?? 0;
    const usedCount = referralData?.usedCount ?? 0;

    if (maxCount > 0 && maxCount === usedCount) {
      return 'no';
    }
    return maxCount - usedCount;
  }, [referralData?.maxAllowedCount, referralData?.usedCount]);

  const referralLink = `${window?.location?.origin}/sign-up?referral-code=${referralData?.referralCode}`;

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(referralLink ?? '');
    addToast(
      'success',
      'icon',
      t('noumena.myaccount.invitefriends_toast_referral_code_copied'),
    );
  }, [addToast, referralLink, t]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <InviteFriendsWrapper>
          <LeftContent>
            <HeaderWrapper>
              <TSpan
                font="heading-m-bold"
                colorToken="--text-card-header-neutral-highlighted"
              >
                {t(`noumena.side_menu.invite_a-friend`)}
              </TSpan>
            </HeaderWrapper>
            <Spacer height={30} />
            <TextWrapper>
              <TSpan
                font="body-l-bold"
                colorToken="--text-body-header-neutral-default"
              >
                {isReferralUsed &&
                referralUsedBy.length === referralData?.maxAllowedCount
                  ? t(
                      `noumena.myaccount.invitefriends_freelancer_noumena_limited`,
                    )
                  : t(`noumena.myaccount.invitefriends_freelancer_noumena`)}
              </TSpan>
              {isReferralUsed &&
              referralUsedBy.length === referralData?.maxAllowedCount ? (
                <TSpan font="body-l" colorToken="--text-body-neutral-default">
                  <Trans
                    i18nKey={t(
                      `noumena.myaccount.invitefriends_copy_referral_code_limited`,
                    )}
                    components={{
                      br: <br />,
                    }}
                  />
                </TSpan>
              ) : (
                <TSpan font="body-l" colorToken="--text-body-neutral-default">
                  {t(`noumena.myaccount.invitefriends_copy_referral_code`)}
                </TSpan>
              )}
              <Spacer height={32} />
              {typeof remainingInvites === 'number' && (
                <>
                  {' '}
                  <TSpan
                    font="body-l-bold"
                    colorToken="--text-body-header-neutral-default"
                  >
                    {t(`noumena.myaccount.invitefriends_referral_code`)}
                  </TSpan>
                  <ReferralCodeHead>
                    <TSpan
                      font="body-l"
                      colorToken="--text-code-form-neutral-default"
                    >
                      {referralLink}
                    </TSpan>
                    <Button size="small" onClick={copyText}>
                      {t(`noumena.myaccount.invitefriends_copy_link`)}
                    </Button>
                  </ReferralCodeHead>
                </>
              )}
            </TextWrapper>
            <Spacer height={40} />
            {(!isReferralUsed ||
              referralUsedBy.length !== referralData?.maxAllowedCount) && (
              <TextWrapper>
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-body-header-neutral-default"
                >
                  {content?.Header}
                </TSpan>
                <TSpan colorToken="--text-body-neutral-default" font="body-l">
                  {content?.Subtitle}
                </TSpan>
              </TextWrapper>
            )}
          </LeftContent>
          <InvitesWrapper>
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-body-header-neutral-default"
            >
              {t(`noumena.myaccount.invitefriends_approved_users`)}
            </TSpan>
            <Spacer height={24} />
            {isReferralUsed ? (
              referralUsedBy.map((item) => (
                <InvitesRequest
                  key={item?._id}
                  name={getFullName(
                    item?.firstName,
                    item?.middleName,
                    item?.lastName,
                  )}
                  profileImage={UserUtil.getProfilePicture(item) ?? ''}
                  date={item?.createdAt}
                />
              ))
            ) : (
              <TSpan font="body-l" colorToken="--text-body-neutral-default">
                {t(`noumena.myaccount.invitefriends_invitation_yet`)}
              </TSpan>
            )}
          </InvitesWrapper>
        </InviteFriendsWrapper>
      )}
    </>
  );
};

export default InvitesFriends;
