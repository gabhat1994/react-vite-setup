import { type Meta } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ChamberActionModal } from './ChamberActionModal';
import { type ChamberActionModalProps } from './types';

export default {
  title: 'UI/Chambers/ChamberActionModal/ActionModal',
  component: ChamberActionModal,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    positiveBtnLabel: {
      control: { type: 'text' },
    },
    negativeBtnLabel: {
      control: { type: 'text' },
    },
    positiveBtnType: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
    positiveBtnIntent: {
      options: ['positive', 'negative'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof ChamberActionModal>;

export const ModalWithControls = {};

export const Primary = () => {
  const [isOpen, toggle] = useToggle(false);

  const props: ChamberActionModalProps = {
    title: 'Action Modal',
    description: 'Action Modal Description.',
    positiveBtnLabel: 'Action',
    negativeBtnLabel: 'Cancel',
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const Archive = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.chamber_edit.archive.title`),
    noumName: 'Test Noum',
    description: t(`noumena.chamber.edit.archive_description`).replace(
      '{0}',
      'Test Noum',
    ),
    positiveBtnLabel: t(`noumena.chamber_edit.unarchive`),
    negativeBtnLabel: t(`noumena.close`),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const Archived = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: 'This Noum is Archived',
    description: `You can't do that in archived.`,
    positiveBtnLabel: t(`noumena.chamber_edit.unarchive`),
    negativeBtnLabel: t(`noumena.close`),
    positiveBtnType: 'primary',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const CancelRequest = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.chamber.cancel_request`),
    description: t(`noumena.chamber.cancel_request_message`, {
      name: 'Test Noum',
    }),
    positiveBtnLabel: t(`noumena.chamber.cancel_request`),
    negativeBtnLabel: t(`noumena.close`),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const DeletePost = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.container.post_delete.title`),
    description: t(`noumena.container.post_delete.body`),
    positiveBtnLabel: t(`noumena.delete`),
    negativeBtnLabel: t(`noumena.cancel`),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const DiscardChange = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.container.chamber_discard_change.title`),
    description: t(`noumena.container.chamber_discard_change.body`),
    positiveBtnLabel: t(
      `noumena.container.chamber_discard_change.discard_changes`,
    ),
    negativeBtnLabel: t(
      `noumena.container.chamber_discard_change.continue_editing`,
    ),
    extraBtnLabel: t(
      `noumena.container.chamber_discard_change.save_as_a_draft`,
    ),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
    extraBtnCallback: () => {
      toggle();
    },
  };
  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const Disconnect = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.chamber.disconnect`),
    description: t(`noumena.chamber.disconnect_message`, { name: 'Test Noum' }),
    positiveBtnLabel: t(`noumena.chamber.disconnect`),
    negativeBtnLabel: t(`noumena.close`),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const SaveAsDraft = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.container.chamber_discard_change.save_as_a_draft`),
    description: t(`noumena.container.chamber_save_as_draft.body`),
    positiveBtnLabel: t(`noumena.container.chamber_save_as_draft.confirm`),
    negativeBtnLabel: t(`noumena.cancel`),
    positiveBtnType: 'primary',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const Unarchive = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.chamber_view.modal.unarchive.title`),
    description: t(`noumena.chamber_view.modal.unarchive.description`),
    positiveBtnLabel: t(`noumena.chamber_view.modal.unarchive.btn.publish`),
    negativeBtnLabel: t(`noumena.close`),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'positive',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};

export const Unfollow = () => {
  const [isOpen, toggle] = useToggle(false);
  const { t } = useTranslation();
  const props: ChamberActionModalProps = {
    title: t(`noumena.chamber.unfollow`),
    description: t(`noumena.chamber.unfollow_message`, { name: 'Test Noum' }),
    positiveBtnLabel: t(`noumena.chamber.unfollow`),
    negativeBtnLabel: t(`noumena.close`),
    positiveBtnType: 'primary',
    positiveBtnIntent: 'negative',
    isOpen,
    cancelCallback: () => {
      toggle();
    },
    confirmCallback: () => {
      toggle();
    },
  };

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ChamberActionModal {...props} />
    </>
  );
};
