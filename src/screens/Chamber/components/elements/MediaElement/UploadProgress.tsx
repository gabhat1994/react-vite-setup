import { ProgressBar } from '@/components/ProgressBar';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import fileSizeConverter from '@/utils/fileSizeConverter';
import { Icon } from '@/components/Icon';

type UploadProgressProps = {
  file?: File;
  uploadPercentage?: number;
  onClose?: () => void;
};

const UploadProgress = ({
  file,
  uploadPercentage,
  onClose,
}: UploadProgressProps) => (
  <Stack padding={16} vertical fullWidth gap={16}>
    <Stack fullWidth justify="center" align="center">
      <Stack vertical gap={8}>
        <TSpan
          font="body-m"
          $fill
          colorToken="--text-card-header-neutral-highlighted"
        >
          {file?.name}
        </TSpan>
        {file?.size && (
          <TSpan
            font="systemInfo-s"
            $fill
            colorToken="--text-card-neutral-default"
          >
            {fileSizeConverter(file.size || 0)}
          </TSpan>
        )}
      </Stack>
      <Spacer isFlex />
      <Icon
        name="close_m"
        size={24}
        onClick={onClose}
        color="--icon-card-neutral-default"
      />
    </Stack>
    <Stack fullWidth>
      <ProgressBar
        backgroudColor="var(--bg-progressbar-neutral-default)"
        percentage={uploadPercentage || 0}
        barSize={8}
      />
    </Stack>
  </Stack>
);

export default UploadProgress;
