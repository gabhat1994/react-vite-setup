import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { type ComponentProps } from 'react';
import useInvoicePermissions from '../../hooks/useInvoicePermissions';

type FormHeaderProps = Pick<
  ComponentProps<typeof StickyFormHeader>,
  'title' | 'onGoBack'
> & {
  onSubmit?(): void;
  onDuplicate?(): void;
  title: string;
  invoice: InvoiceOutputFragment;
};

const InvoicePreviewHeader = ({
  onSubmit,
  onDuplicate,
  invoice,
  ...formHeaderProps
}: FormHeaderProps) => {
  const { isMobile } = useBreakpoints();
  const invoiceUtils = useInvoicePermissions();

  const PreviewButtons = !isMobile ? (
    <>
      {invoiceUtils.canDuplicate(invoice) && (
        <Button
          size="small"
          tertiary
          leftIcon={<Icon name="copy_m" size={16} />}
          onClick={onDuplicate}
        >
          Duplicate
        </Button>
      )}
      <Button size="small" intent="positive" type="submit" onClick={onSubmit}>
        Confirm & Send
      </Button>
    </>
  ) : (
    <EllipsisMenu
      containerWidth="125px"
      neutral
      onClick={() => {}}
      menuOptions={[
        {
          key: 'confirm',
          label: 'Confirm & Send',
          type: 'value',
          value: 'confirm',
          intent: 'default',
          onClick: onSubmit,
        },
      ]}
      iconColorToken="--button-card-neutral-default"
    />
  );

  return (
    <StickyFormHeader
      {...formHeaderProps}
      buttons={PreviewButtons}
      isFullScreenMode
    />
  );
};

export default InvoicePreviewHeader;
