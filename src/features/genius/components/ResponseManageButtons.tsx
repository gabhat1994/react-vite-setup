import { Button, Icon } from '@/components';
import { Separator } from '@/components/Separator/Separator';
import { Stack } from '@/layout';
import { motion } from 'framer-motion';
import React from 'react';
import { useGeniusContext } from '../contexts/GeniusContextProvider';
import { GeniusUtils } from '../utils';

type ActionButtonsProps = {
  onConfirm: () => void;
};

export const ResponseManageButtons: React.FC<ActionButtonsProps> = ({
  onConfirm,
}) => {
  const { reset, retry, type, response } = useGeniusContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      style={{ width: '100%' }}
    >
      <Stack vertical gap={16} fullWidth>
        <Separator fullWidth noMargin />

        <Stack fullWidth vertical gap={32}>
          <Stack fullWidth gap={16}>
            <Button
              icon={<Icon name="close_m" size={24} />}
              size="full_small"
              onClick={reset}
            >
              Discard
            </Button>
            <Button
              icon={<Icon name="revert_m" size={24} />}
              size="full_small"
              onClick={retry}
            >
              Try again
            </Button>
            <Button
              icon={<Icon name="tick_m" size={24} />}
              size="full_small"
              onClick={onConfirm}
              primary
              disabled={
                GeniusUtils.isImageResponse(response) && !response.image
              }
            >
              {type === 'text' ? 'Keep it' : 'Select Image'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
};
