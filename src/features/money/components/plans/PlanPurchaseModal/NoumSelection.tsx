import { type NoumTransactionFragment } from '@/apollo/graphql';
import { Button, TSpan } from '@/components';
import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import DefaultImage from '@/assets/images/chamber_default.png';
import { CircleProgressBar } from '@/components/ProgressBar';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { Checkbox } from '@/components/Checkbox';
import { isEqual } from 'lodash';
import { ExistingNoumCard, Image } from './styles';

type NoumSelectionProps = {
  noumsWithExistingPlan: NoumTransactionFragment[];
  noumsToMove: NoumTransactionFragment[];
  onSelectNoum: (noum: NoumTransactionFragment) => void;
  onMoveNoum: () => void;
  loading: boolean;
  maxNoumSelectionLimit: number;
};

export function NoumSelection({
  noumsWithExistingPlan,
  noumsToMove,
  onSelectNoum,
  onMoveNoum,
  loading,
  maxNoumSelectionLimit,
}: NoumSelectionProps) {
  const completedPercentage =
    (noumsToMove.length / maxNoumSelectionLimit) * 100;

  return (
    <>
      <ModalBody flexDirection="column" gap={16}>
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          {t('noumena.plans.noum.selection.modal.description', {
            maxNoumSelectionLimit,
          })}
        </TSpan>
        <Stack justify="space-between" align="center" fullWidth>
          <TSpan
            font="body-l-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            Select Your Noums
          </TSpan>
          <Stack align="center" gap={8}>
            <CircleProgressBar
              circleSize={22}
              percentage={completedPercentage}
              color={
                completedPercentage
                  ? 'var(--bg-progressbar-brand-primary-default)'
                  : 'var(--bg-progressbar-neutral-default)'
              }
              barSize={3}
            />
            <TSpan
              font="body-m"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {`${noumsToMove.length} / ${maxNoumSelectionLimit} selected`}
            </TSpan>
          </Stack>
        </Stack>
        <Stack fullWidth vertical gap={8}>
          {noumsWithExistingPlan.map((noum) => (
            <ExistingNoumCard key={noum.chamber_id?._id}>
              <Stack fullWidth align="center" gap={12}>
                <Image
                  src={noum.chamber_id?.profileImage || DefaultImage}
                  alt="noum-image"
                />
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {noum.chamber_id?.name}
                </TSpan>
              </Stack>
              <Checkbox
                isChecked={noumsToMove.some((addedNoum) =>
                  isEqual(addedNoum, noum),
                )}
                onChange={() => onSelectNoum(noum)}
              />
            </ExistingNoumCard>
          ))}
        </Stack>
      </ModalBody>
      <ModalFooter gap={16}>
        <Button size="full">Cancel</Button>
        <Button
          primary
          size="full"
          loading={loading}
          disabled={loading}
          onClick={onMoveNoum}
        >
          Move Noums
        </Button>
      </ModalFooter>
    </>
  );
}
