import { SpaceStatusEnum, SpaceTypeEnum } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { Spacer } from '@/layout';
import {
  WrapperLoading,
  WrapperSpinner,
} from '@/screens/Chamber/components/ElementWrapper/styles';
import { trackEvent } from '@/utils/tracking';
import { capitalize } from 'lodash';
import { memo, useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  usePublishNoumLayoutHelper,
  usePublishSpaceHelper,
  useRestoreSpaceHelper,
} from '@/features/noums/hooks/spaceQuery';
import { SettingsLink } from './styles';

interface ChamberPublishProps {
  spaceId: string;
  space?: SpaceOutputFragment;
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleClickInfo: () => void;
  emptyElementErrorMessage?: string | undefined | null;
  isHomeNoum: boolean;
  isRestored?: boolean;
}

const ChamberPublish = memo((props: ChamberPublishProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [waiting, setWaiting] = useState(false);
  const { publishSpaceHelper, loading } = usePublishSpaceHelper();
  const { restoreSpaceHelper, loading: restoreLoading } =
    useRestoreSpaceHelper();
  const { publishNoumLayoutHelper, loading: publishedLoading } =
    usePublishNoumLayoutHelper();

  const callPublishSpaceHelper = useCallback(async () => {
    await publishSpaceHelper(props.spaceId, props.space, () => {
      if (props.space?.type === SpaceTypeEnum.Home) {
        trackEvent(
          props.space.status === SpaceStatusEnum.Draft
            ? 'home_chamber_create'
            : 'home_chamber_edit',
          {
            DeviceType: navigator.userAgent,
            UUID: user?._id,
            ChamberId: props.spaceId,
          },
        );
        if (props.space.elements?.some((el) => !!el?.unSaved?.isDeleted)) {
          trackEvent('home_chamber_delete_element', {
            DeviceType: navigator.userAgent,
            UUID: user?._id,
            ChamberId: props.spaceId,
          });
        }
      }
    });
  }, [props.space, props.spaceId, publishSpaceHelper, user?._id]);

  const makeCallPublishSpaceHelper = useCallback(() => {
    callPublishSpaceHelper().then(() => {
      setWaiting(false);
      if (props.space?.type === SpaceTypeEnum.Project && !props?.isRestored) {
        trackEvent('publishPN', {
          UUID: user?._id,
          ProjectNoumID: props.spaceId,
        });
      }
      props.handleClose(true);
    });
  }, [callPublishSpaceHelper, props, user?._id]);

  const followRegularPublishFLow = useCallback(() => {
    setWaiting(true);
    setTimeout(async () => {
      if (props?.isRestored) {
        await restoreSpaceHelper(props.spaceId);
      } else {
        await publishNoumLayoutHelper(props.spaceId).then(async () => {
          makeCallPublishSpaceHelper();
        });
      }
    }, 1000);
  }, [
    props,
    publishNoumLayoutHelper,
    restoreSpaceHelper,
    makeCallPublishSpaceHelper,
  ]);
  const handleConfirm = async () => {
    if (props.emptyElementErrorMessage) {
      addToast('error', 'none', props.emptyElementErrorMessage);
      props.handleClose(false);
    } else {
      followRegularPublishFLow();
    }
  };

  return (
    <Modal
      testId="testChamberPublish"
      open={props.isOpen || loading || restoreLoading || publishedLoading}
      onClose={props.handleClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      {waiting || loading || publishedLoading ? (
        <WrapperLoading>
          <WrapperSpinner>
            <Spinner />
            <Spacer height="20px" />
          </WrapperSpinner>
          <Spacer height="16px" />
          <TSpan
            data-testid="bodyChamberPublishSaving"
            font="body-l"
            colorToken="--text-modal-neutral-default"
          >
            {t(`noumena.container.chamber_publish.body.loading`)}
          </TSpan>
        </WrapperLoading>
      ) : (
        <>
          <ModalHeader data-testid="titleChamberPublish">
            {t(`noumena.container.chamber_publish.title`)}
          </ModalHeader>
          <ModalBody align="center" hideScrollbar>
            <TSpan
              data-testid="bodyChamberPublishP1"
              font="body-l"
              colorToken="--text-modal-neutral-default"
              textAlign="center"
            >
              {props?.isHomeNoum
                ? t(`noumena.container.home_chamber_publish.body.p1`)
                : t(`noumena.container.chamber_publish.body.p1`)}
            </TSpan>
            <TSpan
              data-testid="bodyChamberPublishP2"
              font="body-l"
              colorToken="--text-modal-neutral-default"
              textAlign="center"
            >
              {props?.isHomeNoum ? (
                t(`noumena.container.home_chamber_publish.body.p2`)
              ) : (
                <Trans
                  i18nKey="noumena.container.chamber_publish.body.p2"
                  components={{
                    link: (
                      <SettingsLink onClick={props.handleClickInfo}>
                        <TSpan
                          font="body-l"
                          colorToken="--text-modal-neutral-highlighted"
                          style={{ marginRight: '2px' }}
                        >
                          {capitalize(props.space?.projectType ?? '')}
                        </TSpan>
                        <Icon
                          name="info_m"
                          size={20}
                          color="--icon-modal-neutral-highlighted"
                        />
                      </SettingsLink>
                    ),
                  }}
                />
              )}
            </TSpan>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={16}>
            <Button
              data-testid="confirmChamberPublish"
              primary
              size="full"
              intent="positive"
              onClick={handleConfirm}
            >
              {t(`noumena.container.chamber_publish.confirm`)}
            </Button>
            <Button
              data-testid="cancelChamberPublish"
              tertiary
              size="full"
              onClick={() => props.handleClose()}
            >
              {t(`noumena.container.chamber_publish.cancel`)}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
});

export default ChamberPublish;
