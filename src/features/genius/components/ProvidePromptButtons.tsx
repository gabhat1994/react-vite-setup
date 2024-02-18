import { Button, Icon } from '@/components';
import { Stack } from '@/layout';
import { useFormContext } from 'react-hook-form';
import { useGeniusContext } from '../contexts/GeniusContextProvider';
import { type GeniusFormValues } from '../hooks/useGeniusForm';
import S from './styles';

type ProvitePromptButtonsProps = {
  onCancel: () => void;
};

export const ProvitePromptButtons = ({
  onCancel,
}: ProvitePromptButtonsProps) => {
  const { generate } = useGeniusContext();
  const { watch, setValue } = useFormContext<GeniusFormValues>();
  const prompt = watch('prompt');

  const isPromptEmpty = prompt.trim() === '';

  return (
    <S.StyledMotion
      initial={{ opacity: 0, y: -16 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, bounce: 0 }}
    >
      <Stack fullWidth gap={16}>
        <Button size="full_small" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          leftIcon={
            <Icon color="--color-base-warning-50" name="genius_m" size={24} />
          }
          primary
          size="full_small"
          disabled={isPromptEmpty}
          onClick={() => {
            generate(prompt);
            setValue('prompt', '');
          }}
        >
          Generate
        </Button>
      </Stack>
    </S.StyledMotion>
  );
};
