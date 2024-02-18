import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { useTranslation } from 'react-i18next';
import S from './styles';

interface ManagerTermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManagerTermsAndConditionsModal({
  isOpen,
  onClose,
}: ManagerTermsAndConditionsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size={ModalSize.L}
      enableCloseButton
      spacingMode="gap-content"
    >
      <ModalHeader>{t('noumena.accept_manager_modal.title')}</ModalHeader>
      <ModalBody noFooter>
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          Your access and use of our Site is subject to these Terms and
          Conditions and all applicable laws. By accessing or using any part of
          our Site, you accept, without limitation or qualification, these terms
          and conditions. If you do not agree with all of the terms and
          conditions set forth below, you may not use any portion of our Site.
          Accessibility: If you are having any trouble accessing these Terms and
          Conditions or the Website, please contact us at{' '}
          <S.StyledButtonLink
            onClick={() => {
              window.open('mailto:support@noumena.pro', '_blank');
            }}
          >
            <TSpan
              colorToken="--text-modal-neutral-default"
              font="body-l"
              cursor="pointer"
            >
              support@noumena.pro
            </TSpan>
          </S.StyledButtonLink>
          . Availability and Authorized Use of Site: Our Site is provided for
          your personal and authorized commercial use. You may view and print
          pages and information available from this Site only for such purposes.
          Certain pages, systems, software, data, features, applications, and/or
          services may be available through this Site that require membership in
          our Community and/or that are otherwise subject to terms, conditions,
          disclosures, and/or disclaimers in addition to these Terms and
          Conditions, which will govern in the event of any conflict with these
          Terms and Conditions. Unauthorized Use of Site: You may not use
          spiders, robots, data mining techniques or other automated devices or
          programs to catalog, download or otherwise reproduce, store or
          distribute content available on our Site. Further, you may not use any
          such automated means to manipulate our Site, such as automating what
          are otherwise manual or one-off procedures. You may not take any
          action to interfere with, or disrupt, our Site or any other
          user&apos;s use of our Site, including, without limitation, via means
          of overloading, “flooding”, “mailbombing” or “crashing” our Site,
          circumventing security or user authentication measures or attempting
          to exceed the limited authorization and access granted to you under
          these Terms and Conditions. You may not frame portions of our Site
          within another website or application. You may not resell use of, or
          access to, our Site to any third party without our prior written
          consent.
        </TSpan>
      </ModalBody>
    </Modal>
  );
}
