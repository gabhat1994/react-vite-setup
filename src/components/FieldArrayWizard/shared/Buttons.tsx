import { Button } from '@/components/Button';
import { type ButtonProps } from '@/components/Button/types';
import { Icon } from '@/components/Icon';

type AddButtonProps = Pick<ButtonProps, 'onClick' | 'children'>;

export function AddButton({ onClick, children }: AddButtonProps) {
  return (
    <Button
      textOnly
      size="small"
      leftIcon={<Icon name="add_m" size={24} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

type EditButtonProps = Pick<ButtonProps, 'onClick' | 'children'>;

export function EditButton({ onClick, children }: EditButtonProps) {
  return (
    <Button
      size="small"
      textOnly
      intent="positive"
      icon={<Icon name="edit_m" size={24} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

type DeleteButtonProps = Pick<ButtonProps, 'onClick' | 'children'>;

export function DeleteButton({ onClick, children }: DeleteButtonProps) {
  return (
    <Button
      size="small"
      textOnly
      intent="negative"
      icon={<Icon name="delete_m" size={24} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

type SaveButtonProps = Pick<
  ButtonProps,
  'onClick' | 'children' | 'softDisabled'
>;

export function SaveButton({
  onClick,
  children,
  softDisabled,
}: SaveButtonProps) {
  return (
    <Button
      size="small"
      secondary
      intent="positive"
      softDisabled={softDisabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

type CancelButtonProps = Pick<ButtonProps, 'onClick' | 'children'>;

export function CancelButton({ onClick, children }: CancelButtonProps) {
  return (
    <Button size="small" secondary intent="negative" onClick={onClick}>
      {children}
    </Button>
  );
}
