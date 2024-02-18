import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import MyAccount from '../../layout/MyAccountLayout/index';
import { TextHeaderH2, TextWrapperColor, Wrapper, TextWrapper } from './styles';

export function TermsOfUse() {
  const { t } = useTranslation();
  return (
    <MyAccount mobileHeader={t(`noumena.myaccount.terms_of_use.current_title`)}>
      <Wrapper>
        <Spacer height={40} />
        <TSpan
          font="heading-m-bold"
          colorToken="--text-card-neutral-highlighted"
        >
          {t(`noumena.myaccount.terms_of_use.current_title`)}
        </TSpan>
        <hr />
        <p>Last Modified and Effective: 29 April 2022</p>
        <TextWrapper>
          <p>
            Welcome to Noumena located at Noumena.pro (our “Site”). Our Site is
            maintained and operated by Noumena Partners, Inc. (“Company”“we”,
            “our” or
            <br /> “us”). Sections 1 and 3 of the following terms and
            conditions, as may be amended from time to time (these “Terms and
            Conditions”) apply to all
            <br /> persons accessing or using our Site. Additionally, Section 2
            of these Terms and Conditions applies to those persons who are
            approved by us, <br />
            and continue in active status, as members (“Members” or a “Member”)
            of our network community (our “Community”).
          </p>
          <h2>Accessing and Using our Site</h2>
          <p>
            Your access and use of our Site is subject to these Terms and
            Conditions and all applicable laws. By accessing or using any part
            of our Site, you
            <br />
            accept, without limitation or qualification, these terms and
            conditions. If you do not agree with all of the terms and conditions
            set forth below,
            <br /> you may not use any portion of our Site.
          </p>
        </TextWrapper>
        <TextWrapperColor>
          <TextHeaderH2>Accessibility</TextHeaderH2>
          <p>
            If you are having any trouble accessing these Terms and Conditions
            or the Website, please contact us at
            <a href="www.noumena.com">support@noumena.pro</a>
          </p>
          <TextHeaderH2>Availability and Authorized Use of Site</TextHeaderH2>
          <p>
            Our Site is provided for your personal and non-commercial use, for
            informational purposes only, and made available from servers
            resident in the United <br />
            States of America (U.S.A.). Except as provided hereafter, Our Site
            is intended only for users in the U.S.A. and we do not otherwise
            offer our Site, or any <br />
            other product or service, outside the U.S.A. Non-U.S.A. pilot
            testing: A limited group of participants in Thailand and in the Bali
            province of Indonesia <br />
            may be permitted to join Noumena and use our Site as part of our
            evaluation of potential expansion of participation in Noumena.
          </p>
          <TextHeaderH2>Unauthorized Use of Site</TextHeaderH2>
          <p>
            You may not use spiders, robots, data mining techniques or other
            automated devices or programs to catalog, download or otherwise
            reproduce, store or distribute content available on our Site.
            Further, you may not use any such automated means to manipulate our
            Site, such as automating what are otherwise manual or one-off
            procedures. You may not take any action to i nterfere with, or
            disrupt, our Site or any other users use of our Site, including,
            without limitation, via means of overloading, “flooding”,
            “mailbombing” or “crashing” our Site, circumventing security or user
            authentication measures or attempting to exceed the limited
            authorization and access granted to you under these Terms and
            Conditions. You may not frame portions of our Site within another
            website or application. You may not resell use of, or access to, our
            Site to any third party without our prior written consent.
          </p>
          <TextHeaderH2>Comments or Materials Posted by You</TextHeaderH2>
          <p>
            Certain pages on our Site may allow you to post text comments,
            photos, videos or other user content (“Content”). You may only post
            Content to our Site if you are a resident of the United States and
            are eighteen (18) years of age or older. You may only post Content
            that you created or which the owner of the Content has given you
            permission to post. If Content depicts any person other than
            yourself, you must have permission from that person or, if that
            person is a minor, permission from that person’s parent or legal
            guardian, before you post the Content. You may be required to
            provide proof of such permission to Company. You may not post or
            distribute Content that is illegal or that violates these Terms and
            Conditions. By posting or distributing Content to our Site, you
            represent and warrant that (a) you own all the rights to the Content
            or are authorized to use and distribute the Content to our Site and
            (b) the Content does not and will not infringe any copyright, right
            of publicity, or any other third-party right nor violate any law or
            regulation.
          </p>
          <p>
            By submitting or posting Content to our Site, you grant Company the
            irrevocable, perpetual, worldwide right to reproduce, display,
            perform, distribute, adapt, and promote this Content in any medium.
            Once you submit or post Content to our Site, Company does not need
            to give you any further right to inspect or approve uses of such
            Content or to compensate you for any such uses. Company owns all
            right, title, and interest in any compilation, collective work, or
            other derivative work created by Company using or incorporating
            Content posted to our Site. You are solely responsible for anything
            you may post on our Site and the consequences of posting anything on
            our Site.{' '}
          </p>
          <p>
            Company is under no obligation to screen or monitor Content, but may
            review Content from time to time at its sole discretion. Company may
            edit or remove any Content at any time without notice and in its
            sole discretion.
          </p>
          <TextHeaderH2>No Ideas Solicited</TextHeaderH2>
          <p>
            Company is not soliciting ideas from you, including without
            limitation suggestions about advertising, promotion, merchandising,
            or design of our products, additions to our product lines, services,
            or changes in methods of doing business. We may already be working
            on or may in the future work on a similar idea. This policy
            eliminates concerns about ownership of such ideas. If,
            notwithstanding this policy, you submit an unsolicited idea to our
            Site, you understand and acknowledge that such idea is not submitted
            in confidence and Company assumes no obligation, expressed or
            implied, by considering it. You further understand that Company
            shall exclusively own all known or hereafter existing rights to the
            idea everywhere in the world, and that such idea is hereby
            irrevocably assigned to Company. Without limiting the foregoing, to
            the extent any such assignment is deemed unenforceable, you hereby
            grant Company an irrevocable, perpetual, world-wide license to use
            the idea in any manner, in any medium now known or hereafter
            developed, without compensation to you.
          </p>
          <TextHeaderH2>Prohibited Activities</TextHeaderH2>
          <p>
            Company expects all of its users to be respectful of other people.
            The following is a partial list of the types of conduct that are
            illegal or prohibited on our Site or while using our Site. Company
            reserves the right to investigate and take appropriate legal action
            against anyone who, in Company’s sole discretion, engages in any of
            the prohibited activities. Without limitation, you agree that you
            will not post or transmit to other users anything that contains
            Content that:
          </p>
          <ul>
            <li>
              nfringes or violates another partys intellectual property rights
              (such as music, videos, photos or other materials for which you do
              not have written authority from the owner of such materials to
              post on our Site);
            </li>
            <li>violates any partys right of publicity or right of privacy;</li>
            <li>
              is threatening, abusive, harassing or that promotes or encourages
              racism, bigotry, hatred, physical harm, or violence of any kind
              against any group or individual;{' '}
            </li>
            <li>
              is defamatory, libelous, deceptive, fraudulent, tortious, obscene,
              vulgar, pornographic, profane (including masked profanity),
              contains or depicts nudity, contains or depicts sexual activity,
              or is otherwise inappropriate as determined by us in our sole
              discretion;
            </li>
            <li>
              is inaccurate, false or misleading in any way, or constitutes
              impersonation of another person;
            </li>
            <li>is illegal or promotes any illegal activities;</li>
            <li>
              promotes unauthorized copying of another persons copyrighted work
              or links to them or providing information to circumvent security
              measures;
            </li>
            <li>
              contains software viruses or any other computer code, files or
              programs designed to interrupt, destroy or limit the functionality
              of any computer software or hardware or telecommunications
              equipment;
            </li>
            <li>
              contains any advertising, promotional materials, junk mail, spam
              chain, letters pyramid schemes or any other form of solicitation
            </li>
            <li>
              nvolves third-party commercial activities (whether or not for
              profit) and/or sales, such as contests, sweepstakes, barter,
              advertising, or pyramid schemes; orotherwise violates these Terms
              and Conditions.
            </li>
          </ul>
        </TextWrapperColor>
      </Wrapper>
    </MyAccount>
  );
}
