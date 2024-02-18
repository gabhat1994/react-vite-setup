import { memo, useMemo, useState } from 'react';

import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { Separator } from '@/components/Separator/Separator';
import { Icon } from '@/components/Icon';
import { DatePicker } from '@/components/DatePicker';
import { type NoumDropDownListFragment } from '@/apollo/graphql';
import { Dropdown } from '@/components/Dropdown';
import DefaultImage from '@/assets/images/chamber_default.png';

import useDebounce from '@/hooks/useDebounce';
import { mapDropDownList, filterNoums } from '../../listUtils';
import S from '../styles';
import { NOUMCard } from '../../components/NoumCard';
import { useCampaignContext } from '../../hooks/useCampaignForm';
import { constants } from '../../constants';

type CampaignTitleProps = {
  noums: NoumDropDownListFragment[];
  isMobile?: boolean;
};

type NoumAssignmentType = Required<
  Pick<CampaignTitleProps, 'noums' | 'isMobile'>
>;

const NoumAssignmentForm = memo(({ noums, isMobile }: NoumAssignmentType) => {
  const { updateCampaign, campaign } = useCampaignContext();

  const [query, setQuery] = useState('');

  const [selectedNoum, setSelectedNoum] =
    useState<NoumDropDownListFragment | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const dropDownOptions = useMemo(() => mapDropDownList(noums), [noums]);

  const noum =
    selectedNoum ||
    (campaign.noumId ? noums.find((n) => n?._id === campaign.noumId) : null);

  const options = useMemo(
    () =>
      debouncedQuery
        ? filterNoums(dropDownOptions, debouncedQuery)
        : dropDownOptions,
    [debouncedQuery, dropDownOptions],
  );

  return (
    <S.NoumAssignmentContainer>
      <S.InputLabel>Noum Assignment</S.InputLabel>

      <Spacer height={10} />
      <Dropdown
        containerHeight={isMobile ? '100%' : undefined}
        options={options}
        showInternalSearch={isMobile}
        inputValue={query}
        onInputChange={(e) => setQuery(e)}
        onSelectOption={({ value }) => {
          setSelectedNoum(value);
          updateCampaign(($campaign) => ({
            ...$campaign,
            noumId: value._id ?? '',
          }));
        }}
      >
        {({ inputProps, inputRef }) => (
          <>
            {!!noum && (
              <S.NOUMContainer align="center" justify="space-between">
                <NOUMCard
                  name={noum.name || ''}
                  image={noum.profileImage || DefaultImage}
                  status={noum.projectType ?? undefined}
                />
                <button
                  type="button"
                  style={{
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => {
                    setSelectedNoum(null);
                    updateCampaign(($campaign) => ({
                      ...$campaign,
                      noumId: '',
                    }));
                    setQuery('');
                  }}
                >
                  <Icon
                    name="close_s"
                    size={26}
                    color="--icon-input-neutral-default"
                  />
                </button>
              </S.NOUMContainer>
            )}
            {!noum && (
              <TextField
                {...inputProps}
                name="noum"
                fullWidth
                placeholder="Find a Noum..."
                inputSize="small"
                leftIcon={
                  <Icon
                    name="search_m"
                    size={24}
                    color="--icon-input-neutral-default"
                  />
                }
                ref={inputRef}
                spellCheck="false"
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
          </>
        )}
      </Dropdown>
    </S.NoumAssignmentContainer>
  );
});

export function CampaignTitle({ noums, isMobile }: CampaignTitleProps) {
  const {
    campaign,
    updateCampaign,
    error: { isTitleRangeExceeded },
  } = useCampaignContext();
  return (
    <S.Container>
      <Stack fullWidth align="start" justify="center" gap={16}>
        <S.CampaignTitle>Title:</S.CampaignTitle>
        {/* Title */}
        <TextField
          name="title"
          fullWidth
          placeholder="Campaign Title"
          inputSize="small"
          value={campaign.title}
          error={isTitleRangeExceeded}
          maxLength={
            !isTitleRangeExceeded ? constants.MAX_TITLE_CHARACTERS : undefined
          }
          helperText={
            isTitleRangeExceeded
              ? ` Title should not exceed ${constants.MAX_TITLE_CHARACTERS} characters`
              : ''
          }
          onChange={({ target }) => {
            updateCampaign(($campaign) => ({
              ...$campaign,
              title: target.value,
            }));
          }}
        />
      </Stack>
      <Spacer height={10} />
      <Separator fullWidth size="thin" />
      <Spacer height={10} />
      <Stack
        vertical={isMobile}
        fullWidth
        gap={16}
        align="center"
        justify={isMobile ? 'flex-start' : undefined}
      >
        {/* Noum Assignment Picker */}
        <NoumAssignmentForm noums={noums} isMobile={!!isMobile} />

        {/* Date Picker */}
        <S.DatePickerContainer>
          <S.InputLabel>Start Date</S.InputLabel>
          <Spacer height={10} />
          <DatePicker
            size="small"
            placeholder="MM/DD/YYYY"
            placement={isMobile ? 'auto' : 'left-end'}
            value={campaign.startDate}
            onChange={(startDate) => {
              if (!startDate) return;
              updateCampaign(($campaign) => ({ ...$campaign, startDate }));
            }}
          />
        </S.DatePickerContainer>
      </Stack>
    </S.Container>
  );
}
