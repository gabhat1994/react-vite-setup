import { useEffect, useState } from 'react';
import {
  Controller,
  type FieldPath,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TextArea } from '@/components/TextArea';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import S from './styles';

type InvoiceTextAreaFormFieldProps = {
  name: FieldPath<Pick<InvoiceFormValues, 'notes' | 'summary'>>;
  title: string;
  disabled?: boolean;
};

const InvoiceTextAreaFormField: React.FC<InvoiceTextAreaFormFieldProps> = ({
  name,
  title,
  disabled,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { control, setValue, watch } = useFormContext<InvoiceFormValues>();
  const fieldValue = useWatch({ control, name });

  useEffect(() => {
    if (fieldValue) {
      setIsExpanded(true);
    }
  }, [name, fieldValue, watch]);

  return (
    <Stack vertical fullWidth gap={16}>
      <S.FormSectionStyled
        title={title}
        optional
        fullSize
        rightIcon={
          isExpanded ? (
            <Button
              neutral
              primary
              size="small"
              onClick={() => {
                setValue(name, '', {
                  shouldDirty: true,
                });
                setIsExpanded(false);
              }}
              leftIcon={
                <Icon
                  name="close_m"
                  size={24}
                  color="--text-button-brand-primary-default"
                />
              }
            >
              Remove
            </Button>
          ) : null
        }
      >
        <Stack vertical gap={16} fullWidth align="stretch">
          {children}
          <Stack fullWidth vertical>
            {isExpanded ? (
              <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                  <TextArea
                    label="Your additional information"
                    value={value ?? ''}
                    onChange={onChange}
                    maxLength={200}
                    disabled={disabled}
                  />
                )}
              />
            ) : (
              <Button
                neutral
                primary
                size="small"
                onClick={() => setIsExpanded(true)}
                disabled={disabled}
                leftIcon={
                  <Icon
                    name="edit_m"
                    size={24}
                    color="--text-button-brand-primary-default"
                  />
                }
              >
                <TSpan
                  font="button-m"
                  colorToken="--text-button-brand-primary-default"
                >
                  Edit {title}
                </TSpan>
              </Button>
            )}
          </Stack>
        </Stack>
      </S.FormSectionStyled>
    </Stack>
  );
};

export default InvoiceTextAreaFormField;
