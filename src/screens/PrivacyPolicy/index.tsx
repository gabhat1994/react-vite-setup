import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/Separator/Separator';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import MyAccount from '../../layout/MyAccountLayout/index';
import { TextSubHeader, TextHeaderH2, Wrapper, TextWrapper } from './styles';

export function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <MyAccount mobileHeader={t(`noumena.myaccount.privacy_policy`)}>
      <Wrapper>
        <Spacer height={40} />
        <TSpan
          font="heading-m-bold"
          colorToken="--text-card-neutral-highlighted"
        >
          {t(`noumena.myaccount.privacy_policy`)}
        </TSpan>
        <Separator />
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-neutral-highlighted"
        >
          Facts
        </TSpan>
        <p>
          What does Noumena Partners, Inc. (“Noumena”) do with your personal
          information?
        </p>
        <TextWrapper>
          <TextHeaderH2>Why?</TextHeaderH2>
          <p>
            Financial companies choose how they share your personal information.
            Federal law gives consumers the right to limit some but not all
            sharing. Federal law also requires us to tell you how we collect,
            share, and protect your personal information. Please read this
            notice carefully to understand what we do.{' '}
          </p>
          <TextHeaderH2>What?</TextHeaderH2>
          <p>
            The types of personal information we collect and share depend on the
            product or service you have with us. This information comes
            primarily from the account applications and other information you
            submit to us and from third-party service providers, and can
            include:{' '}
          </p>
          <ul>
            <li>Identity related information and credit history</li>
            <li>Income and employment related information</li>
            <li>Financial account information</li>
            <li>
              Technology and user information from accessing our services
              electronically
            </li>
          </ul>
          <TextHeaderH2>How?</TextHeaderH2>
          <p>
            All financial companies need to share customers’ personal
            information to run their everyday business. In the section below, we
            list the reasons financial companies can share their customers’
            personal information; the reasons Noumena chooses to share; and
            whether you can limit this sharing.
          </p>
          <table className="tableBorder">
            <thead>
              <tr>
                <th>
                  <TextSubHeader>
                    Reasons we can share your personal information
                  </TextSubHeader>
                </th>
                <th>
                  <TextSubHeader>Does Noumena share? </TextSubHeader>
                </th>
                <th>
                  <TextSubHeader>Can you limit this sharing?</TextSubHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  All financial companies need to share customers’ personal
                  information to run their everyday business. In the section
                  below, we list the reasons financial companies can share their
                  customers’ personal information; the reasons Noumena chooses
                  to share; and whether you can limit this sharing.
                </td>
                <td> Yes </td>
                <td> No</td>
              </tr>
              <tr>
                <td>
                  For our marketing purposes – to offer our products and
                  services to you
                </td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>For joint marketing with other financial companies </td>
                <td>No</td>
                <td>We don’t share</td>
              </tr>
              <tr>
                <td>
                  For our affiliates everyday business purposes – information
                  about your transactions and experiences
                </td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>
                  For our affiliates everyday business purposes – information
                  about your creditworthiness{' '}
                </td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>For our affiliates to market to you </td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>For our nonaffiliates to market to you </td>
                <td>No</td>
                <td>We don’t share</td>
              </tr>
            </tbody>
          </table>
          <TextSubHeader>Questions</TextSubHeader>
          <p>Email us at support@noumena.pro or call us at 1-833-313-1199</p>

          <TextHeaderH2>What we do?</TextHeaderH2>
          <TextSubHeader>
            How does Noumenati protect my personal information?
          </TextSubHeader>
          <p>
            We take reasonable measures designed to protect your personal
            information from unauthorized access and use by maintaining
            physical, electronic and procedural safeguards as required by
            applicable law. These measures include computer safeguards,
            electronic security measures, and physical security. You are
            responsible for the secrecy of your password and account information
            and controlling access to your email. If any information under our
            control is compromised, we will take reasonable steps to investigate
            the situation and, where appropriate, notify those individuals whose
            information may have been compromised, and take other steps in
            accordance with any applicable laws.
          </p>
          <TextSubHeader>
            How does Noumenati collect my personal information?
          </TextSubHeader>
          <p>We collect your personal information, for example, when you</p>
          <ul>
            <li>Give us your contact information</li>
            <li>Apply for our products</li>
            <li>Open an account or provide account information</li>
            <li>
              Provide us with your historical, current and projected income
            </li>
            <li>Instruct us on deposits of money and payments</li>
          </ul>
          <p>
            We also collect your personal information from others, such as
            credit bureaus or other companies.
          </p>
          <TextSubHeader>Why can’t I limit all sharing?</TextSubHeader>
          <p>Federal law gives you the right to limit only</p>
          <ul>
            <li>
              Sharing for affiliates’ everyday business purposes – information
              about your creditworthiness
            </li>
            <li>Affiliates from using your information to market to you</li>
            <li>Sharing for nonaffiliates to market to you</li>
          </ul>
          <p>
            State laws and individual companies may give you additional rights
            to limit sharing.
          </p>
          <TextHeaderH2>Definitions</TextHeaderH2>
          <TextSubHeader>Affiliates</TextSubHeader>
          <p>
            Companies related by common ownership or control. They can be
            financial and nonfinancial companies.
          </p>
          <ul>
            <li>
              Our affiliates include Chameleon 1, LLC; Noumenati, LLC; and
              Connect 150, LLC.
            </li>
          </ul>

          <TextSubHeader>Non Affiliates</TextSubHeader>
          <p>
            Companies related by common ownership or control. They can be
            financial and nonfinancial companies.
          </p>
          <ul>
            <li>
              Noumena does not share with nonaffiliates so they can market to
              you..
            </li>
          </ul>
          <TextSubHeader>Join Marketing</TextSubHeader>
          <p>
            Companies not related by common ownership or control. They can be
            financial and nonfinancial companies. A formal agreement between
            nonaffiliated financial companies that together market financial
            products or services to you.
          </p>
          <ul>
            <li>Noumena does not jointly market.</li>
          </ul>
          <TextHeaderH2>Other Important Information</TextHeaderH2>
          <p>
            This Privacy Notice applies only to Noumena and does not apply to
            any product or service that you may obtain from an affiliate of
            Noumena. This Privacy Notice may be amended upon notice to you,
            which includes posting the updated version to our website/mobile
            application.
          </p>
          <TextSubHeader>Children’s privacy</TextSubHeader>
          <p>
            We do not knowingly collect or solicit any information from anyone
            under the age of 18 or knowingly allow such persons to apply for our
            products. Our website/mobile application and their content are not
            directed at children under the age of 13. If we learn that we have
            collected personal information from a child under age 13, we will
            delete that information promptly. If you believe that we might have
            any information from a child under 13, please contact us by email at{' '}
            <a href="mailto:support@noumena.pro">support@noumena.pro</a> by
            telephone at 1-833-313-1199.
          </p>
        </TextWrapper>
      </Wrapper>
    </MyAccount>
  );
}
