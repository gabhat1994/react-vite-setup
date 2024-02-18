import { useState } from 'react';

import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack/Spacer';

import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { EnumAdCampaignOfferStatus } from '@/apollo/generated/types';
import { type OffersAndReportsProps } from './types';
import S from './styles';
import { Divider } from '../components/Divider';

import { Utils } from '../utils';

function NoData({ noDataNote }: Pick<OffersAndReportsProps, 'noDataNote'>) {
  return (
    <>
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        {noDataNote}
      </TSpan>
      <Spacer height={12} />
    </>
  );
}

function File({
  offerNumber,
  createdAt,
  id,
  type,
  onView,
  updateAppearance,
}: {
  offerNumber: number;
  createdAt: string;
  id: string;
  onView: (id: string) => void;
  updateAppearance?: boolean;
} & Required<Pick<OffersAndReportsProps, 'type'>>) {
  return (
    <>
      <S.FileContainer>
        <S.FileSide>
          <S.FileIcon>
            <Icon
              color={
                updateAppearance
                  ? '--text-card-header-neutral-default'
                  : undefined
              }
              name="file_m"
              size={24}
            />
          </S.FileIcon>
          <Stack vertical>
            <TSpan
              font="body-m"
              colorToken={
                updateAppearance
                  ? '--text-card-header-neutral-default'
                  : '--text-card-header-neutral-highlighted'
              }
            >
              {type === 'offer' ? 'Offer' : 'Weekly Report'} #{offerNumber}
            </TSpan>
            <TSpan
              font="footnote"
              colorToken="--text-tablecell-body-neutral-default"
            >
              {Utils.formatDate(createdAt)}
            </TSpan>
          </Stack>
        </S.FileSide>
        <S.FileSide>
          <Button onClick={() => onView(id)} size="small" tertiary>
            View
          </Button>
        </S.FileSide>
      </S.FileContainer>
      <Divider />
    </>
  );
}

export function OffersAndReports({
  heading,
  noDataNote,
  count,
  onView,
  list,
  onToggleOldOffers,
  type,
}: OffersAndReportsProps) {
  const [checked, setChecked] = useState(false);

  return (
    <S.Container>
      <Stack align="center" justify="space-between">
        <Stack align="center" gap={8}>
          <S.ContainerTitle>{heading}</S.ContainerTitle>
          <S.Count>
            <TSpan
              font="footnote-bold"
              colorToken="--text-badge-brand-primary-default"
            >
              {count}
            </TSpan>
          </S.Count>
        </Stack>
        {heading === 'Offers' && count > 0 && (
          <Stack gap={8}>
            <Checkbox
              size={18}
              data-testid="check-box-one"
              isChecked={checked}
              onChange={(_checked) => {
                onToggleOldOffers?.(_checked);
                setChecked(_checked);
              }}
              icon={
                <Icon
                  name="tick_m"
                  size={14}
                  color="--icon-checkbox-neutral-alt-default"
                />
              }
            />
            <TSpan font="footnote" colorToken="--text-card-neutral-default">
              Show past offers
            </TSpan>
          </Stack>
        )}
      </Stack>
      <Divider />
      {!count && <NoData noDataNote={noDataNote} />}
      {!!count &&
        !!list.length &&
        list.map((l) => {
          const id = Number(
            'oid' in l ? l.oid : 'reportId' in l ? l.reportId ?? 0 : 0,
          );
          return (
            <File
              id={l?._id ?? ''}
              type={type}
              offerNumber={id}
              onView={onView}
              createdAt={l?.createdAt ?? new Date()}
              updateAppearance={
                'status' in l
                  ? l.status !== EnumAdCampaignOfferStatus.Sent
                  : false
              }
            />
          );
        })}
    </S.Container>
  );
}
