import { type FC, memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { Container } from '@/screens/Chamber/components/modals/RequestsAndInvites/styles';
import { type NoumLink, ProjectChamberType } from '@/apollo/generated/types';
import { Infinite } from '@/components/Infinite';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import MemberDefaultImage from '@/assets/images/profile_default.png';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { UserUtil } from '@/utils/user';
import { LinkedNoumEnum } from '../types';
import { useLinkDetailsHelper } from './useLinkDetailsHelper';
import LinkDetailsContent from './LinkDetailsContent';
import { LinkUnderline, TextOnlySpan } from '../styles';
import { type ILinkDetails } from './types';

const LinkDetailsModal: FC<ILinkDetails> = memo(
  ({
    isOpen,
    handleClose,
    connectionsCount,
    noumsCount,
    followersCount,
    noumLinkId,
    linkedNoums,
    projectType = ProjectChamberType.Public,
  }) => {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState<string>(
      LinkedNoumEnum.Noum,
    );
    const { currentLinkedNoums, infiniteState, fetchMore, loading } =
      useLinkDetailsHelper(noumLinkId, selectedValue);

    const modalHeadList: InputListTypes[] = useMemo(() => {
      const list = [
        {
          id: LinkedNoumEnum.Noum,
          name: LinkedNoumEnum.Noum,
          image: 'terms_m',
          text: t('noumena.chamber.link.modal.Noums', {
            noumsCount,
          }),
          labelSize: 'medium',
        },
        {
          id: LinkedNoumEnum.Connection,
          name: LinkedNoumEnum.Connection,
          image: 'terms_m',
          text: t('noumena.chamber.link.modal.Connections', {
            connectionsCount,
          }),
          labelSize: 'medium',
        },
      ] as InputListTypes[];
      if (projectType !== ProjectChamberType.Secret) {
        list.push({
          id: LinkedNoumEnum.Following,
          name: LinkedNoumEnum.Following,
          image: 'terms_m',
          text: t('noumena.chamber.link.modal.Followers', {
            followersCount,
          }),
          labelSize: 'medium',
        } as InputListTypes);
      }
      return list;
    }, [connectionsCount, followersCount, noumsCount, projectType, t]);

    const onChange = (value: string) => {
      setSelectedValue(value);
    };

    const linkedNoumsTabHandler = (
      data: NoumLink['linkedNoums'],
      tabId: string,
    ) =>
      data && !loading && data.length > 0 ? (
        data.map((item) => (
          <LinkDetailsContent
            key={item?._id}
            name={
              tabId === LinkedNoumEnum.Connection
                ? `${item?.uid?.firstName} ${item?.uid?.lastName}`
                : item?.name
            }
            title={tabId === LinkedNoumEnum.Noum ? '' : item?.uid?.title ?? ''}
            profileImage={
              tabId === LinkedNoumEnum.Noum
                ? item?.profileImage || ChamberDefaultImage
                : UserUtil.getProfilePicture(item?.uid) || MemberDefaultImage
            }
            category={
              tabId === LinkedNoumEnum.Noum ? item?.category?.name : undefined
            }
            /* Backend Guy(Mikolaj) said that Both of connected adn following date for linked Noum is represented by approvedAt. */
            updateAt={
              tabId === LinkedNoumEnum.Noum
                ? undefined
                : item?.approvedAt ?? item?.lastUpdatedAt ?? new Date()
            }
            tabId={tabId}
          />
        ))
      ) : tabId === LinkedNoumEnum.Noum && !loading ? (
        <>
          <TextOnlySpan
            font="body-l"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {t('noumena.chamber.link.Noums')}
          </TextOnlySpan>
          <LinkUnderline />
        </>
      ) : tabId === LinkedNoumEnum.Connection && !loading ? (
        <>
          <TextOnlySpan
            font="body-l"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {t('noumena.chamber.link.Connections')}
          </TextOnlySpan>
          <LinkUnderline />
        </>
      ) : (
        tabId === LinkedNoumEnum.Following &&
        !loading && (
          <>
            <TextOnlySpan
              font="body-l"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {t('noumena.chamber.link.Followers')}
            </TextOnlySpan>
            <LinkUnderline />
          </>
        )
      );

    const tabComponent = () => {
      switch (selectedValue) {
        case LinkedNoumEnum.Connection:
          return linkedNoumsTabHandler(
            currentLinkedNoums as NoumLink['linkedNoums'],
            selectedValue,
          );
        case LinkedNoumEnum.Following:
          return linkedNoumsTabHandler(
            currentLinkedNoums as NoumLink['linkedNoums'],
            selectedValue,
          );
        case LinkedNoumEnum.Noum:
        default:
          return linkedNoumsTabHandler(
            linkedNoums as NoumLink['linkedNoums'],
            selectedValue,
          );
      }
    };

    const deviceType = useDeviceType();
    const isMobile = useMemo(
      () => deviceType === DeviceTypeEnum.MOBILE,
      [deviceType],
    );

    return (
      <Modal
        testId="testRequestsAndInvites"
        open={isOpen}
        onClose={handleClose}
        enableCloseButton
        size={ModalSize.L}
        isFullScreen={isMobile}
        disableBackdropClick
      >
        <ModalHeader>{t('noumena.chamber.link.Link.Details')}</ModalHeader>
        <Container>
          <BasicChipsTabsForm
            onChange={onChange}
            inputList={modalHeadList}
            selectedId={selectedValue}
            mode="isBackground"
            isWithoutImage
            fontSize="--font-link-medium-size"
            fullWidth
            textFont="--font-body-medium-regular-font"
          />
          <ModalBody
            minHeight={450}
            {...(!isMobile && {
              maxHeight: '450px',
            })}
          >
            <Infinite
              onFetchMore={fetchMore}
              disableFetchMoreWhileLoading={true}
              status={infiniteState}
              isSpinnerRelative
              width="100%"
              style={{
                overflowX: 'hidden',
              }}
            >
              {tabComponent()}
            </Infinite>
          </ModalBody>
        </Container>
      </Modal>
    );
  },
);

export default LinkDetailsModal;
