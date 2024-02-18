import { TextArea } from '@/components/TextArea';
import { Stack } from '@/layout';
import { useFormContext } from 'react-hook-form';
import { type GeniusFormValues } from '../hooks/useGeniusForm';

type PromptInputProps = {
  placeholder: string;
};

export const PromptInput = ({ placeholder }: PromptInputProps) => {
  const { setValue, watch } = useFormContext<GeniusFormValues>();
  const promptValue = watch('prompt');

  return (
    <Stack fullWidth vertical gap={16}>
      <Stack fullWidth>
        <TextArea
          value={promptValue}
          onChange={(event) => setValue('prompt', event.target.value)}
          placeholder={placeholder}
        />
      </Stack>
    </Stack>
  );
};
