import {
  useUnlinkNoumLinkMutation,
  useUnlinkNoumsMutation,
} from '@/apollo/graphql';
import { useToast, useToggle } from '@/hooks';
import { cleanList } from '@/utils/list';
import { t } from 'i18next';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import {
  type HandleUnlinkNoumProp,
  type HandleUnlinkNoumRef,
  type UnlinkMultipleNoumRef,
} from './types';
import UnlinkMultipleNoumModal from './UnlinkMultipleNoumModal';
import UnlinkSingleNoumModal from './UnlinkSingleNoumModal';

const HandleUnlinkNoum = forwardRef<HandleUnlinkNoumRef, HandleUnlinkNoumProp>(
  ({ refetch, space, noumLink }, ref) => {
    const { addToast } = useToast();
    const [isUnlinkConfirmationOpen, toggleUnlinkConfirmationOpen] =
      useToggle();
    const [
      isUnlinkMultipleNoumOpen,
      toggleUnlinkMultipleNoum,
      setUnlinkMultipleNoum,
    ] = useToggle(false);
    const unlinkMultipleModalRef = useRef<UnlinkMultipleNoumRef>(null);
    const linkedNoums = useMemo(
      () =>
        cleanList(
          space
            ? [space, ...(noumLink?.linkedNoums || [])]
            : noumLink?.linkedNoums,
        ),
      [space, noumLink],
    );

    useImperativeHandle(ref, () => ({
      toggleUnlinkConfirmationOpen,
      toggleUnlinkMultipleNoum,
    }));
    const [unlinkNoumLinkMutation, { loading }] = useUnlinkNoumLinkMutation({
      onError: (err) => {
        addToast('error', 'none', err.message);
      },
      onCompleted: () => {
        addToast('success', 'none', t('noumena.link_noums.unlink_alert'));
        toggleUnlinkConfirmationOpen();
        refetch();
      },
    });

    const [unlinkNoumsMutation, { loading: unlinkMultipleLoading }] =
      useUnlinkNoumsMutation({
        onError: (err) => {
          addToast('error', 'none', err.message);
        },
        onCompleted: () => {
          refetch();
          addToast('success', 'none', t('noumena.link_noums.unlink_alert'));
          setUnlinkMultipleNoum(false);
          toggleUnlinkConfirmationOpen();
        },
      });

    const handleSingleUnlink = async () => {
      if (noumLink?._id) {
        await unlinkNoumLinkMutation({
          variables: {
            noumLinkId: noumLink._id,
          },
        });
      }
    };

    const handleMultipleUnlink = async () => {
      const linkedNoumIDs = unlinkMultipleModalRef.current?.handleSubmit();
      if (linkedNoumIDs && noumLink?._id) {
        await unlinkNoumsMutation({
          variables: {
            noumLinkId: noumLink._id,
            linkedNoumIDs,
          },
        });
      }
    };

    const handleSubmitUnlinking = () => {
      if (noumLink && noumLink.linkedNoumsCount > 2) {
        handleMultipleUnlink();
      } else {
        handleSingleUnlink();
      }
    };

    return (
      <>
        <UnlinkSingleNoumModal
          loading={loading || unlinkMultipleLoading}
          handleUnlinking={handleSubmitUnlinking}
          isOpen={isUnlinkConfirmationOpen}
          handleClose={toggleUnlinkConfirmationOpen}
          description={t(
            'noumena.link_noums.unlink_confirm_modal.description.multiple_noums',
          )}
        />
        <UnlinkMultipleNoumModal
          ref={unlinkMultipleModalRef}
          linkedNoums={linkedNoums}
          acceptUnlinking={toggleUnlinkConfirmationOpen}
          handleClose={toggleUnlinkMultipleNoum}
          isOpen={isUnlinkMultipleNoumOpen}
        />
      </>
    );
  },
);

export default HandleUnlinkNoum;
