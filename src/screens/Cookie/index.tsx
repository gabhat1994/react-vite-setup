import CookieLayout from '@/layout/CookieLayout';
import { TSpan } from '@/components';
import { t } from 'i18next';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { WithdrawConsentModal } from './WithdrawConsentModal';
import { ContentBox } from './styles';

const Cookie = () => (
  <CookieLayout>
    <TSpan font="heading-m-bold">
      {t('noumena.cookie-policy-page.header')}
    </TSpan>
    <CookePageContent />
  </CookieLayout>
);

export default Cookie;

type ModalType = 'withdraw-consent';
export const CookePageContent = () => {
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  return (
    <>
      <TSpan font="footnote" colorToken="--text-body-neutral-default">
        {t('noumena.cookie-policy-page.sub-header')}
      </TSpan>
      <ContentBox>
        <TSpan font="body-m">
          This policy describes how Noumena Partners, Inc. (“Noumena”) may use
          cookies and other related technologies (collectively referred to as
          “cookies”) when you interact with us on{' '}
          <TSpan
            font="link-m"
            cursor="pointer"
            onClick={() => window.open('https://www.noumena.pro', 'blank')}
          >
            www.noumena.pro
          </TSpan>
          (the “Site”) and as set forth in the Noumena{' '}
          <TSpan
            font="link-m"
            cursor="pointer"
            onClick={() =>
              window.open('https://www.noumena.pro/privacy-policy', 'blank')
            }
          >
            Privacy Policy
          </TSpan>
          .
        </TSpan>
        <TSpan font="body-m">
          By visiting or using the Site, you agree that we can use the cookies
          described in this Cookie Policy. You can stop or update your cookie
          preferences by changing the settings in your browser (more information
          on how to do this is provided below). We may modify this Agreement
          without notifying you, so please check back often for updates.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">What are Cookies?</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          Cookies are text files, containing small amounts of information, which
          are downloaded to your browsing device (such as a computer or
          smartphone) when you visit a website. Cookies can be recognized by the
          website that downloaded them, or by other websites that use the same
          cookies. First- party cookies are cookies that belong to Noumena, or
          are placed on your device by Noumena. Third-party cookies are cookies
          that another party places on your browsing device through our Site.
          Regardless if they are First- party or Third- party cookies, the
          cookie files can be both essential or non-essential to your experience
          on our website.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">What are Cookies used for?</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          Cookies do lots of different jobs, like helping us understand how the
          Site is being used, letting you navigate between pages efficiently,
          remembering your preferences, and generally improving your browsing
          experience. Some websites and third-parties use Cookies to help ensure
          marketing you see online is more relevant to you and your interests.
          You will NEVER see advertisements on the Noumena website and Noumena
          does not use cookies for marketing purposes. Noumena connects
          freelancers with capital providers. We my promote the products and
          services of capital providers with whom Noumena has a direct
          partnership with for the purpose of helping freelancers obtain the
          capital they need to grow their business. We do not use cookies for
          these promotional purposes.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">
          What types of Cookies does Noumena use?
        </TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          Noumena does not directly place cookies onto your device. To ensure
          users of our platform have the best browsing experience, Noumena may
          decide to make use of cookies in the future. If we do, then we will
          update this policy and inform you of the change. The types of cookies
          Noumena may use in the future include: Strictly Necessary,
          Performance, Functional, and Targeting Cookies. You can find out more
          about each cookie category in the sections below.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">Strictly necessary Cookies</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          These cookies are essential, as they enable you to move around the
          Site and use its features, such as accessing secure areas. Without
          these cookies, some services or functionalities of our Site may be
          impacted or can’t be provided. These cookies cannot be switched off,
          because they are necessary for Site functionality. While you can set
          your browser to block or alert you about these cookies, some or all
          parts of the Site may not function.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">Performance Cookies</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          These cookies collect information about how you use the Site, for
          example which pages you go to most often and if you get error messages
          from certain pages. These cookies gather only aggregated or anonymous
          information that does not identify you.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">Functionality Cookies</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          These cookies allow the Site to remember choices you make (such as
          your username or the geographic region you’re in). These cookies can
          also be used to remember changes you’ve made to text size, font and
          other parts of pages that you can customize. They may also be used to
          provide services you’ve asked for such as watching a video or
          commenting on a blog. They may be set by us or by third- party
          providers whose services we have added to our pages. If you do not
          allow these cookies then some or all of these services may not
          function properly.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">Targeting Cookies</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          Noumena and our third- party partners do NOT use cookies to deliver
          advertisements. Targeting cookies are used by other websites and
          third-parties to deliver advertisements that are more relevant to you
          and your interests. They are also used to limit the number of times
          you see an advertisement as well as help measure the effectiveness of
          an advertising campaign. They remember that you have visited a website
          and this information may be shared with other organizations such as
          advertisers. This means after you have been to the Site you may see
          some advertisements about our services elsewhere on the Internet.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">
          How long will Cookies stay on my browsing device?
        </TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          The length of time a cookie will stay on your browsing device depends
          on whether it is a “persistent” or “session” cookie. Session cookies
          will only stay on your device until you stop browsing. Persistent
          cookies stay on your browsing device until they expire or are deleted.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">
          How to control and delete Cookies through your browser?
        </TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          The browser you are using to view the Site can enable, disable or
          delete cookies. To do this, follow the instructions provided by your
          browser (usually located within the “Help, Tools or Edit” functions).
          Please note that if you set your browser to disable cookies, you may
          not be able to access certain parts of the Site and parts of the Site
          may not work properly. You can find out more information about how to
          change your browser cookie settings at www.allaboutcookies.org.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">
          Can I withdraw my consent to this Cookie Policy?
        </TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          Yes. If you have previously accepted our Cookie Policy, you can
          withdraw your consent by clicking{' '}
          <TSpan
            font="link-m"
            colorToken="--text-body-neutral-default"
            cursor="pointer"
            onClick={() => {
              openModal('withdraw-consent');
            }}
          >
            here
          </TSpan>
          . After withdrawing your consent, you will begin to see the cookie
          disclosure pop-up again the next time you visit our Site and all
          subsequent visits until you provide your consent again.
        </TSpan>
      </ContentBox>
      <ContentBox>
        <TSpan font="body-l-bold">Contacting Us</TSpan>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          If you have any questions about this Cookie Policy, please contact us
          at{' '}
          <TSpan
            font="link-m"
            colorToken="--text-body-neutral-default"
            cursor="pointer"
          >
            support@noumena.pro
          </TSpan>
          , or by calling 1-833-313-1199.
        </TSpan>
      </ContentBox>
      <WithdrawConsentModal
        isOpen={modalType === 'withdraw-consent'}
        handleClose={closeModal}
      />
    </>
  );
};
